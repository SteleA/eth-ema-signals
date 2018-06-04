import { createSelector } from 'reselect';

import { actions, actionTypes } from '../actions/backtest.actions';

import * as fromRoot from './';

import * as m from '../models';
import * as utils from '../utils/backtest';

import * as moment from 'moment';

export interface IState {
  crypto: string;
  ema: m.IEma[];
  startDate: string;
  startPosition: number;
  entry: m.ISignalBlock[];
  exit: m.ISignalBlock[];
}

const initialState = {
  crypto: null,
  ema: [],
  startDate: moment().startOf('day').subtract(1, 'month').toISOString(),
  startPosition: 10,
  entry: [
    {
      type: m.SignalBlockTypes.AND,
      signal: [
        {
          type: m.Values.CLOSE,
        },
        {
          type: m.Opterators.GT,
        },
        {
          type: m.Indicators.EMA,
          input: 5,
        },
      ]
    }
  ],
  exit: [
    {
      type: m.SignalBlockTypes.AND,
      signal: [
        {
          type: m.Values.CLOSE,
        },
        {
          type: m.Opterators.LT,
        },
        {
          type: m.Indicators.EMA,
          input: 5,
        },
      ]
    },
    // {
    //   type: m.SignalBlockTypes.OR,
    //   signal: [
    //     {
    //       type: m.Stoppers.STOP_PROFIT,
    //       input: 2,
    //     },
    //   ]
    // },
  ],
};

export const reducer = (state = initialState, {type, payload}: actions) => {
  switch (type) {
    case actionTypes.SET_CRYPTO: {
      return { ...state, crypto: payload };
    }

    case actionTypes.SET_START_DATE: {
      return { ...state, startDate: payload };
    }

    case actionTypes.ADD_EMA: {

      const exists = state.ema.some(({id}: m.IEma) => id === (payload as m.IEma).id);
      if (!exists) {
        return {
          ...state,
          ema: [...state.ema, payload],
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

export const getIndicators = (state: IState) => state.ema;
export const getCrypto = (state: IState) => state.crypto;
export const getPosition = (state: IState) => state.startPosition;
export const getEntry = (state: IState) => state.entry;

export const getStartDate = createSelector((state: fromRoot.IState) => state, (state: fromRoot.IState) => {
  if (state.backtest.startDate) {
    return moment(state.backtest.startDate);
  } else {
    const crypto = state.backtest.crypto;
    const historicData = state.crypto.historicData.find((item: m.IHistoricData) => item.id === crypto) as m.IHistoricData;
    if (historicData) {
      const first = moment(historicData.data[0].closeTime);
      return first;
    }
    return null;
  }
});

export const getBacktest = createSelector((state) => state, ({backtest, crypto}: fromRoot.IState) => {
  const cryptoToBacktest = backtest.crypto;
  const historicData = crypto.historicData.find((item: m.IHistoricData) => item.id === cryptoToBacktest) as m.IHistoricData;

  if (historicData) {
    const dataWithinDateRange = utils.withinDate(historicData.data, backtest.startDate);
    const extendedData = utils.extendHistoricDataWithEMA(dataWithinDateRange);
    const results = utils.execBacktest({
      entry: backtest.entry,
      exit: backtest.exit,
      startPosition: backtest.startPosition,
      extendedData,
    });
    return results.reverse();
  }

  return;
});

export const getMinStartDate = createSelector((state: fromRoot.IState) => state, (state: fromRoot.IState) => {
  const crypto = state.backtest.crypto;
  const historicData = state.crypto.historicData.find((item: m.IHistoricData) => item.id === crypto) as m.IHistoricData;
  if (historicData) {
    const first = moment(historicData.data[0].closeTime);
    return first;
  }
  return null;
});
