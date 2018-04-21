import { Observable } from 'rxjs/Observable';
import { ITicker, IWSTickerResponse } from '../models';

export class BinanceWS {
  public URL = 'wss://stream.binance.com:9443/ws/';

  public create(path: string): Observable<ITicker[]> {
    return Observable.webSocket(`${this.URL}${path}`)
      .map((tickers: IWSTickerResponse[]) =>
        tickers.map(ticker => ({
            close: ticker.c,
            closeTradesQuantity: ticker.Q,
            eventType: ticker.e,
            high: ticker.h,
            low: ticker.l,
            open: ticker.o,
            pair: ticker.s,
            previousDaysClosePrice: ticker.x,
            priceChange: ticker.p,
            priceChangePercent: ticker.P,
            totalTradedQuoteAssetVolume: ticker.q,
            volume: ticker.v,
        })
      ));
  }
}
