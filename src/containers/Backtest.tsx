import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import {Moment} from 'moment';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import styled from 'styled-components';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import 'react-datepicker/dist/react-datepicker.css';

import * as backtestActions from '../actions/backtest.actions';
import * as m from '../models';
import * as fromRoot from '../reducers';
import * as backtestReducer from '../reducers/backtest.reducer';

import SignalBuilder from '../components/SignalBuilder';

const Title = styled.span`
  font-size: 1em;
  margin-right: 15px;
  margin-bottom: 10px;
  text-align: center;
  width: 1000px;
  font-family: 'roboto';
  text-transform: capitalize;
  color: ${props => (props as any).type === 'short' ? 'palevioletred' : (props as any).type === 'long' ? '#22bf8f' : 'black'};
`;

const Wrapper = styled.div`
  font-family: 'roboto';
  margin-bottom: 15px;
`;

const Page = styled.div`
  display: flex;
`;

const LeftSide = styled.div`

`;

const RightSide = styled.div`

`;

interface IProps extends RouteComponentProps<any> {
  setCrypto: (id: string) => {};
  backtest: m.IBacktestResults[];
  setStartDate: (date: string) => {};
  startDate: Moment;
  minStartDate: Moment;
  position: number;
}

class Backtest extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
  }

  public componentDidMount() {
    this.props.setCrypto(this.props.match.params.id);
  }

  public onDateChange(date: Moment) {
    this.props.setStartDate(date.clone().startOf('day').toISOString());
  }

  public render() {
    return (
      <Page>
        <LeftSide>

          <Wrapper>
            <Typography>Start date:</Typography>
              <DatePicker
              selected={this.props.startDate}
              onChange={this.onDateChange}
            />
          </Wrapper>

          <Wrapper>
            <TextField id="position" label="Position" margin="normal" value={this.props.position} />
          </Wrapper>

          <Wrapper>
            <SignalBuilder title="Entry signal" items={['heya!']} />
          </Wrapper>

          <Wrapper>
            <SignalBuilder title="Exit signal" items={['heya!']} />
          </Wrapper>
        </LeftSide>
        <RightSide>
          {this.props.backtest && this.props.backtest.map(entry =>
            <ExpansionPanel style={{width: '1000px'}} key={`${entry.position}${entry.type}`}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <Title {...entry}>
                    {entry.type}
                  </Title>
                  <Title>
                    {entry.data.slice(-1)[0].openTimeFormated} -> {entry.data[0].openTimeFormated}
                  </Title>
                  <Title {...entry}>
                    {Number(entry.data[0].changePercent).toFixed(2)}%
                  </Title>
                  <Title>Length: {entry.data.length}</Title>
                  <Title>
                    Position: {entry.position.toFixed(2)}
                  </Title>
                  <Title>
                    Value: {entry.data[0].value.toFixed(2)}
                  </Title>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table>
                  <TableHead>
                    <TableRow >
                      <TableCell>Date</TableCell>
                      <TableCell>Close</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell>Change</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entry.data.map(item =>
                      <TableRow key={item.closeTime}>
                        <TableCell><small>{entry.data.slice(-1)[0].openTime} </small>{item.openTimeFormated}</TableCell>
                        <TableCell>{item.close}</TableCell>
                        <TableCell>{item.position.toFixed(3)}</TableCell>
                        <TableCell>{item.changePercent.toFixed(2) || 0}%</TableCell>
                        <TableCell>{item.value.toFixed(2)}</TableCell>
                      </TableRow>
                    )}

                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </RightSide>
      </Page>

    );
  }
}

const mapStateToProps = (state: fromRoot.IState) => ({
  backtest: fromRoot.getBacktest(state),
  minStartDate: backtestReducer.getMinStartDate(state),
  startDate: backtestReducer.getStartDate(state),
  position: fromRoot.getBacktestPosition(state),
});

const mapDispatchToProps = (dispatch: (action: any) => {}) => ({
  setCrypto: (id: string) => dispatch(new backtestActions.SetCryptoAction(id)),
  setStartDate: (date: string) => dispatch(new backtestActions.SetStartDateAction(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backtest);
