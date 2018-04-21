import { IGetCrypto } from './IGetCrypto';
import { ITickerResponse } from './ITickerResponse';

export interface ICrypto extends IGetCrypto {
  data: ITickerResponse[];

}
