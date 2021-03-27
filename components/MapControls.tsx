import * as React from "react";
import { IconButton } from "@material-ui/core";
import { BiSelection, BiCurrentLocation } from "react-icons/bi";
import styled from "styled-components";

interface Props {
  crimeTypesLoading: boolean;
  DrawAreaToggled: boolean;
  onLocateMe: () => void;
  onDrawAreaToggle: () => void;
}

const MapControls = ({
  DrawAreaToggled,
  onLocateMe,
  onDrawAreaToggle,
}: Props) => {
  return (
    <ControlsPanel>
      <IconButton title={"Locate me"} onClick={onLocateMe}>
        <BiCurrentLocation />
      </IconButton>
      <ToggleableIconButton
        title={"Check crime types within area"}
        onClick={onDrawAreaToggle}
        $toggled={DrawAreaToggled}
      >
        <BiSelection />
      </ToggleableIconButton>
    </ControlsPanel>
  );
};

const ControlsPanel = styled.div`
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  place-items: center;
  background: white;
  margin: 1rem;
  border-radius: 32px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 2;

  > * {
    margin: 0.25rem 0 !important;
  }
`;

const ToggleableIconButton = styled(IconButton)<{ $toggled: boolean }>`
  color: ${(props) =>
    props.$toggled ? "rgb(98, 154, 245)" : "rgba(0, 0, 0, 0.54)"}!important;
`;

export default MapControls;
