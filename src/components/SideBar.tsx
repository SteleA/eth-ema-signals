import * as React from 'react';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { getId } from '../utils';

import * as m from '../models';

export interface IWatchList {
  tickers: m.ITicker[];
  addToWatchList: (ticker: m.ITicker) => void;
  removeFromWatchList: (ticker: m.ITicker) => void;
  sidebarOpen: boolean;
  watchList: m.IWatchList[];
  isWatchListLoading: boolean;
}

export default class SideBar extends React.Component<IWatchList> {
  public onAdd(ticker: m.ITicker) {
    this.props.addToWatchList(ticker);
  }
  public onRemove(ticker: m.ITicker) {
    this.props.removeFromWatchList(ticker);
  }

  public render() {
    return (
      <Drawer variant="permanent" style={{width: '200px'}}>
        <List>
          {this.props.tickers.map(ticker => {
            const watchList = this.props.watchList;
            const existsInWatchList = watchList.some(item => item.id === getId(ticker.pair, ticker.exchange));
            return (
              <ListItem key={ticker.pair}>
                <ListItemText primary={ticker.pair} secondary={ticker.exchange} />
                <ListItemSecondaryAction>
                  <IconButton disabled={this.props.isWatchListLoading} aria-label="Delete">
                    {
                      existsInWatchList ?
                        <DeleteIcon onClick={this.onRemove.bind(this, ticker)}/> :
                        <AddIcon onClick={this.onAdd.bind(this, ticker)}/>
                    }
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )

          }

          )}
        </List>
      </Drawer>
    )
  }
}
