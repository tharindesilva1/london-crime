import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";

import { addSource, addLayers } from "./layers";
import MapControls from "../MapControls";
import { IRec } from "../../typings/rec";
import { TypeCount } from "../../typings/crime";
import AreaChart from "../AreaChart";

interface Props {
  areaCrimeTypes: TypeCount[];
  crimeTypesLoading: boolean;
  points: Feature<Geometry, GeoJsonProperties>[];
  onAreaSelect: (area?: IRec) => void;
  drawAreaToggleStatus: boolean;
  setDrawAreaToggleStatus: (toggled: boolean) => void;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

const LONDON_BOUNDS: [number, number, number, number] = [
  -0.57, // Southwest coordinates
  51.25,
  0.37, // Northeast coordinates
  51.72,
];

const LONDON_CENTER: [number, number] = [-0.1278, 51.5074];

enum DrawMode {
  static = "static",
  rectangle = "draw_rectangle",
}

const Map = (props: Props) => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [draw, setDraw] = useState<MapboxDraw>();

  const [locator, setLocator] = useState<mapboxgl.GeolocateControl>();

  useEffect(() => {
    if (pageIsMounted && map && props.points && props.points.length) {
      addSource(map, props.points);
      addLayers(map, props.points.length);
    }
  }, [pageIsMounted, props.points]);

  useEffect(() => {
    setPageIsMounted(true);

    const newMap = new mapboxgl.Map({
      container: "crime-map",
      style: "mapbox://styles/tharindesilva1/ckmvr60j308vg17r6agieeztg",
      center: LONDON_CENTER,
      pitch: 45,
      zoom: 10,
      minZoom: 10,
      maxZoom: 17.99,
      maxBounds: LONDON_BOUNDS,
    });

    const newLocator = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

    const modes: { draw_rectangle?: any; static?: any } & MapboxDraw.DrawModes =
      MapboxDraw.modes;
    modes.static = StaticMode;

    modes.draw_rectangle = DrawRectangle;
    const newDraw = new MapboxDraw({
      //@ts-ignore custom draw and typescript don't play nice :(
      modes,
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      userProperties: true,
    });

    newMap.addControl(newLocator);
    newMap.addControl(newDraw);

    setDraw(newDraw);
    setMap(newMap);
    setLocator(newLocator);

    newMap.on("draw.create", ({ features }) => {
      const x: number[] = [
        features[0].geometry.coordinates[0][0][1],
        features[0].geometry.coordinates[0][2][1],
      ];

      const y: number[] = [
        features[0].geometry.coordinates[0][0][0],
        features[0].geometry.coordinates[0][2][0],
      ];

      const area: IRec = {
        xMax: Math.max(...x),
        xMin: Math.min(...x),
        yMax: Math.max(...y),
        yMin: Math.min(...y),
      };

      props.onAreaSelect(area);
    });

    newMap.on("draw.modechange", (e) => {
      if (e.mode === DrawMode.static) props.setDrawAreaToggleStatus(false);
    });
  }, []);

  const locateMe = () => {
    if (locator) locator.trigger();
  };

  const selectDrawMode = () => {
    if (draw) {
      if (!props.drawAreaToggleStatus) {
        clearDraw();
        props.setDrawAreaToggleStatus(true);
        draw.changeMode(DrawMode.rectangle);
      } else {
        props.setDrawAreaToggleStatus(false);
        draw.changeMode(DrawMode.static);
      }
    }
  };

  const clearDraw = () => {
    if (draw) {
      draw.deleteAll();
      props.onAreaSelect();
    }
  };

  return (
    <>
      <MapControls
        crimeTypesLoading={props.crimeTypesLoading}
        DrawAreaToggled={props.drawAreaToggleStatus}
        onDrawAreaToggle={selectDrawMode}
        onLocateMe={locateMe}
      />
      <MapContainer id="crime-map"></MapContainer>
      {!!props.areaCrimeTypes.length && (
        <AreaChart onClose={clearDraw} typeCounts={props.areaCrimeTypes} />
      )}
    </>
  );
};

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;

  .mapboxgl-ctrl-group button {
    display: none;
  }
`;

export default Map;
