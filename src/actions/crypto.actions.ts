import * as m from '../models';

export const actionTypes = {
  GET_CRYPTOS: '[Crypto] Get Cryptos',

  GET_CRYPTO: '[Crypto] Get Crypto',
  GET_CRYPTO_SUCCESS: '[Crypto] Get Crypto Success',
  GET_CRYPTO_FAILED: '[Crypto] Get Crypto Fail',

  GET_TICKERS: '[Crypto] Get Tickers',
  GET_TICKERS_SUCCESS: '[Crypto] Get Tickers Success',
  GET_TICKERS_FAILED: '[Crypto] Get Tickers Fail',

  GET_RANKING: '[Crypto] Get Ranking',
  GET_RANKING_SUCCESS: '[Crypto] Get Ranking Success',
  GET_RANKING_FAILED: '[Crypto] Get Ranking Fail',

  GET_CRYPTO_SYMBOLS_SUCCESS: '[Crypto] Get Crypto Symbols Success',

  MAP_TICKERS_TO_RANKING: '[Crypto] Map Tickers To Ranking',
}

export class GetCryptosAction {
  public readonly type = actionTypes.GET_CRYPTOS;
  constructor(public readonly payload: void = undefined) {}
}

export class GetCryptoAction {
  public readonly type = actionTypes.GET_CRYPTO;
  constructor(public readonly payload: m.IGetCrypto) {}
}

export class GetCryptoSuccessAction {
  public readonly type = actionTypes.GET_CRYPTO_SUCCESS;
  constructor(public readonly payload: m.ICrypto) {}
}

export class GetCryptoFailedAction {
  public readonly type = actionTypes.GET_CRYPTO_FAILED;
  constructor(public readonly payload: object) {}
}

export class GetTickersAction {
  public readonly type = actionTypes.GET_TICKERS;
  constructor(public readonly payload: void = undefined) {}
}

export class GetTickersSuccessAction {
  public readonly type = actionTypes.GET_TICKERS_SUCCESS;
  constructor(public readonly payload: m.ITicker[]) {}
}

export class GetTickersFailedAction {
  public readonly type = actionTypes.GET_TICKERS_FAILED;
  constructor(public readonly payload: object) {}
}

export class GetCryptoSymbolsSuccessAction {
  public readonly type = actionTypes.GET_CRYPTO_SYMBOLS_SUCCESS;
  constructor(public readonly payload: m.ITicker[]) {}
}

export class GetRankingAction {
  public readonly type = actionTypes.GET_RANKING;
  constructor(public readonly payload: void = undefined) {}
}

export class GetRankingSuccessAction {
  public readonly type = actionTypes.GET_RANKING_SUCCESS;
  constructor(public readonly payload: m.IRankingResponse[]) {}
}

export class GetRankingFailedAction {
  public readonly type = actionTypes.GET_RANKING_FAILED;
  constructor(public readonly payload: void = undefined) {}
}

export class MapTickersToRankingAction {
  public readonly type = actionTypes.MAP_TICKERS_TO_RANKING;
  constructor(public readonly payload: m.IRanking[]) {}
}

export type actions = GetCryptosAction
| GetCryptoAction
| GetCryptoSuccessAction
| GetCryptoFailedAction

| GetCryptoSymbolsSuccessAction

| GetRankingAction
| GetRankingSuccessAction
| GetRankingFailedAction

| MapTickersToRankingAction

| GetTickersAction
| GetTickersSuccessAction
| GetTickersFailedAction;
