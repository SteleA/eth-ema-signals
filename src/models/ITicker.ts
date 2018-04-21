export interface ITicker {
  close: string;
  closeTradesQuantity: string;
  eventType: string;
  high: string;
  low: string;
  open: string;
  pair: string;
  previousDaysClosePrice: string;
  priceChange: string;
  priceChangePercent: string;
  totalTradedQuoteAssetVolume: string;
  volume: string;
  symbol?: string;
}
