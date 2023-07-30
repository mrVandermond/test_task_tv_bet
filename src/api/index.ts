import request from '@/api/request';
import type { Currency } from '@/store/types';
import type { ExchangeRateOutDTO } from '@/api/types';

export async function fetchExchangeRate(base: Currency, symbols: string): Promise<ExchangeRateOutDTO> {
  return request.get('https://api.exchangerate.host/latest', { base, symbols })
}
