import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import {
  getClusteredCountCirclePaint,
  getClusteredCountTextPaint,
  getHeatmapPaint,
} from "./styles";

export const addSource = (
  map: mapboxgl.Map,
  features: Feature<Geometry, GeoJsonProperties>[]
) => {
  const data: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features,
  };
  const sourceId = "crimes";
  const existingSource = map.getSource(sourceId);

  if (!existingSource) {
    map.addSource(sourceId, {
      type: "geojson",
      data,
      cluster: true,
      clusterRadius: 20,
    });
  } else {
    existingSource.setData(data);
  }
};

export const addLayers = (map: mapboxgl.Map, crimeCount: number) => {
  addHeatmapLayer(map, crimeCount);
  addClusteredCountLayer(map, crimeCount);
};

const addHeatmapLayer = (map: mapboxgl.Map, crimeCount: number) => {
  const layerId = "crime-heatmap";
  const maxScaler = crimeCount / 150;

  if (map.getLayer(layerId)) map.removeLayer(layerId);

  map.addLayer({
    id: layerId,
    type: "heatmap",
    source: "crimes",
    filter: ["has", "point_count"],
    paint: getHeatmapPaint(maxScaler),
  });
};

const addClusteredCountLayer = (map: mapboxgl.Map, crimeCount: number) => {
  const circleLayerId = "crime-cluster-circle";
  const countLayerId = "crime-cluster-count";
  const singleLayerId = "crime-cluster-single";
  const maxScaler = crimeCount / 500;

  if (map.getLayer(circleLayerId)) map.removeLayer(circleLayerId);
  if (map.getLayer(countLayerId)) map.removeLayer(countLayerId);
  if (map.getLayer(singleLayerId)) map.removeLayer(singleLayerId);

  map.addLayer({
    id: circleLayerId,
    type: "circle",
    source: "crimes",
    minzoom: 13,
    filter: ["has", "point_count"],
    paint: getClusteredCountCirclePaint(maxScaler),
  });

  map.addLayer({
    id: countLayerId,
    type: "symbol",
    source: "crimes",
    minzoom: 12,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 13, 0, 14, 16],
    },
    paint: getClusteredCountTextPaint(),
  });

  map.addLayer({
    id: singleLayerId,
    type: "symbol",
    source: "crimes",
    minzoom: 12,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": [
        "match",
        ["get", "type"],
        "Drugs",
        "drugs",
        "Possession of weapons",
        "weapon",
        "Bicycle theft",
        "bike_theft",
        "Vehicle theft",
        "car_theft",
        "Shoplifting",
        "shoplift",
        "Criminal damage and arson",
        "dmg_and_arson",
        "Robbery",
        "robbery",
        "Public order",
        "pub_order",
        "Violence and sexual offences",
        "v_and_s_offences",
        "Burglary",
        "burglary",
        "Theft from the person",
        "person_theft",
        "person_theft",
      ],
      "icon-size": ["interpolate", ["linear"], ["zoom"], 13, 0, 14, 1.25],
    },
  });
};
