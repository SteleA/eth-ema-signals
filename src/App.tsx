import * as React from 'react';
import { connect } from 'react-redux';

import {IGetCrypto, ISymbol} from './models';

import * as fromRoot from './reducers';

import * as cryptoActions from './actions/crypto.actions';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TRADING_VIEW_URL = 'https://www.tradingview.com/chart/?symbol=BINANCE:';

interface IProps {
  getRankings: () => {};
  getTickers: () => {};
  getCrypto: (crypto: IGetCrypto) => {};
  cryptos: ISymbol[];
}

class App extends React.Component<IProps> {

  public componentDidMount() {
    this.props.getRankings();
    this.props.getTickers();
  }

  public render() {
    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow >
              <TableHeaderColumn>#</TableHeaderColumn>
              <TableHeaderColumn>Symbol</TableHeaderColumn>
              <TableHeaderColumn>Interval</TableHeaderColumn>
              <TableHeaderColumn>Strength</TableHeaderColumn>
              <TableHeaderColumn>EMA crossings</TableHeaderColumn>
              <TableHeaderColumn>Price change 24h</TableHeaderColumn>
              <TableHeaderColumn>Volume 24h</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.cryptos
              .map((crypto: ISymbol) =>
                <TableRow key={crypto.id}>
                  <TableRowColumn>{crypto.rank}</TableRowColumn>
                  <TableRowColumn>
                    <a target="_blank" href={`${TRADING_VIEW_URL}${crypto.pair}`}>{crypto.pair}</a>
                  </TableRowColumn>
                  <TableRowColumn>{crypto.interval}</TableRowColumn>
                  <TableRowColumn>{crypto.strength}</TableRowColumn>
                  <TableRowColumn>
                    <div>EMA10: {crypto.ema10TicksSinceCrossning}</div>
                    <div>EMA25: {crypto.ema25TicksSinceCrossning}</div>
                    <div>EMA50: {crypto.ema50TicksSinceCrossning}</div>
                  </TableRowColumn>
                  <TableRowColumn>{crypto.priceChangePercent && `${crypto.priceChangePercent}%`}</TableRowColumn>
                  <TableRowColumn>{crypto.totalTradedQuoteAssetVolume && Number(crypto.totalTradedQuoteAssetVolume).toFixed()}</TableRowColumn>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: fromRoot.IState) => ({
  cryptos: fromRoot.getCryptos(state),
});

const mapDispatchToProps = (dispatch: (action: any) => {}) => ({
  getTickers: () => dispatch(new cryptoActions.GetTickersAction()),
  getRankings: () => dispatch(new cryptoActions.GetRankingAction()),
  getCrypto: (crypto: IGetCrypto) => dispatch(new cryptoActions.GetCryptoAction(crypto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
