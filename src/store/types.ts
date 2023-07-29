export interface CatalogItem {
  name: string;
  art: string;
  brand: number;
  price: number;
  year: number;
  readonly key: symbol;
}

export interface BrandItem {
  name: string;
  id: number;
}

export interface StockItem {
  art: string;
  st1: number;
  st2: number;
}
