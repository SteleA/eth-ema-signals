import * as EMA from 'exponential-moving-average';
import { ITickerResponse } from '../models';

export const ema = (tickers: ITickerResponse[], range: number) => {
  const closes = tickers.map(ticker => ticker.close);
  if (closes.length >= range) {
    return EMA(closes, {
      format: (num: number) => num.toFixed(4),
      range,
    });
  }
};

export interface ICalculateEma {
  strength: string;
  ema10TicksSinceCrossning: string;
  ema25TicksSinceCrossning: string;
  ema50TicksSinceCrossning: string;
  ticksSinceCrossing: string;
}


export interface IEMA {
  ticksSinceCrossing: number;
  ema50TicksSinceCrossning: number;
  ema10TicksSinceCrossning: number;
  ema25TicksSinceCrossning: number;
  strength: number;
}

interface IAcc {
    ema10: number[];
    ema10TicksSinceCrossning: number;
    ema200: number[];
    ema25: number[];
    ema25TicksSinceCrossning: number;
    ema50: number[];
    ema50TicksSinceCrossning: number;
    strength: number;
    ticksSinceCrossing: number;
}

export const getEma = (tickers: ITickerResponse[]): IEMA =>
  [10, 25, 50, 200].reduce((acc: IAcc, curr: number, index: number, arr: number[]) => {
    acc[`ema${curr}`] = ema(tickers, curr);
    if (index === arr.length - 1) {
      const { ema10, ema25, ema50, ema200 }: {ema10: number[], ema25: number[], ema50: number[], ema200: number[]} = acc;
      acc.strength = getStrength([ema10, ema25, ema50], ema200);
      acc.ema10TicksSinceCrossning = ticksSinceCrossing(ema10, ema200);
      acc.ema25TicksSinceCrossning = ticksSinceCrossing(ema25, ema200);
      acc.ema50TicksSinceCrossning = ticksSinceCrossing(ema50, ema200);
      acc.ticksSinceCrossing = [acc.ema10TicksSinceCrossning, acc.ema25TicksSinceCrossning, acc.ema50TicksSinceCrossning].sort().slice(-1)[0];
    }
    return acc;
  }, {
    ema10TicksSinceCrossning: 0,
    ema25TicksSinceCrossning: 0,
    ema50TicksSinceCrossning: 0,
    strength: 0,
    ticksSinceCrossing: 0,
  });

export const ticksSinceCrossing = (currentEma: number[] = [], ema200: number[] = []) => {
  const reverseEma = [...currentEma].reverse();
  const reverseEma200 = [...ema200].reverse();

  const trend = reverseEma200.reduce((acc, curr, index) => {
    const isOver = reverseEma[index] > curr;
    const currentTrend = acc.slice(-1)[0];

    if (index === 0) {
      return [[isOver]];
    } else if (isOver === currentTrend[0]) {
      return [...acc.slice(0, -1), [...currentTrend, isOver]];
    } else {
      return [...acc, [isOver]];
    }
  }, [])[0];

  return trend ? trend.length : 0;
};

export const getStrength = (emaArr: number[][] = [], ema200: number[] = []) => emaArr
  .reduce((acc, curr = []) =>
    curr.slice(-1)[0] > ema200.slice(-1)[0] ? acc + 1 : acc - 1, 0);
