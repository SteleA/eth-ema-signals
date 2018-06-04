import * as React from 'react';
import { connect } from 'react-redux';

import * as cryptoActions from '../actions/crypto.actions';
import * as watchListActions from '../actions/watchlist.actions';
import SideBar from '../components/SideBar';
import WatchList from '../components/WatchList';
import * as m from '../models';
import * as fromRoot from '../reducers';
import { getId } from '../utils';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`

interface IProps {
  getRankings: (limit: number) => {};
  getTickers: () => {};
  bootstrap: () => {};
  openSidebar: () => {};
  closeSidebar: () => {};
  getCrypto: (crypto: m.ICrypto) => {};
  addToWatchList: (tickers: m.IWatchList) => {};
  removeFromWatchList: (id: string) => {};
  watchList: m.ICrypto[];
  tickers: m.ITicker[];
  sidebarOpen: boolean;
  isWatchListLoading: boolean,
}


class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.onAddToWatchList = this.onAddToWatchList.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.backtest = this.backtest.bind(this);
    this.onRemoveFromWatchList = this.onRemoveFromWatchList.bind(this);
  }

  public onAddToWatchList({pair, exchange}: m.ITicker) {
    this.props.addToWatchList(
      {
        id: getId(pair, exchange),
        pair,
        exchange,
      }
    );
  }

  public onRemoveFromWatchList({pair, exchange}: m.ITicker) {
    this.props.removeFromWatchList(getId(pair, exchange));
  }


  public toggleSidebar() {
    this.props.sidebarOpen ? this.props.closeSidebar() : this.props.openSidebar();
  }

  public backtest(id: string) {
    debugger
  }

  public render() {
    return (
      <Wrapper>
        <SideBar
          tickers={this.props.tickers}
          watchList={this.props.watchList}
          addToWatchList={this.onAddToWatchList}
          removeFromWatchList={this.onRemoveFromWatchList}
          sidebarOpen={this.props.sidebarOpen}
          isWatchListLoading={this.props.isWatchListLoading}
        />
        <WatchList watchList={this.props.watchList} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: fromRoot.IState) => ({
  watchList: fromRoot.getWatchList(state),
  tickers: fromRoot.getTickers(state),
  isWatchListLoading: fromRoot.getWatchListIsLoading(state),
});

const mapDispatchToProps = (dispatch: (action: any) => {}) => ({
  openSidebar: () => dispatch(new watchListActions.OpenSideBarAction()),
  closeSidebar: () => dispatch(new watchListActions.CloseSideBarAction()),
  getTickers: () => dispatch(new cryptoActions.GetTickersAction()),
  bootstrap: () => dispatch(new cryptoActions.BootstrapAction()),
  getRankings: (limit: number) => dispatch(new cryptoActions.GetRankingAction(limit)),
  getCrypto: (crypto: m.ICrypto) => dispatch(new cryptoActions.GetCryptoAction(crypto)),
  addToWatchList: (ticker: m.IWatchList) =>  dispatch(new watchListActions.AddToWatchListAction(ticker)),
  removeFromWatchList: (id: string) =>  dispatch(new watchListActions.RemoveFromWatchListAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
