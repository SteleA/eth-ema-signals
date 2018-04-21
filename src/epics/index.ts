import { combineEpics } from 'redux-observable';

import {
  addTopRankingCryptoEpic,
  binanceTickerStreamEpic,
  getCryptoEpic,
  getCryptosEpic,
  getRanking,
} from './crypto.epic';

export default combineEpics(
  getCryptoEpic,
  getCryptosEpic,
  binanceTickerStreamEpic as any,
  getRanking,
  addTopRankingCryptoEpic
);

