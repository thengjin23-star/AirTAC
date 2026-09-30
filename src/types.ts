export interface ConfigurableOption {
  parameter: string;
  options: string;
  suggestion: string;
}

export type MatchType = "直接替換" | "相似替代" | "無直接對應型號" | "無對應型號";

export interface SelectedOption {
  categoryId: string;
  code: string;
}

/** 伺服器對 AI 推薦做的型錄驗證結果 */
export interface RecommendationValidation {
  catalogVerified: boolean;
  seriesFound: boolean;
  warnings: string[];
  serverGeneratedCode?: string;
}

export interface AirtacRecommendation {
  baseModel: string;
  seriesId?: string;
  reasoningForOrderingCode?: string;
  fullOrderingCode: string;
  description: string;
  matchType: MatchType;
  matchPercentage?: number;
  selectedOptions?: SelectedOption[];
  configurableOptions: ConfigurableOption[];
  validation?: RecommendationValidation;
  /** 此推薦來自團隊過去人工確認的修正 (自我學習) */
  fromTeamCorrection?: boolean;
}

/** AI 第一階段挑出的候選系列摘要 */
export interface CandidateSeriesSummary {
  id: string;
  code?: string;
  name: string;
  group: string;
}

export interface CrossReferenceResult {
  preAnalysis?: {
    competitorModelDisassembly: string[];
    airtacRuleMapping: string[];
  };
  competitorBrand: string;
  competitorSpecs: string[];
  airtacRecommendations: AirtacRecommendation[];
  explanation: string;
  candidateSeries?: CandidateSeriesSummary[];
  productType?: string;
  /** AI 無法確定、需人工核對的事項 */
  uncertainties?: string[];
  /** 團隊確認過的此型號對照 (完全相同型號命中參考資料庫) */
  teamCorrection?: { airtacCode: string; confirmedAt?: number };
  /** 程式依原廠編碼規則確定性解析的結果 (常見系列) */
  decoded?: { family: string; facts: string[] };
  /** 完全相同型號命中團隊參考資料庫，直接回答 (未呼叫 AI) */
  fromReference?: boolean;
  /** 這次分析參考到的「相近型號」團隊對照 */
  referenceMatches?: { competitorModel: string; airtacCode: string; seriesId?: string }[];
}

/** 已確認的對照項目 (確認清單，localStorage 持久化) */
export interface ConfirmedItem {
  id: string;
  brand: string;
  competitorModel: string;
  airtacCode: string;
  description: string;
  matchType: string;
  matchPercentage?: number;
  note: string;
  confirmedAt: number;
  /** 最終採用的亞德客系列 id（含人工改選後的系列），供雲端學習與回溯 */
  seriesId?: string;
  /** 確認人 (雲端共用時用來區分「我的 / 全部」) */
  owner?: string;
}

/** 批量分析的單列狀態 */
export interface BatchRow {
  id: string;
  model: string;
  brand?: string;
  status: 'pending' | 'running' | 'done' | 'error';
  result?: CrossReferenceResult;
  error?: string;
}

export interface CrossReferenceRequest {
  competitorModel: string;
  brand?: string;
  customRules?: string;
}

/** 查詢歷史紀錄 (localStorage) */
export interface SearchHistoryItem {
  id: string;
  timestamp: number;
  model: string;
  brand: string;
  result: CrossReferenceResult;
}
