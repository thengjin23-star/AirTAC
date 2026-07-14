/**
 * 交叉比對核心服務。
 *
 * 這個模組不依賴任何 web 框架，讓 Express (server.ts, 供 AI Studio / 本地開發)
 * 與 Vercel Serverless Function (api/cross-reference.ts) 共用同一套
 * 兩階段匹配 + 型錄驗證邏輯。
 */
import crypto from "crypto";
import { GoogleGenAI, Type } from "@google/genai";
import {
  buildCatalogIndex,
  getSeriesDetails,
  isValidSeriesId,
  heuristicMatch,
  knowledgeBaseText,
  validateRecommendation,
} from "./crossref.js";

// 延遲初始化，確保 dotenv (server.ts) 或平台注入的環境變數已就緒
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 主要匹配模型與候選篩選模型 (可用環境變數覆蓋)。
// 注意: 免費方案 (free tier) 的 Gemini Pro 系列額度為 0，只能使用 Flash 系列；
// 若你的 key 已綁定付費帳單，建議把 GEMINI_MODEL 設成 gemini-3.1-pro-preview 以獲得最佳匹配品質。
const MATCH_MODEL = () => process.env.GEMINI_MODEL || "gemini-2.5-flash";
const CLASSIFIER_MODEL = () => process.env.GEMINI_CLASSIFIER_MODEL || "gemini-3.1-flash-lite";
// 額度耗盡或模型過載時的自動降級順序 (preview 模型常態性過載，放在備援位)
const FALLBACK_MODELS = ["gemini-2.5-flash", "gemini-3-flash-preview", "gemini-3.1-flash-lite"];

// 型錄壓縮索引只需建一次
const catalogIndex = buildCatalogIndex();
const catalogIndexJson = JSON.stringify(catalogIndex);
// 第二階段附的總覽索引再瘦身 (不含格式與參數名)，只讓模型知道「型錄裡還有什麼」
const slimIndexJson = JSON.stringify(
  catalogIndex.map(({ id, code, name, category, group }) => ({ id, code, name, category, group }))
);

// 簡易記憶體快取 (serverless 環境僅在同一實例存活期間有效，屬於加分而非必要)
const cache = new Map<string, string>();

/**
 * 對 Gemini 的呼叫加上 503/429 重試，且在該模型額度耗盡 (429 quota)、
 * 持續過載 (503) 或不存在 (404) 時自動降級到備援模型。
 */
async function generateWithRetry(params: Parameters<GoogleGenAI["models"]["generateContent"]>[0]) {
  const ai = getAi();
  const primary = (params as any).model as string;
  const modelChain = [primary, ...FALLBACK_MODELS.filter(m => m !== primary)];
  let lastError: any = null;

  for (const model of modelChain) {
    let retries = 2;
    let delay = 1500;
    while (retries > 0) {
      try {
        return await ai.models.generateContent({ ...(params as any), model });
      } catch (error: any) {
        lastError = error;
        const errStr = String(error.message || "").toLowerCase();
        const quotaOrGone = error.status === 429 || errStr.includes("429") || errStr.includes("quota")
          || error.status === 404 || errStr.includes("not found") || errStr.includes("no longer available");
        const overloaded = error.status === 503 || errStr.includes("503") || errStr.includes("high demand") || errStr.includes("overloaded");

        if (quotaOrGone) {
          // 額度為 0 或模型不可用：重試同一模型沒有意義，直接換下一個
          console.log(`Model ${model} unavailable (quota/404), falling back...`);
          break;
        }
        if (overloaded && retries > 1) {
          console.log(`Model ${model} busy (503). Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay += 3000;
          retries--;
          continue;
        }
        if (overloaded) {
          console.log(`Model ${model} still busy, falling back...`);
          break;
        }
        throw error;
      }
    }
  }
  throw lastError || new Error("All Gemini models failed");
}

/**
 * 第一階段：用壓縮索引 + 知識庫讓模型挑出候選系列。
 * 回傳合法的系列 id 陣列 (已過濾不存在的 id)。
 */
async function selectCandidateSeries(competitorModel: string, brand: string | undefined, heuristicIds: string[], hints: string): Promise<{ ids: string[]; brandGuess?: string; productType?: string }> {
  const prompt = `You are a pneumatic components classification expert for AirTAC (亞德客).
A user provided a competitor's model (or an assembly of models): "${competitorModel}"${brand ? ` from brand "${brand}"` : ""}.

Below is a COMPACT INDEX of the entire AirTAC catalog (id, name, category, ordering-code format, parameter names):
=== CATALOG INDEX ===
${catalogIndexJson}
=====================

${hints ? `KNOWN CROSS-REFERENCE RULES (industry knowledge, prioritize these):\n${hints}\n` : ""}${heuristicIds.length > 0 ? `Heuristic pre-match suggests these series ids are likely relevant: ${heuristicIds.join(', ')}\n` : ""}
Your task: identify what kind of product(s) the competitor model is, and select the AirTAC series from the index that are the MOST LIKELY equivalents. Rules:
1. Return ONLY series ids that exist in the index above ("id" field, exact string).
2. Select every series needed to cover ALL parts if the input is an assembly (e.g. cylinder + sensor + fitting).
3. Include 2-6 closely related alternatives per part (e.g. both ACQ and SDA for a compact cylinder) so the next stage can compare details.
4. If nothing in the catalog could possibly match, return an empty array.
Respond in JSON.`;

  const response = await generateWithRetry({
    model: CLASSIFIER_MODEL(),
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competitorBrand: { type: Type.STRING, description: "判斷出的競爭對手品牌" },
          productType: { type: Type.STRING, description: "產品種類的繁體中文簡述 (如: 薄型氣缸+磁性開關)" },
          candidateSeriesIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "從索引中挑出的 AirTAC 候選系列 id (完全一致的字串)"
          }
        },
        required: ["competitorBrand", "productType", "candidateSeriesIds"]
      }
    }
  });

  if (!response || !response.text) return { ids: [] };
  try {
    const parsed = JSON.parse(response.text);
    const ids: string[] = Array.isArray(parsed.candidateSeriesIds)
      ? parsed.candidateSeriesIds.filter((id: any) => typeof id === 'string' && isValidSeriesId(id))
      : [];
    return { ids, brandGuess: parsed.competitorBrand, productType: parsed.productType };
  } catch (e) {
    console.error("Failed to parse classifier response:", response.text?.slice(0, 500));
    return { ids: [] };
  }
}

export interface CrossReferenceOutcome {
  status: number;
  body: any;
}

/** 執行完整的兩階段交叉比對，回傳 HTTP 狀態碼與 JSON body。 */
export async function crossReference(reqBody: any): Promise<CrossReferenceOutcome> {
  try {
    const { competitorModel, brand, customRules } = reqBody || {};

    if (!competitorModel) {
      return { status: 400, body: { error: "competitorModel is required" } };
    }

    // cache key 需包含自訂規則的「內容」(舊版只用長度，不同規則會撞快取)
    const rulesHash = customRules
      ? crypto.createHash("sha1").update(String(customRules)).digest("hex").slice(0, 12)
      : "none";
    const cacheKey = `${brand || 'auto'}-${competitorModel.trim().toUpperCase()}-${rulesHash}`;
    if (cache.has(cacheKey)) {
      console.log(`Cache hit for ${cacheKey}`);
      return { status: 200, body: JSON.parse(cache.get(cacheKey)!) };
    }

    // ---------- 第一階段：候選系列篩選 ----------
    const heuristic = heuristicMatch(competitorModel, brand);
    const hints = knowledgeBaseText(heuristic.entries.length > 0 ? heuristic.entries : undefined);

    let candidateIds: string[] = [];
    let classifierInfo: { brandGuess?: string; productType?: string } = {};
    try {
      const stage1 = await selectCandidateSeries(competitorModel, brand, heuristic.candidateIds, hints);
      candidateIds = stage1.ids;
      classifierInfo = stage1;
    } catch (e: any) {
      console.error("Stage-1 classifier failed, falling back to heuristics:", e.message || e);
    }
    // 分類器沒有結果時退回啟發式候選
    for (const id of heuristic.candidateIds) {
      if (!candidateIds.includes(id)) candidateIds.push(id);
    }
    // 控制第二階段的資料量
    candidateIds = candidateIds.slice(0, 15);

    const candidateSeries = getSeriesDetails(candidateIds);
    const candidateJson = JSON.stringify(candidateSeries);
    console.log(`Cross-reference "${competitorModel}": ${candidateIds.length} candidate series [${candidateIds.join(', ')}]`);

    // ---------- 第二階段：精確匹配與訂購碼生成 ----------
    const catalogSection = candidateSeries.length > 0
      ? `=== AIRTAC CANDIDATE SERIES (FULL CATALOG DATA) ===\n${candidateJson}\n===================================================\n\nAlso, for context, this COMPACT INDEX lists everything AirTAC offers (so you know what exists beyond the candidates — but you may ONLY recommend series whose FULL DATA is provided above, or output "無直接對應型號"):\n${slimIndexJson}`
      : `No candidate series were found in the AirTAC catalog for this model. Here is the compact index of everything AirTAC offers:\n${slimIndexJson}\nIf truly nothing matches, set baseModel to "無直接對應型號".`;

    const prompt = `You are a pneumatic components expert and sales assistant strictly for AirTAC (亞德客).
A user has provided a competitor's product model or a combination/assembly of models: "${competitorModel}"${brand ? ` from brand "${brand}"` : ""}.

${customRules ? `USER PROVIDED CUSTOM RULES OR KNOWLEDGE (HIGHEST PRIORITY, OVERRIDE EVERYTHING ELSE):\n"""\n${customRules}\n"""\n\n` : ""}${hints ? `INDUSTRY CROSS-REFERENCE KNOWLEDGE (trusted hints):\n${hints}\n\n` : ""}${catalogSection}

CRITICAL RULES FOR AIRTAC EQUIVALENTS:
1. NEVER HALLUCINATE AirTAC models. Only recommend series whose full data appears in the candidate series above. If no candidate fits, set "baseModel" to "無直接對應型號".
2. MISUMI RULE: MISUMI pneumatic components are often identical to or OEM manufactured by SMC. Find the underlying SMC equivalent first, then map to AirTAC.
3. SPEED CONTROLLER RULE: SMC "AS" series corresponds to AirTAC "PSL" series. NEVER output "JSC" (it is a PISCO product).
4. CAREFULLY PARSE the competitor's part number BEFORE recommending. Identify every suffix: bore, stroke, thread type/size (M, R/PT, G, NPT), voltage, magnet, mounting, options.
5. If the competitor product is an integrated assembly and AirTAC sells the features separately, recommend the combination of separate AirTAC models (one recommendation per part).
6. ORDERING CODE GENERATION: AirTAC ordering codes MUST strictly follow the \`format\` template of the series and use ONLY option codes from that series' \`categories\`. Show your reasoning in \`reasoningForOrderingCode\`.
7. For EVERY recommendation you MUST also return machine-readable fields: "seriesId" = the exact catalog id of the chosen series, and "selectedOptions" = the exact option codes you chose for each category id (use "" for blank codes). The server re-validates these against the catalog, so they must be exact.
8. THOROUGH DISASSEMBLY: break down the competitor's model segment by segment in \`preAnalysis.competitorModelDisassembly\`.
9. RIGOROUS MAPPING: establish the exact AirTAC naming rule mapping using ONLY the catalog's categories in \`preAnalysis.airtacRuleMapping\`.
10. matchPercentage must honestly reflect spec coverage: 100 = perfect drop-in replacement; deduct for differences in bore/stroke availability, mounting, thread, electrical specs, dimensions.
11. If the model number is completely unrecognizable, say so explicitly and use "無直接對應型號".

Your task:
1. Identify the competitor's brand(s).
2. Analyze and list the key specifications of the competitor product(s).
3. Complete the pre-analysis (disassembly + AirTAC rule mapping).
4. Recommend the equivalent AirTAC model(s) from the candidate series with matchType (直接替換, 相似替代, or 無直接對應型號), full ordering code, seriesId + selectedOptions, configurable options with suggestions, and matchPercentage.
5. Provide an overall explanation of the matching strategy and any spec differences the user must verify.

Return JSON matching the schema. ALL text output MUST be accurate Traditional Chinese (繁體中文).`;

    const response = await generateWithRetry({
      model: MATCH_MODEL(),
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            preAnalysis: {
              type: Type.OBJECT,
              description: "匹配前的全面分析，包含對手型號拆解與亞德客型號對應規則分析",
              properties: {
                competitorModelDisassembly: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "對競爭對手型號的逐字/逐段拆解分析"
                },
                airtacRuleMapping: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "亞德客對應型號的選型規則與邏輯推導"
                }
              },
              required: ["competitorModelDisassembly", "airtacRuleMapping"]
            },
            competitorBrand: { type: Type.STRING, description: "競爭對手的品牌" },
            competitorSpecs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "競爭對手型號的完整規格解析，多部件請分別列出"
            },
            airtacRecommendations: {
              type: Type.ARRAY,
              description: "亞德客(AirTAC)對應建議型號與配件清單",
              items: {
                type: Type.OBJECT,
                properties: {
                  baseModel: { type: Type.STRING, description: "亞德客基礎型號或系列 (如: 4V系列, PL系列)，若無直接對應請填'無直接對應型號'" },
                  seriesId: { type: Type.STRING, description: "所選系列在型錄資料中的精確 id (如: acq, 4V200, Fittings-PL)。無對應時填空字串" },
                  reasoningForOrderingCode: { type: Type.STRING, description: "逐步推演如何從競爭對手規格推導出亞德客的完整訂購碼，列出各項參數如何對應" },
                  fullOrderingCode: { type: Type.STRING, description: "完整的訂購碼 (例如: 4V210-08, PL601)" },
                  description: { type: Type.STRING, description: "產品類型描述 (如: 雙作用氣缸, L型接頭)" },
                  matchType: { type: Type.STRING, description: "對應種類", enum: ["直接替換", "相似替代", "無直接對應型號", "無對應型號"] },
                  matchPercentage: { type: Type.NUMBER, description: "匹配程度百分比 (0-100)" },
                  selectedOptions: {
                    type: Type.ARRAY,
                    description: "此推薦所選的型錄選項 (機器可驗證)。categoryId 與 code 必須與候選系列型錄資料完全一致",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        categoryId: { type: Type.STRING, description: "型錄中 categories[].id" },
                        code: { type: Type.STRING, description: "所選 options[].code，空白代碼用空字串" }
                      },
                      required: ["categoryId", "code"]
                    }
                  },
                  configurableOptions: {
                    type: Type.ARRAY,
                    description: "該型號需要使用者挑選的細部規格與參數",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        parameter: { type: Type.STRING, description: "參數名稱 (例如: 缸徑, 行程, 接管口徑, 電壓)" },
                        options: { type: Type.STRING, description: "該型號可選的範圍或說明" },
                        suggestion: { type: Type.STRING, description: "根據對手規格給予的直接挑選建議" }
                      },
                      required: ["parameter", "options", "suggestion"]
                    }
                  }
                },
                required: ["baseModel", "seriesId", "reasoningForOrderingCode", "fullOrderingCode", "description", "matchType", "matchPercentage", "selectedOptions", "configurableOptions"]
              }
            },
            explanation: { type: Type.STRING, description: "整體搭配說明、注意事項或組合建議" }
          },
          required: ["preAnalysis", "competitorBrand", "competitorSpecs", "airtacRecommendations", "explanation"]
        }
      }
    });

    if (!response || !response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text);

    // ---------- 型錄驗證：檢查每筆推薦的系列與選項代碼 ----------
    if (Array.isArray(result.airtacRecommendations)) {
      for (const rec of result.airtacRecommendations) {
        rec.validation = validateRecommendation(rec);
      }
    }
    // 附上候選系列摘要供前端顯示 (透明化 AI 的比對範圍)
    result.candidateSeries = candidateSeries.map(s => ({
      id: s.id,
      code: s.code || undefined,
      name: s.name,
      group: s.group,
    }));
    if (classifierInfo.productType) {
      result.productType = classifierInfo.productType;
    }

    const finalText = JSON.stringify(result);

    // Save to cache
    cache.set(cacheKey, finalText);
    if (cache.size > 500) {
      // Prevent unbounded memory growth
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }

    return { status: 200, body: result };
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = error.message || "未知錯誤";

    try {
      // Handle common API error conditions
      const errStr = String(errorMessage).toLowerCase();
      if (errStr.includes("api key not valid") || errStr.includes("api_key_invalid")) {
        errorMessage = "Gemini API Key 無效。請檢查部署平台的環境變數是否已正確設定 GEMINI_API_KEY。";
      } else if (!process.env.GEMINI_API_KEY) {
        errorMessage = "伺服器尚未設定 GEMINI_API_KEY 環境變數。請在部署平台 (AI Studio Secrets 或 Vercel 專案設定) 加入後重新部署。";
      } else if (error.status === 429 || errStr.includes("429") || errStr.includes("quota")) {
        errorMessage = "您的 Gemini API 免費額度已耗盡 (Quota Exceeded)。請檢查您的 API Key 額度，或升級計費方案。";
      } else if (error.status === 503 || errStr.includes("503") || errStr.includes("high demand") || errStr.includes("unavailable")) {
        errorMessage = "目前 AI 伺服器處於高負載狀態 (503 High Demand)。請稍候再試。";
      }
    } catch (e) {}

    return { status: 500, body: { error: errorMessage } };
  }
}
