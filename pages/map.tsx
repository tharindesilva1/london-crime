import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gql, useLazyQuery } from "@apollo/client";
import FilterControls from "../components/FilterControls";
import Map from "../components/map/index";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { IRec } from "../typings/rec";
import MapLegend from "../components/MapLegend";
import { CrimeType, TypeCount } from "../typings/crime";

const IndexPage = () => {
  const [selectedCrimeDate, setSelectedCrimeDate] = useState<string>(
    "Wed Jan 01 2020"
  );

  const [selectedCrimeType, setSelectedCrimeType] = useState<CrimeType>(
    CrimeType.ALL
  );

  const [areaCrimeTypes, setAreaCrimeTypes] = useState<TypeCount[]>([]);
  const clearAreaCrimeTypes = () => setAreaCrimeTypes([]);

  const [canShowMapLegend, setCanShowMapLegend] = useState(true);
  const [drawAreaToggleStatus, setDrawAreaToggleStatus] = useState(false);

  // the mapbox draw event listener creates a closure, we'll hold the values in a ref to compensate
  const selectedCrimeDateRef = useRef<string>(selectedCrimeDate);
  const selectedCrimeTypeRef = useRef<CrimeType>(selectedCrimeType);

  const wrappedSetCrimeDate = (value: string) => {
    setSelectedCrimeDate(value);
    selectedCrimeDateRef.current = value;
  };

  const wrappedSetCrimeType = (value: CrimeType) => {
    setSelectedCrimeType(value);
    selectedCrimeTypeRef.current = value;
  };

  const [findCrimes, { loading: pointLoading, data: pointData }] = useLazyQuery(
    gql`
      query FindCrimes($startDate: String!, $endDate: String!, $type: String) {
        findCrimes(startDate: $startDate, endDate: $endDate, type: $type) {
          location
          type
        }
      }
    `
  );

  const filterCrimes = () => {
    const endDate = new Date(selectedCrimeDate);
    endDate.setMonth(endDate.getMonth() + 1);
    findCrimes({
      variables: {
        startDate: selectedCrimeDate,
        endDate: endDate.toDateString(),
        type: selectedCrimeType,
      },
    });
  };

  const fetchCrimeTypes = useCallback(
    (area?: IRec) => {
      if (area) {
        const { xMin, xMax, yMin, yMax } = area;
        const endDate = new Date(selectedCrimeDateRef.current);
        endDate.setMonth(endDate.getMonth() + 1);

        findCrimeTypesInArea({
          variables: {
            startDate: selectedCrimeDateRef.current,
            endDate: endDate.toDateString(),
            xMin,
            xMax,
            yMin,
            yMax,
            type: selectedCrimeTypeRef.current,
          },
        });
      } else {
        clearAreaCrimeTypes();
      }
    },
    [selectedCrimeType, selectedCrimeDate]
  );

  const points: Feature<Geometry, GeoJsonProperties>[] = useMemo(() => {
    if (pointData) {
      return pointData.findCrimes.map(
        ({ location, type }: { location: number[]; type: CrimeType }) => ({
          type: "Feature",
          properties: { cluster: false, type },
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

  const [
    findCrimeTypesInArea,
    { loading: crimeTypesLoading, data: typeData },
  ] = useLazyQuery(
    gql`
      query FindCrimeTypesInArea(
        $startDate: String!
        $endDate: String!
        $xMin: Float!
        $xMax: Float!
        $yMin: Float!
        $yMax: Float!
        $type: String
      ) {
        findCrimeTypesInArea(
          startDate: $startDate
          endDate: $endDate
          xMin: $xMin
          xMax: $xMax
          yMin: $yMin
          yMax: $yMax
          type: $type
        ) {
          type
          count
        }
      }
    `
  );

  useEffect(() => {
    if (typeData) {
      setAreaCrimeTypes(typeData.findCrimeTypesInArea);
    }
  }, [typeData]);

  return (
    <>
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
          loading={pointLoading}
          onChangeDate={wrappedSetCrimeDate}
          onChangeType={wrappedSetCrimeType}
          onFilter={filterCrimes}
          updateCanShowLegend={setCanShowMapLegend}
          canShowLegend={canShowMapLegend}
          crimeCount={points.length}
        />
        <Map
          points={points}
          crimeTypesLoading={crimeTypesLoading}
          onAreaSelect={(rec) => {
            fetchCrimeTypes(rec);
          }}
          drawAreaToggleStatus={drawAreaToggleStatus}
          setDrawAreaToggleStatus={setDrawAreaToggleStatus}
          areaCrimeTypes={areaCrimeTypes}
        />
        {canShowMapLegend && !drawAreaToggleStatus && <MapLegend />}
      </main>
    </>
  );
};

export default IndexPage;
