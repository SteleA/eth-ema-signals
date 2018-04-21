import { ITickerResponse } from './ITickerResponse';

export interface ISymbol {
  id: string;
  rank?: string;
  ticksSinceCrossing: number;
  ema50TicksSinceCrossning: number;
  ema10TicksSinceCrossning: number;
  ema25TicksSinceCrossning: number;
  strength: number;
  data: ITickerResponse[];
  pair: string;
  interval: string;
  totalTradedQuoteAssetVolume?: string;
  priceChangePercent?: string;
}
