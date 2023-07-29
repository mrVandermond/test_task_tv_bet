import { defineStore } from 'pinia';
import { ref } from 'vue';
import initialBrands from '@/data/brands.json';
import initialCatalog from '@/data/catalog.json';
import initialStock from '@/data/stock.json';
import type { BrandItem, CatalogItem, StockItem } from '@/store/types';

export default defineStore('store', () => {
  const brands = ref<BrandItem[]>(initialBrands);
  const catalog = ref<CatalogItem[]>(initialCatalog.map(item => ({
    ...item,
    key: Symbol('key'),
  })));
  const stock = ref<StockItem[]>(initialStock);

  return { brands, catalog, stock };
});
