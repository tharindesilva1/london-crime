import { CirclePaint, SymbolPaint } from "mapbox-gl";

export const getHeatmapPaint = (maxScaler: number): mapboxgl.HeatmapPaint => {
  return {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", "point_count"],
      0,
      0,
      maxScaler,
      1,
    ],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 10, 1, 14, 4],
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.2,
      "rgb(103,169,207)",
      0.4,
      "rgb(209,229,240)",
      0.6,
      "rgb(253,219,199)",
      0.8,
      "rgb(239,138,98)",
      1,
      "rgb(178,24,43)",
    ],
    "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      ["interpolate", ["linear"], ["get", "point_count"], 0, 2, maxScaler, 100],
      14,
      [
        "interpolate",
        ["linear"],
        ["get", "point_count"],
        0,
        50,
        maxScaler,
        200,
      ],
    ],

    "heatmap-opacity": 0.75,
  };
};

export const getClusteredCountCirclePaint = (
  maxScaler: number
): CirclePaint => {
  return {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13,
      0,
      14,
      ["interpolate", ["linear"], ["get", "point_count"], 1, 16, maxScaler, 25],
    ],
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "point_count"],
      1,
      "#75b1d1",
      maxScaler,
      "#ff0008",
    ],
    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 14, 0.75],
  };
};

export const getClusteredCountTextPaint = (): SymbolPaint => {
  return {
    "text-color": "white",
    "text-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 14, 1],
  };
};
