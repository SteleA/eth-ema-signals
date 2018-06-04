import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import { ICrypto } from '../models';

const TRADING_VIEW_URL = 'https://www.tradingview.com/chart/?symbol=BINANCE:';

const Link = styled.a`
  text-decoration: none;
  color: palevioletred;
  &:hover {
    opacity: .5;
  }
`;

export interface IProps extends RouteComponentProps<IProps> {
  watchList: ICrypto[],
}

class WatchList extends React.Component<IProps> {
  public backtest(id: string) {
    this.props.history.push(`/${id}`);
  }

  public render() {
    return (
      <Table>
        <TableHead>
          <TableRow >
            <TableCell>Pair</TableCell>
            <TableCell>Price change 24h</TableCell>
            <TableCell>Volume 24h</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.watchList
            .map((crypto: ICrypto) =>
              <TableRow key={crypto.id}>
                <TableCell>
                  <Link target="_blank" href={`${TRADING_VIEW_URL}${crypto.pair}`}>{crypto.pair}</Link>
                </TableCell>
                  <TableCell>
                    {crypto.priceChangePercent && `${Number(crypto.priceChangePercent).toFixed()}%`}
                  </TableCell>
                  <TableCell>
                    {crypto.totalTradedQuoteAssetVolume && Number(crypto.totalTradedQuoteAssetVolume).toFixed()}
                  </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={this.backtest.bind(this, crypto.id)}
                  >Backtest</Button>
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    )
  }
}

export default withRouter(WatchList);
