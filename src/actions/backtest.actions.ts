import * as m from '../models';

export const actionTypes = {
  ADD_EMA: '[Backtest] Add EMA',
  SET_CRYPTO: '[Backtest] Set Crypto',
  SET_START_DATE: '[Backtest] Set Start Date',
}

export class AddEMAAction {
  public readonly type = actionTypes.ADD_EMA;
  constructor(public readonly payload: m.IEma) {}
}

export class SetCryptoAction {
  public readonly type = actionTypes.SET_CRYPTO;
  constructor(public readonly payload: string) {}
}

export class SetStartDateAction {
  public readonly type = actionTypes.SET_START_DATE;
  constructor(public readonly payload: string) {}
}


export type actions = AddEMAAction
  | SetCryptoAction
  | SetStartDateAction;
