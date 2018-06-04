export enum EExchanges {
  BINANCE = 'binance',
}

export interface ITickerResponse {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: string;
}

export interface ICrypto extends ITicker {
  id: string;
  interval: string;
}

export interface IGetCrypto {
  pair: string;
  interval: string;
}

export interface IHistoricData extends ICrypto {
  data: ITickerResponse[];
}

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
  exchange: EExchanges;
}

export interface IRanking {
  rank: string;
  name: string;
  symbol: string;
  pair: string;
}

export interface IRankingResponse {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  price_usd: string;
  price_btc: string;
  ['24h_volume_usd']: string;
  market_cap_usd: string;
  available_supply: string;
  total_supply: string;
  max_supply: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  last_updated: string;
}

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

export interface IWSTickerResponse {
  c: string;
  Q: string;
  e: string;
  h: string;
  l: string;
  o: string;
  s: string;
  x: string;
  p: string;
  P: string;
  q: string;
  v: string;
}

