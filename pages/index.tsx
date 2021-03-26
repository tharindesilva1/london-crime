import React, { useMemo, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import FilterControls from "../components/FilterControls";
import MapControls from "../components/MapControls";
import Map from "../components/Map/index";
import { CrimeType } from "../typings/crime";
import { Feature, GeoJsonProperties, Geometry } from "geojson";

const IndexPage = () => {
  const [selectedCrimeDate, setSelectedCrimeDate] = useState<string>(
    "Wed Jan 01 2020"
  );
  const [selectedCrimeType, setSelectedCrimeType] = useState<CrimeType>(
    CrimeType.ALL
  );

  const [getCrimes, { loading, error, data: pointData }] = useLazyQuery(
    gql`
      query FindCrimes($startDate: String!, $endDate: String!, $type: String) {
        findCrimes(startDate: $startDate, endDate: $endDate, type: $type) {
          location
        }
      }
    `
  );

  const points: Feature<Geometry, GeoJsonProperties>[] = useMemo(() => {
    if (pointData) {
      console.log(pointData.findCrimes);
      return pointData.findCrimes.map(
        ({ location }: { location: number[] }) => ({
          type: "Feature",
          properties: { cluster: false },
          geometry: {
            type: "Point",
            coordinates: location,
          },
        })
      );
    } else {
      return [];
    }
  }, [pointData]);

  const filterCrimes = () =>
    getCrimes({
      variables: {
        startDate: selectedCrimeDate,
        endDate: selectedCrimeDate,
        type: selectedCrimeType,
      },
    });

  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.css"
          type="text/css"
        />
      </head>
      <main>
        <FilterControls
          date={selectedCrimeDate}
          type={selectedCrimeType}
          onChangeDate={setSelectedCrimeDate}
          onChangeType={setSelectedCrimeType}
          onFilter={filterCrimes}
        />
        <MapControls />
        <Map points={points} />
      </main>
    </div>
  );
};

export default IndexPage;
