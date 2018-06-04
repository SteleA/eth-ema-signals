import * as React from 'react';
import { connect } from 'react-redux';

import * as cryptoActions from '../actions/crypto.actions';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Backtest from './Backtest';
import Home from './Home';

interface IProps {
  bootstrap: () => {};
}

class App extends React.Component<IProps> {
  public componentDidMount() {
    this.props.bootstrap();
  }

  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/:id" component={Backtest} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: (action: any) => {}) => ({
  bootstrap: () => dispatch(new cryptoActions.BootstrapAction()),
});

export default connect(null, mapDispatchToProps)(App);
