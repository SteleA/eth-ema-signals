import { actions, actionTypes } from '../actions/crypto.actions';

import * as m from '../models';
import { ITicker } from '../models';

export interface IState {
  coinmarketcap: m.IRankingResponse[];
  tickers: m.ITicker[];
  symbols: m.ISymbol[];
  rankings: m.IRanking[];
  historicData: m.ITicker[];
}

const initialState = {
  coinmarketcap: [],
  symbols: [],
  tickers: [],
  rankings: [],
  historicData: [],
};

export const reducer = (state = initialState, action: actions) => {
  switch (action.type) {
    case actionTypes.GET_CRYPTO_SUCCESS: {
      const payload = action.payload as m.IHistoricData;
      const exists = state.historicData.some((item: m.IHistoricData) => item.id === payload.id);
      if (exists) {
        return {
          ...state,
          historicData: state.historicData.map((item: m.IHistoricData) =>
            item.id === payload.id ? {...item, ...payload} : item)
        };
      } else {
        return {...state, historicData: [...state.historicData, payload]};
      }
    }

    case actionTypes.GET_CRYPTO_SYMBOLS_SUCCESS: {
      return { ...state, tickers: action.payload as m.ITicker };
    }

    case actionTypes.MAP_TICKERS_TO_RANKING: {
      return { ...state, rankings: action.payload as m.IRanking[] };
    }

    case actionTypes.GET_TICKERS_SUCCESS: {
      const payload = action.payload as m.ITicker[];
      return {
        ...state,
        tickers: payload.reduce((acc: m.ITicker[], curr: ITicker) => {
          const exists = acc.find(t => t.pair === curr.pair);
          return exists ? acc.map(ticker => ticker.pair === curr.pair ? {...ticker, ...curr} : ticker) : [...acc, curr];
        }, state.tickers),
      }
    }

    case actionTypes.GET_RANKING_SUCCESS: {
      return { ...state, coinmarketcap: action.payload as m.IRankingResponse[] };
    }


    case actionTypes.BOOTSTRAP_SUCCESS: {
      return { ...state, watchList: action.payload };
    }

    default:
      return state;
  }
};

export const getSymbols = (state: IState) =>
  state.symbols
    .map(symbol => {
      const ticker = state.tickers.find(t => t.pair === symbol.pair);
      const rank = state.rankings.find(r => r.pair === symbol.pair);
      return {...symbol, ...ticker, ...rank}
    })
    .sort((a: any, b: any) => a.rank - b.rank);
export const getTickers = (state: IState) => state.tickers;


