import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import initialBrands from '@/data/brands.json';
import initialCatalog from '@/data/catalog.json';
import initialStock from '@/data/stock.json';
import type { BrandItem, CatalogItem, ExtendedCatalogItem } from '@/store/types';
import { COUNT_ITEM_PER_PAGE } from '@/utils/constants';
import { convertStockToStockByArt } from '@/utils/functions';

interface Store {
  brands: Ref<BrandItem[]>;
  catalog: Ref<CatalogItem[]>;
  page: Ref<number>;
  readonly countPages: number;
  itemsForCurrentPage: ComputedRef<ExtendedCatalogItem[]>;
  stockByArt: Record<string, Ref<number>>;
}

export default defineStore('store', (): Store => {
  const brands = ref(initialBrands);
  const catalog = ref(initialCatalog.map(item => ({
    ...item,
    key: Symbol('key'),
  })));
  const stockByArt = convertStockToStockByArt(initialStock);


  const page = ref(1);
  const countPages = catalog.value.length % COUNT_ITEM_PER_PAGE
    ? Math.floor(catalog.value.length / COUNT_ITEM_PER_PAGE) + 1
    : Math.floor(catalog.value.length / COUNT_ITEM_PER_PAGE);

  const itemsForCurrentPage = computed(() => {
    const start = (page.value - 1) * COUNT_ITEM_PER_PAGE;
    const end = page.value * COUNT_ITEM_PER_PAGE;

    return catalog.value.slice(start, end).map(item => {
      return {
        ...item,
        stockCount: stockByArt[item.art],
      }
    });
  });

  return {
    brands,
    catalog,
    page,
    countPages,
    itemsForCurrentPage,
    stockByArt,
  };
});
