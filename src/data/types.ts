export interface CatalogOption {
  code: string;
  description: string;
}
export interface CatalogCategory {
  id: string;
  name: string;
  options: CatalogOption[];
  optionsRef?: string;
  note?: string;
}
export interface CatalogSeries {
  category: string;
  superGroup: string;
  id: string;
  group: string;
  code?: string;
  name: string;
  orderCodeFormat?: string;
  format?: string;
  categories: CatalogCategory[];
  specs?: any[];
  note?: string;
  workingPressureRange?: string;
  sourceFile?: string;
  relatedSimpleOrders?: any[];
  protectionGrade?: string;
  features?: string;
  accessories?: string;
}
