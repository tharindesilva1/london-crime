import { PieChart } from "react-minimal-pie-chart";
import React, { useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { AiOutlineClose } from "react-icons/ai";
import { CrimeType, TypeCount } from "../typings/crime";

interface Props {
  typeCounts: TypeCount[];
  onClose: () => void;
}

const TypeToColor = (type: CrimeType) => {
  switch (type) {
    case CrimeType.DMG_AND_ARSON:
      return "#cc0000";
    case CrimeType.BIKE_THEFT:
      return "#ff5600";
    case CrimeType.CAR_THEFT:
      return "#ff9900";
    case CrimeType.BURGLARY:
      return "#ffe600";
    case CrimeType.DRUGS:
      return "#82e600";
    case CrimeType.PERSON_THEFT:
      return "#00cc58";
    case CrimeType.PUB_ORDER:
      return "#00ceff";
    case CrimeType.ROBBERY:
      return "#0a54f5";
    case CrimeType.SHOPLIFT:
      return "#8f00d6";
    case CrimeType.V_AND_S_OFFENCES:
      return "#e600ac";
    case CrimeType.WEAPON:
      return "#750342";
    default:
      return "rgb(0,0,0)";
  }
};

function getToolTipText(typeCount: TypeCount) {
  return `${typeCount.type} (${typeCount.count})`;
}

const AreaChart = ({ typeCounts, onClose }: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const data = typeCounts.map(({ type, count }) => {
    return {
      value: count,
      color: TypeToColor(type),
    };
  });

  const totalCrimeCount = typeCounts.reduce(
    (accum: number, typeCount: TypeCount) => {
      return accum + typeCount.count;
    },
    0
  );

  const SingleCrimeType = typeCounts.length === 1;

  if (SingleCrimeType) {
    return (
      <InfoContainer>
        <span>{`There were ${totalCrimeCount} crimes committed`}</span>
        <span>{`Crimes were of type: ${typeCounts[0].type}`}</span>
      </InfoContainer>
    );
  }
  return (
    <ChartContainer data-tip="" data-for="chart">
      <CloseButton onClick={onClose} title={"Close area chart"}>
        <AiOutlineClose />
      </CloseButton>
      <PieChart
        data={data}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
        radius={90}
      />
      <CrimeTotal title={"Total crimes in selected area"}>
        {totalCrimeCount}
      </CrimeTotal>
      <ReactTooltipStyled
        id="chart"
        getContent={() =>
          hovered !== null ? getToolTipText(typeCounts[hovered]) : null
        }
      />
    </ChartContainer>
  );
};

const InfoContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  place-items: center;
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 1rem;
  border-radius: 8px;

  span {
    margin: 0.1rem;
  }
`;
const ChartContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgb(255, 255, 255);
  display: grid;
  place-items: center;
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 8px;
  max-width: 25rem;
  max-height: 25rem;

  svg {
    border-radius: 8px;
  }
`;

const CrimeTotal = styled.span`
  position: absolute;
  top: 50%;
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  font-weight: 600;
  text-align: center;
  transform: translateY(-50%);
  background: white;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  border-radius: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  display: grid;
  place-items: center;
  top: 2.5%;
  right: 2.5%;
  width: 2rem;
  font-weight: 900;
  height: 2rem;
  background: white;
  border-radius: 2rem;
  border: none;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  cursor: pointer;
`;

const ReactTooltipStyled = styled(ReactTooltip)`
  font-size: 1rem !important; // docs say to use important
  font-weight: 900 !important;
`;

export default AreaChart;
