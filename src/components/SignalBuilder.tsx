import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import AddButton from './AddButton';
// import SignalItemSelect from './SignalItemSelect';

interface IProps {
  items: string[];
  title: string;
}


export default class Combine extends React.Component<IProps> {

  public addItem(id: string) {
    debugger
  }

  public render() {
    return (
      <div style={{display: 'flex'}}>
          <Paper elevation={4} style={{padding: '10px'}}>

            <Typography><AddButton addItem={this.addItem} /> {this.props.title}</Typography>
            {/* <SignalItemSelect addItem={this.addItem} selected={'10'} /> */}
          </Paper>

      </div>
    )
  }
}
