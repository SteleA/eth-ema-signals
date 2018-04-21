import fetch from 'node-fetch';

import { IGetCrypto, ITickerResponse } from '../models';

const API = 'crypto-signals.herokuapp.com';

export const getCrypto = ({pair, interval}: IGetCrypto): Promise<ITickerResponse[]> =>
  fetch(`//${API}?symbol=${pair}&interval=${interval}`)
    .then((res: any)=> res.json());
