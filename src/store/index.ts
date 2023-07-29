import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import initialBrands from '@/data/brands.json';
import initialCatalog from '@/data/catalog.json';
import initialStock from '@/data/stock.json';
import type { BrandItem, CatalogItem, StockItem } from '@/store/types';
import { COUNT_ITEM_PER_PAGE } from '@/utils/constants';

interface Store {
  brands: Ref<BrandItem[]>;
  catalog: Ref<CatalogItem[]>;
  stock: Ref<StockItem[]>;
  page: Ref<number>;
  readonly countPages: number;
  itemsForCurrentPage: ComputedRef<CatalogItem[]>;
}

export default defineStore('store', (): Store => {
  const brands = ref<BrandItem[]>(initialBrands);
  const catalog = ref<CatalogItem[]>(initialCatalog.map(item => ({
    ...item,
    key: Symbol('key'),
  })));
  const stock = ref<StockItem[]>(initialStock);


  const page = ref(1);
  const countPages = catalog.value.length % COUNT_ITEM_PER_PAGE
    ? Math.floor(catalog.value.length / COUNT_ITEM_PER_PAGE) + 1
    : Math.floor(catalog.value.length / COUNT_ITEM_PER_PAGE);

  const itemsForCurrentPage = computed(() => {
    const start = (page.value - 1) * COUNT_ITEM_PER_PAGE;
    const end = page.value * COUNT_ITEM_PER_PAGE;

    return catalog.value.slice(start, end);
  });

  return {
    brands,
    catalog,
    stock,
    page,
    countPages,
    itemsForCurrentPage,
  };
});
