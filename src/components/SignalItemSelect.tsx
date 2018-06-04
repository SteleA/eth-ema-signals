import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as React from 'react';

interface IProps {
  addItem: (id: string) => void;
  selected: string;
}

export default (props: IProps) => {
  const addItem = ({target}: React.SyntheticEvent<HTMLElement>) => {
    const value = (target as HTMLInputElement).value;
    props.addItem(value);
  };

  return (
    <FormControl>
      <Select value={'10'} onChange={addItem} >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'10'}>Ten</MenuItem>
        <MenuItem value={'20'}>Twenty</MenuItem>
        <MenuItem value={'30'}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}

