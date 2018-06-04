import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as backtestReducer from './backtest.reducer';
import * as cryptoReducer from './crypto.reducer';
import * as watchlistReducer from './watchlist.reducer';

export { getBacktest } from './backtest.reducer';

export interface IState {
  crypto: cryptoReducer.IState;
  backtest: backtestReducer.IState;
  watchList: watchlistReducer.IState;
}

export default combineReducers({
  crypto: cryptoReducer.reducer,
  backtest: backtestReducer.reducer,
  watchList: watchlistReducer.reducer,
})

const cryptoState = (state: IState) => state.crypto;
export const getTickers = createSelector(cryptoState, cryptoReducer.getTickers);

const backtestState = (state: IState) => state.backtest;
export const getBacktestIndicators = createSelector(backtestState, backtestReducer.getIndicators);
export const getBacktestCrypto = createSelector(backtestState, backtestReducer.getCrypto);
export const getBacktestPosition = createSelector(backtestState, backtestReducer.getPosition);

const watchListState = (state: IState) => state.watchList;
export const getWatchListIsLoading = createSelector(watchListState, watchlistReducer.getIsLoading);

export const combinedState = (state: IState) => state;
export const getWatchList = createSelector(combinedState, (state: IState) => {
  return state.watchList.watchList.map(item => {
    const ticker = state.crypto.tickers.find(t => t.pair === item.pair);
    return {...ticker, ...item};
  })
});
