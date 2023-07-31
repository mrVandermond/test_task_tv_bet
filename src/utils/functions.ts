import type { StockCount, StockItem } from '@/store/types'
import { SortOrder, Stock } from '@/store/types'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { COUNT_ITEM_PER_PAGE } from '@/utils/constants'

export function convertStockToStockByArt(
  stockList: StockItem[],
  stock?: Stock,
  positions?: Record<string, StockCount | undefined>
): Record<string, Ref<StockCount>> {
  const result: Record<string, Ref<StockCount>> = {}

  stockList.forEach((item) => {
    if (stock === Stock.STOCK_1) {
      result[item.art] = ref({
        [Stock.STOCK_1]: positions
          ? item.st1 - (positions[item.art]?.[Stock.STOCK_1] ?? 0)
          : item.st1,
        [Stock.STOCK_2]: 0
      })
      return
    }

    if (stock === Stock.STOCK_2) {
      result[item.art] = ref({
        [Stock.STOCK_1]: 0,
        [Stock.STOCK_2]: positions
          ? item.st2 - (positions[item.art]?.[Stock.STOCK_2] ?? 0)
          : item.st2
      })
      return
    }

    result[item.art] = ref({
      [Stock.STOCK_1]: positions
        ? item.st1 - (positions[item.art]?.[Stock.STOCK_1] ?? 0)
        : item.st1,
      [Stock.STOCK_2]: positions ? item.st2 - (positions[item.art]?.[Stock.STOCK_2] ?? 0) : item.st2
    })
  })

  return result
}

export function getCountPages(numberOfElements: number, countPerPage: number): number {
  return numberOfElements % countPerPage
    ? Math.floor(numberOfElements / COUNT_ITEM_PER_PAGE) + 1
    : Math.floor(numberOfElements / COUNT_ITEM_PER_PAGE);
}

export function sort(sortOrder: SortOrder): (a: { name: string; price: number }, b: { name: string; price: number }) => number {
  if (sortOrder === SortOrder.TITLE_ASC) {
    return (a, b) => a.name < b.name ? 1 : -1;
  }

  if (sortOrder === SortOrder.TITLE_DESC) {
    return (a, b) => a.name > b.name ? 1 : -1;
  }

  if (sortOrder === SortOrder.PRICE_ASC) {
    return (a, b) => a.price - b.price;
  }

  if (sortOrder === SortOrder.PRICE_DESC) {
    return (a, b) => b.price - a.price;
  }

  return (a, b) => a.name < b.name ? 1 : -1;
}
