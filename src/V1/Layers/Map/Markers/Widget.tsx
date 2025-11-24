import { memo, useCallback } from "react";
import { Circle, Marker, MarkerPressEvent } from "react-native-maps";

import DevTools from "@DevTools";
import { AssetManager } from "@AssetManager";
import { translations } from "@V1/Translations/index";
import { MapFilter, OpenEntity } from "@V1/Types/AppTypes";
import { CompassInputData, CompassMeasurementDTO, GPSInputData, WidgetData } from "@V1/Types/ProjectTypes";
import { ConfigService } from "@V1/Services/ConfigService";

export const Markers_Widget = memo((props: {
  widgetData: WidgetData
  openEntity: OpenEntity | null
  filter: MapFilter
}) => {

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
}) => {

  const { inputData } = props;
  const { value } = inputData;

  if (value.coordinates === undefined) {
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

  const AllMeasurements = props.inputData.value.map((measurement) => {
    const entity = props.openMeasurement;
    const isEntity = entity !== null && entity.id === measurement.id;
    if (
      !isEntity &&
      measurement.coordinates !== undefined
    ) {
      return (
        <Marker_Measurement
          key={measurement.id}
          measurement={measurement}
        />
      );
    }
  });
  return (<>
    {AllMeasurements}
  </>)
});

const Marker_Measurement = memo((props: {
  measurement: CompassMeasurementDTO
}) => {

  const { coordinates, markerIcon, heading, label, dip } = props.measurement;
  const config = ConfigService.config;
  const R      = translations.layers.map[config.language];

  if (coordinates === undefined) {
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