import * as m from '../models';
import { ema } from './ema';

export const isValueType = (type: m.SingalTypes): boolean => [
  m.Values.CLOSE,
  m.Values.HIGH,
  m.Values.LOW,
  m.Values.OPEN,
  m.Values.VOLUME,
].indexOf(type as m.Values) > -1;

export const isBlockOperatorType = (type: m.SignalBlockTypes): boolean => [
  m.SignalBlockTypes.AND,
  m.SignalBlockTypes.NOT,
  m.SignalBlockTypes.OR,
].indexOf(type as m.SignalBlockTypes) > -1;

export const isOperatorType = (type: m.SingalTypes): boolean => [
  m.Opterators.EQUALS,
  m.Opterators.GT,
  m.Opterators.GTE,
  m.Opterators.LT,
  m.Opterators.LTE,
].indexOf(type as m.Opterators) > -1;

export const isIndicatorType = (type: m.SingalTypes): boolean => [
  m.Indicators.EMA
].indexOf(type as m.Indicators) > -1;

export const isStopperType = (type: m.SingalTypes): boolean => [
  m.Stoppers.STOP_LOSS,
  m.Stoppers.STOP_PROFIT,
].indexOf(type as m.Stoppers) > -1;

export const gt = (a: number, b: number) => a > b;

const getDateString = (date: string|number): string => {
  const closeTime = new Date(date);
  const d = closeTime.getDate();
  const mon = closeTime.getMonth() + 1;
  const y = closeTime.getFullYear().toString();
  const h = closeTime.getHours();
  const min = closeTime.getMinutes();

  const year = y;
  const day = d >= 10 ? d : `0${d}`;
  const month = mon >= 10 ? mon : `0${mon}`;
  const hour = h >= 10 ? h : `0${h}`;
  const minute = min >= 10 ? min : `0${min}`;

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export const extendHistoricDataWithEMA = (historicData: m.ITickerResponse[]): m.IExtendedTickerResponse[] => {
  const emaArr = ema((historicData), 5);
  return historicData.map((item, index) => {
    return {
      ...item,
      ema: emaArr[index - 4],
      close: parseFloat(item.close),
      closeTimeFormated: getDateString(item.closeTime),
      openTimeFormated: getDateString(item.openTime),
    }
  }).slice(4);
}

interface IGetSignal {
  item: m.IExtendedTickerResponse;
  signalBlock: m.ISignalBlock[];
  change?: number;
}

export const getSignal = ({
  item,
  signalBlock,
  change,
}: IGetSignal) => {
  const v = signalBlock.map(block => {

    const values = block.signal.map((curr: m.ISignal) => {
      switch (curr.type) {
        case m.Values.CLOSE:
          return item.close;

        case m.Indicators.EMA:
          return item.ema;

        case m.Opterators.GT:
          return '>';

        case m.Opterators.LT:
          return '<';

        case m.Stoppers.STOP_PROFIT:
          return curr.input && change && change >= curr.input;

        default:
          return;
      }
    });

    // tslint:disable
      console.log(values.join(' '), eval(values.join(' ')))
      return {
        ...block,
        value: eval(values.join(' ')),
      }
    // tslint:enable
  }).reduce((acc, curr, index) => {
    if (index === 0) {
      return acc && curr.value;
    } else if (curr.type === m.SignalBlockTypes.OR) {
      return acc || curr.value;
    } else if (curr.type === m.SignalBlockTypes.AND) {
      return acc && curr.value;
    } else if (curr.type === m.SignalBlockTypes.NOT) {
      return acc && !curr.value;
    }

    return false;
  }, true)


  return v;

}

export const withinDate = (tickers: m.ITickerResponse[], startDate: string) =>
  tickers.filter(data => new Date(data.openTime) >= new Date(startDate));

export const execBacktest = ({
  entry,
  exit,
  startPosition,
  extendedData,
}: m.IBacktest): m.IBacktestResults[] => {
  return extendedData.reduce((acc: m.IBacktestResults[], ticker: m.IExtendedTickerResponse) => {
      const entrySignal = getSignal({item: ticker, signalBlock: entry});
      const isFirstItem = acc.length === 0;
      const firstLongEntry = isFirstItem && entrySignal;
      const latestTrend = acc.slice(-1)[0];

      // find first long entry
      if (firstLongEntry) {
        return [{
          type: m.TrendTypes.LONG,
          position: startPosition / ticker.close,
          value: startPosition,
          data: [{
            ...ticker,
            changePercent: 0,
            value: startPosition,
            position: startPosition / ticker.close,
          }],
        }]
      } else if (!latestTrend) {
        // first entry was not found yet
        return acc;
      }

      const firstItemInCurrentTrend = latestTrend.data.slice(-1)[0];
      const changePercent = 1 - (firstItemInCurrentTrend.close / ticker.close);
      const changePercentFormatted = changePercent * 100;
      const exitSignal = getSignal({item: ticker, signalBlock: exit});

      const withoutLatest = acc.slice(0, -1);
      const isShort = exitSignal;
      const isLong = entrySignal;
      const isBothSignals = exitSignal && entrySignal;

      const latestTrendIsLong = latestTrend.type === m.TrendTypes.LONG;
      const latestTrendIsShort = latestTrend.type === m.TrendTypes.SHORT;

      const trendSwitchToShort = isShort && latestTrendIsLong;
      const trendSwitchToLong = isLong && latestTrendIsShort;

      const value = isShort ?
        (changePercent + 1) * latestTrend.position :
        (changePercent + 1) * (latestTrend.position * firstItemInCurrentTrend.close);

      // trend switch to short
      if (trendSwitchToShort) {
        const position = ticker.close * latestTrend.position;
        return [
          ...withoutLatest,
          {
            ...latestTrend,
            broken: isBothSignals,
            data: [
              {
                ...ticker,
                changePercent: changePercentFormatted,
                value: position,
                position,
              },
              ...latestTrend.data,
            ],
          },
          {
            type: m.TrendTypes.SHORT,
            position,
            value: position,
            data: [{
              ...ticker,
              changePercent: 0,
              value: position,
              position,
            }],
          }
        ];
      }

      // trend switch to long
      if (trendSwitchToLong) {
        const position = latestTrend.position / ticker.close;
        return [
          ...withoutLatest,
          {
            ...latestTrend,
            broken: isBothSignals,
            data: [
              {
                ...ticker,
                changePercent: changePercentFormatted,
                value: position * ticker.close,
                position,
              },
              ...latestTrend.data,
            ],
          },
          {
            type: m.TrendTypes.LONG,
            position,
            value: latestTrend.position,
            data: [{
              ...ticker,
              changePercent: 0,
              value: position * ticker.close,
              position,
            }],
          }
        ];
      }

      // continue to add to lastest trend data
      return [
          ...withoutLatest,
          {
            ...latestTrend,
            data: [
              {
                ...ticker,
                changePercent: changePercentFormatted,
                value,
                position: latestTrend.value / ticker.close,
              },
              ...latestTrend.data,
            ],
          }
        ];

    }, []) as m.IBacktestResults[];
}
