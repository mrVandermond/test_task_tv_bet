import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import initialBrands from '@/data/brands.json';
import initialCatalog from '@/data/catalog.json';
import initialStock from '@/data/stock.json';
import type { BrandItem, ExtendedCatalogItem } from '@/store/types';
import { COUNT_ITEM_PER_PAGE } from '@/utils/constants';
import { convertStockToStockByArt, getCountPages } from '@/utils/functions';
import { Stock } from '@/store/types';

interface Store {
  brands: BrandItem[];
  yearsOfIssue: number[];
  page: Ref<number>;
  readonly countPages: Ref<number>;
  itemsForCurrentPage: ComputedRef<ExtendedCatalogItem[]>;
  stockByArt: Record<string, Ref<number>>;
  filter: Readonly<Ref<Filter>>;
  updateFilter: (filter: Filter) => void;
}

interface Filter {
  brand: number | undefined;
  yearOfIssue: number | undefined;
  stock: Stock | undefined;
}

export default defineStore('store', (): Store => {
  const brands = initialBrands;
  const yearsOfIssue = [...new Set(initialCatalog.map(item => item.year)).values()];
  const catalog = ref(initialCatalog.map(item => ({
    ...item,
    key: Symbol('key'),
  })));

  let stockByArt = convertStockToStockByArt(initialStock);

  const filter = ref<Filter>({
    brand: undefined,
    stock: undefined,
    yearOfIssue: undefined,
  });


  const page = ref(1);
  const countPages = ref(getCountPages(catalog.value.length, COUNT_ITEM_PER_PAGE));

  const itemsForCurrentPage = computed(() => {
    const start = (page.value - 1) * COUNT_ITEM_PER_PAGE;
    const end = page.value * COUNT_ITEM_PER_PAGE;

    return filteredCatalog.value
      .slice(start, end)
      .map(item => {
        return {
          ...item,
          stockCount: stockByArt[item.art],
        }
      });
  });

  const filteredCatalog = computed(() => {
    return catalog.value.filter((item) => {
      let isValidBrand = true;
      let isValidStock = true;
      let isValidYear = true;

      if (filter.value.brand && item.brand !== filter.value.brand) {
        isValidBrand = false;
      }

      if (filter.value.stock && stockByArt[item.art].value === 0) {
        isValidStock = false;
      }

      if (filter.value.yearOfIssue && item.year !== filter.value.yearOfIssue) {
        isValidYear = false;
      }

      return isValidBrand && isValidStock && isValidYear;
    });
  });

  function updateFilter(newFilterValue: Filter) {
    if (newFilterValue.stock) {
      stockByArt = convertStockToStockByArt(initialStock, newFilterValue.stock);
    }

    page.value = 1;
    filter.value = newFilterValue;
    countPages.value = getCountPages(filteredCatalog.value.length, COUNT_ITEM_PER_PAGE);
  }

  return {
    filter: readonly(filter),
    brands,
    yearsOfIssue,
    page,
    countPages,
    itemsForCurrentPage,
    stockByArt,
    updateFilter,
  };
});
