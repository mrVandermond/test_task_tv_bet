import type { Ref } from 'vue';

export interface CatalogItem {
  name: string;
  art: string;
  brand: number;
  price: number;
  year: number;
}

export interface ExtendedCatalogItem extends CatalogItem {
  readonly key: symbol;
  stockCount: Ref<StockCount>;
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

export enum Stock {
  STOCK_1 = 'st1',
  STOCK_2 = 'st2',
}

export interface StockCount {
  [Stock.STOCK_1]: number;
  [Stock.STOCK_2]: number;
}

export enum SortOrder {
  TITLE_ASC,
  TITLE_DESC,
  PRICE_ASC,
  PRICE_DESC,
}
