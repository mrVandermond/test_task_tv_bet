import type { StockItem } from '@/store/types';
import { Stock } from '@/store/types';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { COUNT_ITEM_PER_PAGE } from '@/utils/constants';

export function convertStockToStockByArt(stockList: StockItem[], stock?: Stock): Record<string, Ref<number>> {
  const result: Record<string, Ref<number>> = {};

  stockList.forEach(item => {
    if (stock === Stock.STOCK_1) {
      result[item.art] = ref(item.st1);
      return;
    }

    if (stock === Stock.STOCK_2) {
      result[item.art] = ref(item.st2);
      return;
    }

    result[item.art] = ref(item.st1 + item.st2);
  });

  return result;
}

export function getCountPages(numberOfElements: number, countPerPage: number): number {
  return numberOfElements % countPerPage
    ? Math.floor(numberOfElements / COUNT_ITEM_PER_PAGE) + 1
    : Math.floor(numberOfElements / COUNT_ITEM_PER_PAGE);
}
