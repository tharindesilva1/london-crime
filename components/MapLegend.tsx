import * as React from "react";
import styled from "styled-components";
import {
  BikeTheft,
  Burglary,
  CarTheft,
  DmgAndArson,
  Drugs,
  PersonTheft,
  PubOrder,
  Robbery,
  Shoplift,
  VAndSOffences,
  Weapon,
} from "./icons";

const MapLegend = () => {
  return (
    <Info>
      <h1>{"Legend: "}</h1>
      <div>
        <BikeTheft />
        <span>{"Bicycle theft"}</span>
        <Burglary />
        <span>{"Burglary"}</span>
        <CarTheft />
        <span>{"Vehicle theft"}</span>
        <DmgAndArson />
        <span>{"Criminal damage and arson"}</span>
        <Drugs />
        <span>{"Drugs"}</span>
        <PersonTheft />
        <span>{"Theft from a person"}</span>
        <PubOrder />
        <span>{"Robbery"}</span>
        <Robbery />
        <span>{"Public order"}</span>
        <Shoplift />
        <span>{"Shoplifting"}</span>
        <VAndSOffences id="specialSvg" />
        <span>{"Violence and sexual offences"}</span>
        <Weapon id="specialSvg" />
        <span>{"Procession of weapons"}</span>
      </div>
    </Info>
  );
};

const Info = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 8px;
  z-index: 2;
  margin: 1rem;

  h1 {
    margin: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  > div {
    display: grid;
    grid-template-columns: 1.75rem 1fr 1.75rem 1fr;
    grid-template-rows: repeat(5, 1fr);
    flex-direction: column;
    place-items: center;
    justify-items: left;
    margin: 1rem;

    svg {
      margin-right: 0.75rem;
    }

    #specialSvg {
      place-self: center;
    }
  }
`;

export default MapLegend;
