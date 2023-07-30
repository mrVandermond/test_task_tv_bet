import { defineStore } from 'pinia'
import type { ComputedRef, Ref } from 'vue'
import { computed, readonly, ref, unref } from 'vue'
import initialBrands from '@/data/brands.json'
import initialCatalog from '@/data/catalog.json'
import initialStock from '@/data/stock.json'
import type { BrandItem, ExtendedCatalogItem, StockCount } from '@/store/types'
import { SortOrder, Stock } from '@/store/types'
import { COUNT_ITEM_PER_PAGE } from '@/utils/constants'
import { convertStockToStockByArt, getCountPages } from '@/utils/functions'

interface Store {
  brands: BrandItem[];
  yearsOfIssue: number[];
  page: Ref<number>;
  countPages: Readonly<Ref<number>>;
  countAllItems: Readonly<Ref<number>>;
  itemsForCurrentPage: ComputedRef<ExtendedCatalogItem[]>;
  stockByArt: Record<string, Ref<StockCount>>;
  filter: Readonly<Ref<Filter>>;
  cardPositions: Ref<Record<string, StockCount | undefined>>;
  updateFilter: (filter: Filter) => void;
  addToCard: (art: string) => void;
  updateSortOrder: (sortOrder: SortOrder) => void;
}

interface Filter {
  brand: number | undefined;
  yearOfIssue: number | undefined;
  stock: Stock | undefined;
}

export default defineStore('store', (): Store => {
  const yearsOfIssue = [...new Set(initialCatalog.map(item => item.year)).values()].sort((a, b) => b - a);

  const filter = ref<Filter>({
    brand: undefined,
    stock: undefined,
    yearOfIssue: undefined,
  });
  let stockByArt = convertStockToStockByArt(initialStock);

  const catalog = initialCatalog.map(item => ({
    ...item,
    key: Symbol('key'),
  }));
  const filteredCatalog = ref(catalog);

  const page = ref(1);
  const countPages = ref(getCountPages(catalog.length, COUNT_ITEM_PER_PAGE));
  const countAllItems = ref(catalog.length);
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

  updateSortOrder(SortOrder.TITLE_ASC);

  function updateFilter(newFilterValue: Filter) {
    stockByArt = convertStockToStockByArt(initialStock, newFilterValue.stock, unref(cardPositions));
    page.value = 1;
    filter.value = newFilterValue;
    filteredCatalog.value = catalog.filter((item) => {
      let isValidBrand = true;
      let isValidStock = true;
      let isValidYear = true;

      if (filter.value.brand && item.brand !== filter.value.brand) {
        isValidBrand = false;
      }

      if (filter.value.stock) {
        if (filter.value.stock === Stock.STOCK_1 && stockByArt[item.art].value[Stock.STOCK_1] === 0) {
          isValidStock = false;
        } else if (filter.value.stock === Stock.STOCK_2 && stockByArt[item.art].value[Stock.STOCK_2] === 0) {
          isValidStock = false;
        }
      }

      if (filter.value.yearOfIssue && item.year !== filter.value.yearOfIssue) {
        isValidYear = false;
      }

      return isValidBrand && isValidStock && isValidYear;
    });
    countPages.value = getCountPages(filteredCatalog.value.length, COUNT_ITEM_PER_PAGE);
    countAllItems.value = filteredCatalog.value.length;
  }

  function updateSortOrder(sortOrder: SortOrder) {
    page.value = 1;
    filteredCatalog.value = filteredCatalog.value.sort((a, b) => {
      if (sortOrder === SortOrder.TITLE_ASC) {
        return a.name < b.name ? 1 : -1;
      }

      if (sortOrder === SortOrder.TITLE_DESC) {
        return a.name > b.name ? 1 : -1;
      }

      if (sortOrder === SortOrder.PRICE_ASC) {
        return a.price - b.price;
      }

      if (sortOrder === SortOrder.PRICE_DESC) {
        return b.price - a.price;
      }

      return 0;
    });
  }

  const cardPositions = ref<Record<string, StockCount | undefined>>({});
  function updateCardPosition(art: string, stock: Stock): void {
    if (!cardPositions.value[art]) {
      cardPositions.value[art] = {
        [Stock.STOCK_1]: 0,
        [Stock.STOCK_2]: 0,
      }
    }

    cardPositions.value[art]![stock] += 1;
  }

  function addToCard(art: string) {
    if (filter.value.stock) {
      stockByArt[art].value[filter.value.stock] -= 1;
      updateCardPosition(art, filter.value.stock);

      return;
    }

    if (stockByArt[art].value[Stock.STOCK_1] > 0) {
      stockByArt[art].value[Stock.STOCK_1] -= 1;
      updateCardPosition(art, Stock.STOCK_1);

      return;
    }

    if (stockByArt[art].value[Stock.STOCK_2] > 0) {
      stockByArt[art].value[Stock.STOCK_2] -= 1;
      updateCardPosition(art, Stock.STOCK_2);
    }
  }

  return {
    filter: readonly(filter),
    cardPositions,
    brands: initialBrands,
    yearsOfIssue,
    page,
    countPages: readonly(countPages),
    countAllItems: readonly(countAllItems),
    itemsForCurrentPage,
    stockByArt,
    updateFilter,
    updateSortOrder,
    addToCard,
  };
});
