import { combineEpics } from 'redux-observable';

import {
  binanceTickerStreamEpic,
  bootstrapEpic,
  // getCryptoEpic,
  getCryptosEpic,
  getRanking,
} from './crypto.epic';

import * as watchListEpics from './watchlist.epics';

export default combineEpics(
  // getCryptoEpic,
  getCryptosEpic,
  binanceTickerStreamEpic as any,
  getRanking,
  ...watchListEpics.default,
  // watchListEpics.addToWatchListEpic,
  // watchListEpics.removeFromWatchListEpic,
  bootstrapEpic,
);

