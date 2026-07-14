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
