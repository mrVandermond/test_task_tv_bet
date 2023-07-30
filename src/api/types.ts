import type { Currency } from '@/store/types';

export interface ExchangeRateOutDTO {
  rates: Record<Currency, number>;
}
