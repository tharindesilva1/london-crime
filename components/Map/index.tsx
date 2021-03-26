import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";

import { addSource, addLayers } from "./layers";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { drawStyles } from "./styles";
import styled from "styled-components";

mapboxgl.accessToken = process.env.TENOR_API_KEY ?? "";

interface Props {
  points: Feature<Geometry, GeoJsonProperties>[];
}

const LONDON_BOUNDS: [number, number, number, number] = [
  -0.50623, // Southwest coordinates
  51.305156,
  0.288822, // Northeast coordinates
  51.608246,
];

const Map = (props: Props) => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [draw, setDraw] = useState<MapboxDraw>();

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
      style: "mapbox://styles/mapbox/streets-v11",
      // center: [-0.1278, 51.5074],
      pitch: 45,
      zoom: 10,
      minZoom: 10,
      maxZoom: 17.99,
      maxBounds: LONDON_BOUNDS,
    });

    const modes: { draw_rectangle?: any } & MapboxDraw.DrawModes =
      MapboxDraw.modes;

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
      styles: drawStyles,
    });

    newMap.addControl(newDraw, "top-right");

    setMap(newMap);
    setDraw(newDraw);

    newMap.on("zoom", function () {
      console.log(newMap.getZoom());
    });

    newMap.on("draw.create", function (feature) {
      console.log(feature);
    });
    newMap.on("draw.modechange", (e) => {
      if (e.mode === "draw_polygon") {
        newDraw.changeMode("draw_rectangle");
      }
    });
  }, []);

  return <MapContainer id="crime-map"></MapContainer>;
};

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Map;
