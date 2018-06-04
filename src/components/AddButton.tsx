import * as React from 'react';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

const addButtonStyle = {
  width: '20px',
  height: '20px',
  minHeight: '20px',
  fontSize: '10px',
}

const addIconStyle = {
  fontSize: '18px',
}

const indicators = [
  {
    id: 'ema',
    name: 'EMA',
  },
];

const operators = [
  {
    id: 'gt',
    name: '>',
  },
  {
    id: 'gte',
    name: '>=',
  },
  {
    id: 'lt',
    name: '<',
  },
  {
    id: 'lte',
    name: '<=',
  },
  {
    id: 'equals',
    name: 'EQUALS',
  },
  {
    id: 'and',
    name: 'AND',
  },
  {
    id: 'or',
    name: 'OR',
  },
  {
    id: 'not',
    name: 'NOT',
  },
];

const values = [
  {
    id: 'close',
    name: 'Close',
  },
  {
    id: 'open',
    name: 'Open',
  },
  {
    id: 'volume',
    name: 'Volume',
  },
  {
    id: 'high',
    name: 'High',
  },
  {
    id: 'low',
    name: 'Low',
  },
];

const stoppers = [
  {
    id: 'stopLoss',
    name: 'Stop loss',
  },
  {
    id: 'stopProfit',
    name: 'Stop profit',
  },
];

const allValues = [
  {
    id: 'operators',
    name: 'Opterators',
    items:  operators
  },
  {
    id: 'indicators',
    name: 'Indicators',
    items:  indicators
  },
  {
    id: 'values',
    name: 'Values',
    items:  values
  },
  {
    id: 'stoppers',
    name: 'Stoppers',
    items: stoppers
  }
];

interface IProps {
  addItem: (id: string) => void;
}

interface IState {
  open: boolean;
}

export default class AddButton extends React.Component<IProps, IState> {

  public state = {
    open: false,
  }

  public handleOpen() {
    this.setState({open: !this.state.open});
  }

  public selectItem(id: string) {
    this.props.addItem(id);
  }

  public render() {
    return(
      <Button
        variant="fab"
        mini={true}
        color="secondary"
        aria-label="add"
        style={addButtonStyle}
        onClick={this.handleOpen.bind(this, null)}
      >
        <AddIcon style={addIconStyle} />
        <Menu id="long-menu" open={this.state.open}>
          {allValues.map(option => (
            <div key={option.id}>
              <ListSubheader component="div" disableSticky={true}>{option.name}</ListSubheader>
              {option.items.map(item => (
                <MenuItem key={item.id} component="div" onClick={this.selectItem.bind(this, item.id)}>
                  <ListItem>
                    {item.name}
                  </ListItem>
                </MenuItem>
              ))}
            </div>
          ))}
        </Menu>
      </Button>
    );
  }

}
