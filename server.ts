import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { defaultCatalog } from "./src/data/catalog.js"; // Import the database

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple in-memory cache to reduce API calls
  const cache = new Map<string, string>();

  // API route for cross-referencing
  app.post("/api/cross-reference", async (req, res) => {
    try {
      const { competitorModel, brand, customRules } = req.body;
      
      if (!competitorModel) {
        return res.status(400).json({ error: "competitorModel is required" });
      }

      const cacheKey = `${brand || 'auto'}-${competitorModel.trim().toUpperCase()}-${customRules ? customRules.length : 0}`;
      if (cache.has(cacheKey)) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.json(JSON.parse(cache.get(cacheKey)!));
      }

      const catalogJsonStr = JSON.stringify(defaultCatalog, null, 2);

      const prompt = `You are a pneumatic components expert and sales assistant strictly for AirTAC (亞德客). 
        A user has provided a competitor's product model or a combination/assembly of models: "${competitorModel}"${brand ? ` from brand "${brand}"` : ""}.
        
        ${customRules ? `USER PROVIDED CUSTOM RULES OR KNOWLEDGE (PRIORITIZE THIS):\n"""\n${customRules}\n"""\n\n` : ""}CRITICAL RULES FOR AIRTAC EQUIVALENTS:
        1. YOU MUST NEVER HALLUCINATE AirTAC models. You MUST strictly use the models and options defined in the following AirTAC Product Catalog database.
        
        === AIRTAC PRODUCT CATALOG DATABASE ===
        ${catalogJsonStr}
        =======================================

        2. Known AirTAC series are defined in the catalog above. Do not recommend anything not in the catalog unless absolutely necessary, but prefer setting baseModel to "無直接對應型號" if no match is found in the catalog.
        3. FITTING ORDERING CODE RULE: AirTAC's one-touch fitting ordering codes often don't contain dashes or extra letters unless specific.
        4. MISUMI RULE: MISUMI pneumatic components are often identical to or OEM manufactured by SMC. Handle MISUMI requests by finding the underlying SMC equivalent first, then map that to AirTAC.
        5. SPEED CONTROLLER RULE: SMC's "AS" series (e.g., AS2201F) corresponds to AirTAC's "PSL" or "PSA" series (e.g., PSL6-01). DO NOT output "JSC" as it is a PISCO product.
        6. If AirTAC DOES NOT manufacture a specific product category, or it's not in our catalog, you MUST set "baseModel" strictly to "無直接對應型號" (No direct equivalent).
        7. CAREFULLY PARSE the competitor's part number BEFORE recommending. Identify integrated features (e.g., built-in pressure gauges, check valves, silencers, one-touch fittings).
        8. If the competitor product is highly integrated and AirTAC only sells the features as separate components, you MUST recommend the combination of separate AirTAC models needed.
        9. BRAND VALIDATION: The final recommended model MUST legally and officially be an AirTAC product from the catalog.
        10. CURRENT MODELS ONLY: Recommend the models listed in the provided catalog.
        11. STRICT FAMILY MATCHING: Ensure exact correspondence (e.g., thin cylinders match thin cylinders CQ2 -> ACQ).
        12. STRICT CATALOG ACCURACY: Only recommend models that genuinely exist in the provided AirTAC catalog. Do not hallucinate or guess series names.
        13. UNRECOGNIZABLE MODELS: If the provided model number is completely unrecognizable, explicitly state that it cannot be identified.
        14. LITE MODEL OVERRIDE: If you are unsure of the exact AirTAC equivalent, output "無直接對應型號".
        15. ORDERING CODE GENERATION: AirTAC ordering codes are systematic and MUST strictly follow the \`format\` template defined in the catalog for that series. You MUST reason about how the competitor's specs map to the options defined in the catalog's \`categories\`. You must include this logic in \`reasoningForOrderingCode\`.
        16. THOROUGH DISASSEMBLY: You MUST break down the competitor's model character by character in the \`preAnalysis.competitorModelDisassembly\` field.
        17. RIGOROUS MAPPING: You MUST establish the exact AirTAC naming rule mapping using ONLY the catalog's categories in \`preAnalysis.airtacRuleMapping\` before recommending the final code.

        Your task:
        1. Identify the competitor's brand(s).
        2. Analyze and list the key specifications of the provided competitor product(s).
        3. Do a complete pre-analysis of the competitor model and establish the AirTAC rules based on the provided catalog.
        4. Recommend the equivalent AirTAC (亞德客) model(s) from the provided catalog. 
        5. For EACH recommended AirTAC model, specify the "matchType" (直接替換, 相似替代, or 無直接對應型號).
        6. For EACH recommended AirTAC model, provide the EXACT FULL ORDERING CODE (完整訂購碼) in the "fullOrderingCode" field. Construct it strictly according to the \`format\` and \`categories\` options from the catalog.
        7. For EACH recommended AirTAC model, break down its configurable parameters using the EXACT categories from the catalog so the user knows exactly what options were selected. Suggest the specific option based on the competitor's specs.
        8. Provide an overall explanation of the matching strategy and any differences.
        
        Return the result in JSON format matching the schema requested. ALL detailed text output MUST be written accurately in Traditional Chinese (繁體中文).`;

      let response;
      let retries = 3;
      let delay = 1000;

      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
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
                        reasoningForOrderingCode: { type: Type.STRING, description: "請逐步推演如何從競爭對手規格推導出亞德客的完整訂購碼，列出各項參數如何對應到亞德客的命名規則。" },
                        fullOrderingCode: { type: Type.STRING, description: "完整的訂購碼 (例如: 4V210-08, PL601)。若無法組合完整，請給出最接近的完整代碼" },
                        description: { type: Type.STRING, description: "產品類型描述 (如: 雙作用氣缸, L型接頭)" },
                        matchType: { type: Type.STRING, description: "對應種類", enum: ["直接替換", "相似替代", "無直接對應型號", "無對應型號"] },
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
                      required: ["baseModel", "reasoningForOrderingCode", "fullOrderingCode", "description", "matchType", "configurableOptions"]
                    }
                  },
                  explanation: { type: Type.STRING, description: "整體搭配說明、注意事項或組合建議" }
                },
                required: ["preAnalysis", "competitorBrand", "competitorSpecs", "airtacRecommendations", "explanation"]
              }
            }
          });
          break; // success
        } catch (error: any) {
          const errStr = String(error.message || "").toLowerCase();
          if ((error.status === 503 || errStr.includes("503") || errStr.includes("high demand") || error.status === 429 || errStr.includes("429")) && retries > 1) {
            console.log(`API busy (503/429). Retrying in ${delay}ms... (${retries - 1} retries left)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay += 3000;
            retries--;
          } else {
            throw error;
          }
        }
      }

      if (!response || !response.text) {
        throw new Error("No response from AI");
      }
      
      const text = response.text;
      
      // Save to cache
      cache.set(cacheKey, text);
      if (cache.size > 500) {
        // Prevent unbounded memory growth
        const firstKey = cache.keys().next().value;
        if (firstKey) cache.delete(firstKey);
      }

      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      let errorMessage = error.message || "未知錯誤";
      
      try {
        // Handle common API error conditions
        const errStr = String(errorMessage).toLowerCase();
        if (error.status === 429 || errStr.includes("429") || errStr.includes("quota")) {
          errorMessage = "您的 Gemini API 免費額度已耗盡 (Quota Exceeded)。請前往 Settings > Secrets 檢查您的 API Key，或升級計費方案。";
        } else if (error.status === 503 || errStr.includes("503") || errStr.includes("high demand") || errStr.includes("unavailable")) {
          errorMessage = "目前 AI 伺服器處於高負載狀態 (503 High Demand)。請稍候再試。";
        }
      } catch (e) {}

      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Note: use path.resolve for absolute path
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Express global error:", err);
    res.status(500).json({ error: "內部伺服器錯誤 (Internal Server Error)" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
