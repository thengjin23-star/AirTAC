export interface ConfigurableOption {
  parameter: string;
  options: string;
  suggestion: string;
}

export type MatchType = "直接替換" | "相似替代" | "無對應型號";

export interface AirtacRecommendation {
  baseModel: string;
  reasoningForOrderingCode?: string;
  fullOrderingCode: string;
  description: string;
  matchType: MatchType;
  configurableOptions: ConfigurableOption[];
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
}

export interface CrossReferenceRequest {
  competitorModel: string;
  brand?: string;
}
