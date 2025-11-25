import { memo, useCallback } from "react";
import { Circle, Marker, MarkerPressEvent } from "react-native-maps";

import {
  CompassInputData,
  CompassMeasurementDTO,
  GPSInputData,
  OpenEntity,
  MapFilter,
  WidgetData
} from "@V1/Types";

import DevTools from "@DevTools";
import { AssetManager } from "@AssetManager";
import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";

export const Markers_Widget = memo((props: {
  widgetData: WidgetData
  openEntity: OpenEntity | null
  filter: MapFilter
}) => {

  const openGPS         = props.openEntity?.type === 'gps input'           ? props.openEntity.entity : null;
  const openMeasurement = props.openEntity?.type === 'compass measurement' ? props.openEntity.entity : null;

  return (<>
    {props.widgetData.inputs.map((input) => {
      if (
        input.type === 'gps' &&
        props.filter.gpsInput
      ) {
        return (
          <Marker_GPSInput
            key={input.id_input}
            inputData={input}
            openGPS={openGPS}
          />
        )
      }
      if (
        input.type === 'compass' &&
        props.filter.compassMeasurement
      ) {
        return (
          <Marker_CompassInput
            key={input.id_input}
            inputData={input}
            openMeasurement={openMeasurement}
          />
        )
      }
    })}
  </>)
});

const Marker_GPSInput = memo((props: {
  inputData: GPSInputData
  openGPS: GPSInputData | null
}) => {

  const { inputData, openGPS } = props;
  const { value } = inputData;

  const isEntity = openGPS !== null && openGPS.id_input === inputData.id_input;
  if (value.coordinates === undefined || isEntity) {
    return <></>;
  }

  const coordinates = value.coordinates;
  const latitude  = DevTools.TUTORIAL_MODE ? coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long;
  const accuracy = coordinates.accuracy;

  const onPress = useCallback((e: MarkerPressEvent) => {
    e.stopPropagation();
  }, []);

  return (<>
    <Marker
      key={inputData.id_input}
      title={inputData.label}
      coordinate={{ latitude, longitude }}
      onPress={onPress}
      image={{
        uri: AssetManager.getMarkerImage('SATELLITE_INPUT'),
        scale: 1,
      }}
    />
    <Circle
      center={{ latitude, longitude }}
      radius={accuracy}
      strokeColor={'orange'}
      fillColor={'rgba(0,0,0,0.1)'}
      strokeWidth={3}
    />
  </>)
});

const Marker_CompassInput = memo((props: {
  inputData: CompassInputData
  openMeasurement: CompassMeasurementDTO | null
}) => {

  const AllMeasurements = props.inputData.value.map((measurement) => (
    <Marker_Measurement
      key={measurement.id}
      measurement={measurement}
      openMeasurement={props.openMeasurement}
    />
  ));

  return (<>
    {AllMeasurements}
  </>)
});

const Marker_Measurement = memo((props: {
  measurement: CompassMeasurementDTO
  openMeasurement: CompassMeasurementDTO | null
}) => {

  const { measurement, openMeasurement } = props;
  const { coordinates, markerIcon, heading, label, dip } = measurement;
  const config = ConfigService.config;
  const R      = translations.layers.map[config.language];

  const entity = openMeasurement;
  const isEntity = entity !== null && entity.id === measurement.id;
  if (coordinates === undefined || isEntity) {
    return <></>;
  }

  const latitude  = DevTools.TUTORIAL_MODE ? coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long;

  const onPress = useCallback((e: MarkerPressEvent) => {
    e.stopPropagation();
  }, []);

  return (<>
    <Marker
      key={props.measurement.id}
      coordinate={{ latitude, longitude }} 
      title={label === '' ? R['No label'] : label}
      description={R['Heading: ${heading}° / Dip: ${dip}°'](heading, dip)}
      rotation={heading}
      onPress={onPress}
      image={{
        uri: AssetManager.getMarkerImage(markerIcon),
        scale: 1,
      }}
    />
  </>)
});