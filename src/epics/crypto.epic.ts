import * as cryptoActions from '../actions/crypto.actions';
import { actionTypes } from '../actions/crypto.actions';

import { Store } from 'redux';
import { ActionsObservable } from 'redux-observable'

import { fromPromise } from 'rxjs/observable/fromPromise';

import { IState } from '../reducers';
import { getCrypto } from '../services/api';
import { BinanceWS } from '../services/binance';
import { coinmarketcap } from '../services/coinmarketcap';

import * as m from '../models';

export const getRanking = (action$: ActionsObservable<cryptoActions.GetRankingAction>) =>
  action$
    .ofType(actionTypes.GET_RANKING)
    .mergeMap(() => coinmarketcap)
    .map((response: m.IRankingResponse[]) => new cryptoActions.GetRankingSuccessAction(response));

export const binanceTickerStreamEpic = (action$: ActionsObservable<cryptoActions.GetTickersAction>) =>
  action$
    .ofType(actionTypes.GET_TICKERS)
    .mergeMap(() => new BinanceWS().create('!ticker@arr'))
    .map((tickers: m.ITicker[]) => new cryptoActions.GetTickersSuccessAction(tickers));

export const getCryptoEpic = (action$: ActionsObservable<cryptoActions.GetCryptoAction>) =>
  action$
    .ofType(actionTypes.GET_CRYPTO)
    .mergeMap(({payload}: cryptoActions.GetCryptoAction) =>
      fromPromise(getCrypto(payload))
        .map((response: m.ITickerResponse[]) => ({data: response, ...payload}))
    )
    .map((payload: m.ICrypto) => new cryptoActions.GetCryptoSuccessAction(payload));

export const getCryptosEpic = (action$: ActionsObservable<cryptoActions.GetCryptosAction>, store: Store<IState>) =>
  action$
    .ofType(actionTypes.MAP_TICKERS_TO_RANKING)
    .map(() => store.getState().main)
    .map(({rankings, symbols}: {rankings: m.IRanking[], symbols: m.ISymbol[]}) =>
      rankings.reduce((acc, curr: m.IRanking) =>
        symbols.some(symbol => symbol.pair === curr.pair) ? acc : [...acc, curr], []))
    .mergeMap(crypto => crypto)
    .map(({ pair }: m.IRanking) => new cryptoActions.GetCryptoAction({pair, interval: '4h'}));

export const addTopRankingCryptoEpic = (action$: ActionsObservable<cryptoActions.GetRankingSuccessAction | cryptoActions.GetCryptoSymbolsSuccessAction>, store: Store<IState>) =>
  action$
    .ofType(actionTypes.GET_RANKING_SUCCESS, actionTypes.GET_TICKERS_SUCCESS)
    .map(() => {
      const {main} = store.getState();
      return {ranking: main.coinmarketcap, tickers: main.tickers};
    })
    .filter(({ranking, tickers}: {ranking: m.IRankingResponse[], tickers: m.ITicker[]}) => {
      return ranking.length > 0 && tickers.length > 0;
    })
    .map(({ranking, tickers}: {ranking: m.IRankingResponse[], tickers: m.ITicker[]}) => {
      const ethSymbols: m.ITicker[] = tickers
        .filter(({ pair }: m.ITicker) => pair.indexOf('ETH') > -1)
        .map(ticker => ({...ticker, symbol: ticker.pair.replace('ETH', '')}));

      return ranking
        .map(({rank, symbol, name}: m.IRankingResponse): m.IRanking | null => {
          const ethSymbol: m.ITicker | undefined = ethSymbols.find((eth: m.ITicker) => symbol === eth.symbol);
          return ethSymbol ? { rank, name, symbol, pair: ethSymbol.pair } : null;
        })
        .filter(Boolean);
    })
    .map((tickers: m.IRanking[]) => new cryptoActions.MapTickersToRankingAction(tickers));
