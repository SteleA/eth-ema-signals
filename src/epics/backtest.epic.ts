// import * as backtestActions from '../actions/backtest.actions';
// import * as cryptoActions from '../actions/crypto.actions';

// import { Store } from 'redux';
// import { ActionsObservable } from 'redux-observable'

// import { fromPromise } from 'rxjs/observable/fromPromise';

// import { IState } from '../reducers';
// import { getCrypto } from '../services/api';
// import { BinanceWS } from '../services/binance';
// import { coinmarketcap } from '../services/coinmarketcap';
// import { watchList } from '../services/watchlist';

// import * as m from '../models';




// const getCryptoEpic = (action$: ActionsObservable<backtestActions.SetCryptoAction>) =>
//   action$
//     .ofType(backtestActions.actionTypes.SET_CRYPTO)
//     .switchMap(({payload}: backtestActions.SetCryptoAction) => {
//       debugger
//       return [];
//     })
    // .map((payload: any) => {
    //   return new cryptoActions.GetCryptoSuccessAction(payload);
    // });

// fromPromise(getCrypto(payload)).map((response: m.ITickerResponse[]) => ({data: response, ...payload}))

export default [
  // getCryptoEpic
];
