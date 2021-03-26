import * as React from "react";
import { IconButton } from "@material-ui/core";
import { BiSelection, BiCurrentLocation } from "react-icons/bi";
import styled from "styled-components";

interface Props {}

const MapControls = (props: Props) => {
  return (
    <ControlsPanel>
      <IconButton title={"Locate me"}>
        <BiCurrentLocation />
      </IconButton>
      <IconButton>
        <BiSelection title={"Check crime types within area"} />
      </IconButton>
    </ControlsPanel>
  );
};

const ControlsPanel = styled.div`
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  place-items: center;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  z-index: 2;

  > * {
    margin: 0.25rem;
  }
`;

export default MapControls;
