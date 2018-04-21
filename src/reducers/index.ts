import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { reducer } from './crypto.reducer';
import * as cryptoReducer from './crypto.reducer';

export interface IState {
  main: cryptoReducer.IState;
}

export default combineReducers({
  main: reducer,
})

const cryptoState = (state: IState) => state.main;
export const getCryptos = createSelector(cryptoState, cryptoReducer.getSymbols);
