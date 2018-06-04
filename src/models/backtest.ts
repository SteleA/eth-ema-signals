export enum TrendTypes {
  LONG = 'long',
  SHORT = 'short',
}

export enum Opterators {
  EQUALS = '===',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
}

export enum SignalBlockTypes {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
}

export enum Indicators {
  EMA = 'ema',
}

export enum Values {
  OPEN = 'open',
  CLOSE = 'close',
  HIGH = 'high',
  LOW = 'low',
  VOLUME = 'volume',
}

export enum Stoppers {
  STOP_LOSS = 'stopLoss',
  STOP_PROFIT = 'stopProfit',
}

export interface IStopper {
  stop: number;
  percent: number;
}

export type SingalTypes = Opterators | Indicators | Values | Stoppers;

export interface ISignalBlock {
  type: SignalBlockTypes;
  signal: ISignal[];
}

export interface ISignal {
  type: SingalTypes;
  input?: number | IStopper;
}

export interface IIndicator {
  id: string;
  cryptoId: string;
  data: number[];
}

export enum EIndicators {
  EMA = 'ema',
}

export interface IEma {
  id: string;
  range: number;
  type: EIndicators;
}

export interface IExtendedTickerResponse {
  ema: number;
  closeTimeFormated: string;
  openTimeFormated: string;
  close: number;
  openTime: number;
  open: string;
  high: string;
  low: string;
  volume: string;
  closeTime: string;
}

export interface IBackTestData extends IExtendedTickerResponse {
  changePercent: number;
  value: number;
  position: number;
}

export interface IBacktestResults {
  type: string;
  position: number;
  value: number;
  data: IBackTestData[];
  broken: boolean;
}

export interface IBacktest {
  entry: ISignalBlock[];
  exit: ISignalBlock[];
  startPosition: number;
  extendedData: IExtendedTickerResponse[];
}
