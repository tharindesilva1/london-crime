import * as React from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@material-ui/core";
import styled from "styled-components";

import { CrimeType } from "../typings/crime";

interface Props {
  date: string;
  type: CrimeType;
  loading: boolean;
  crimeCount?: number;
  canShowLegend: boolean;
  updateCanShowLegend: (canShow: boolean) => void;
  onChangeDate: (value: string) => void;
  onChangeType: (type: CrimeType) => void;
  onFilter: () => void;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const sliderMarks = [
  {
    value: 1,
    label: "Jan",
  },
  {
    value: 4,
    label: "Apr",
  },
  {
    value: 8,
    label: "Aug",
  },
  {
    value: 12,
    label: "Dec",
  },
];

const FilterControls = (props: Props) => {
  const onSliderChange = (
    _: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    props.onChangeDate(new Date(`2020-${value as number}`).toDateString());
  };

  return (
    <Controls>
      <div id="controlPanel">
        <SliderContainer>
          <InputLabel shrink>
            {/*let's not worry about accessibility right now*/}
            {"Crimes from (2020):"}
          </InputLabel>
          <AngeledSlider
            defaultValue={1}
            valueLabelDisplay={"auto"}
            valueLabelFormat={(i) => <div>{months[i - 1]}</div>}
            step={1}
            min={1}
            max={12}
            onChangeCommitted={onSliderChange}
            marks={sliderMarks}
          />
        </SliderContainer>
        <SelectContainer>
          <InputLabel shrink id="crime-type-select-placeholder-label">
            {"Crime Type:"}
          </InputLabel>
          <Select
            labelId="crime-type-select-placeholder-label"
            value={props.type}
            style={{ minWidth: "17rem" }}
            onChange={(e) => props.onChangeType(e.target.value as CrimeType)}
          >
            {Object.values(CrimeType).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </SelectContainer>
        <FilterButton
          onClick={props.onFilter}
          disabled={props.loading}
          variant="contained"
        >
          {props.loading ? <CircularProgress size={"1.5rem"} /> : "Show"}
        </FilterButton>
      </div>
      <HelperSection>
        <FormControlLabel
          style={{ color: "rgba(0, 0, 0, 0.54)" }} // too lazy :))))
          control={
            <Checkbox
              checked={props.canShowLegend}
              onChange={(_, checked) => props.updateCanShowLegend(checked)}
              color="primary"
            />
          }
          label="Show legend"
        />
        <p id="helperText">
          {props.crimeCount
            ? `There were ${props.crimeCount} crimes, from the last search`
            : 'Set the filter and click "Show" to see data'}
        </p>
      </HelperSection>
    </Controls>
  );
};

const Controls = styled.div`
  position: fixed;
  width: 40rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 1rem;
  z-index: 2;
  font-weight: 600;

  #controlPanel {
    display: flex;
    place-items: center;
    justify-content: center;
  }
`;

const HelperSection = styled.div`
  display: flex;
  place-items: center;
  padding-left: 1rem;
  margin-bottom: 1rem;

  #helperText {
    font-weight: 600;
    margin-left: 3rem;
  }
`;

const SelectContainer = styled.div`
  margin-right: 1rem;
`;

const SliderContainer = styled.div`
  .MuiFormLabel-root {
    padding-bottom: 1rem;
    margin-top: 1rem;
  }
  margin-right: 3rem;
  margin-top: 1.25rem;
`;

const AngeledSlider = styled(Slider)`
  .MuiSlider-markLabel {
    font-size: 0.75rem;
    transform: translate(0.1rem, -0.5rem) rotate(20deg);
  }

  flex: 0 0 10rem;
`;

const FilterButton = styled(Button)`
  flex: 0 0 6rem;
  margin: 1rem 0 0.35rem 1rem !important;
`;

export default FilterControls;
