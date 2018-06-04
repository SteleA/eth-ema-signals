import * as cryptoActions from '../actions/crypto.actions';
import * as watchListActions from '../actions/watchlist.actions';

import { ActionsObservable } from 'redux-observable'

import { watchList } from '../services/watchlist';

import * as m from '../models';

export const addToWatchListEpic = (action$: ActionsObservable<watchListActions.AddToWatchListAction>) =>
  action$
    .ofType(watchListActions.actionTypes.ADD_TO_WATCHLIST)
    .concatMap(({payload}: watchListActions.AddToWatchListAction) => {
      watchList.add(payload);
      return [new watchListActions.AddToWatchListSuccessAction(payload)];
    })
    .catch(() => {
      watchList.clear();
      return [];
    });;

export const removeFromWatchListEpic = (action$: ActionsObservable<watchListActions.RemoveFromWatchListAction>) =>
  action$
    .ofType(watchListActions.actionTypes.REMOVE_FROM_WATCHLIST)
    .concatMap(({payload}: watchListActions.RemoveFromWatchListAction) => {
      watchList.remove(payload);
      return [new watchListActions.RemoveFromWatchListSuccessAction(payload)];
    })
    .catch(() => {
      watchList.clear();
      return [];
    });;

export const bootstrapWatchListEpic = (action$: ActionsObservable<cryptoActions.BootstrapAction>) =>
  action$
    .ofType(cryptoActions.actionTypes.BOOTSTRAP)
    .mergeMap(() => watchList.store)
    .switchMap((ticker: m.IWatchList) => [
      new watchListActions.AddToWatchListAction(ticker),
    ])
    .catch(() => {
      watchList.clear();
      return [];
    });

export default [
  addToWatchListEpic,
  removeFromWatchListEpic,
  bootstrapWatchListEpic,
]
