import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as React from "react";
import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import styled from "styled-components";

import { CrimeType } from "../typings/crime";

interface Props {
  date: string;
  type: CrimeType;
  onChangeDate: (value: string) => void;
  onChangeType: (type: CrimeType) => void;
  onFilter: () => void;
}

const FilterControls = (props: Props) => {
  return (
    <ControlsPanel>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          views={["year", "month"]}
          label="Crimes from:"
          minDate={new Date("2020-01-01")}
          maxDate={new Date("2020-12-01")}
          value={props.date}
          InputProps={{ readOnly: true }}
          onChange={(_, value) => props.onChangeDate(value!)}
          autoOk={true}
        />
      </MuiPickersUtilsProvider>
      <div>
        <InputLabel shrink id="crime-type-select-placeholder-label">
          Crime Type:
        </InputLabel>
        <Select
          labelId="crime-type-select-placeholder-label"
          value={props.type}
          onChange={(e) => props.onChangeType(e.target.value as CrimeType)}
        >
          {Object.values(CrimeType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </div>
      <FilterButton onClick={props.onFilter} variant="contained">
        Filter
      </FilterButton>
    </ControlsPanel>
  );
};

const ControlsPanel = styled.div`
  position: fixed;
  display: flex;
  place-items: center;
  background: white;
  border-radius: 0.25rem;
  border: 2px solid palevioletred;
  color: palevioletred;
  z-index: 2;

  > * {
    margin: 1rem !important;
  }
`;

const FilterButton = styled(Button)`
  flex: 0 0 auto;
  height: 2.5rem;
`;

export default FilterControls;
