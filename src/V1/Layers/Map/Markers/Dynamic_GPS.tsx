import { memo, useCallback } from "react"
import { Circle, Marker, MarkerPressEvent } from "react-native-maps";

import {
  GPSInputData,
  GPSSource
} from "@V1/Types";

import DevTools from "@DevTools";
import { AssetManager } from "@AssetManager";
import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";

export const Dynamic_GPS = memo((props: {
  openGPS: GPSInputData
  source: GPSSource
}) => {

  const { openGPS, source } = props
  const { id_input, label, value } = openGPS;
  const config = ConfigService.config
  const R      = translations.layers.map[config.language]

  if (value.coordinates === undefined) {
    return <></>;
  }

  const latitude  = DevTools.TUTORIAL_MODE ? value.coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE  : value.coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? value.coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : value.coordinates.long;

  const onPress = useCallback((e: MarkerPressEvent) => {
    e.stopPropagation();
  }, []);

  let imageAssetUri
  switch (source) {
    case 'reference_gps_sample':  imageAssetUri = AssetManager.getMarkerImage('INFO_SAMPLE');     break;
    case 'reference_gps_project': imageAssetUri = AssetManager.getMarkerImage('INFO_PROJECT');    break;
    default:                      imageAssetUri = AssetManager.getMarkerImage('SATELLITE_INPUT'); break;
  }

  let circleColor
  switch (source) {
    case 'reference_gps_sample':  circleColor = 'blue';   break;
    case 'reference_gps_project': circleColor = 'purple'; break;
    default:                      circleColor = 'orange'; break;
  }

  return (<>
    <Marker
      key={id_input}
      title={label === '' ? R['No label'] : label}
      coordinate={{ latitude, longitude }}
      onPress={onPress}
      image={{
        uri: imageAssetUri,
        scale: 1,
      }}
    />
    {value.coordinates.accuracy > 0 && (
      <Circle
        center={{ latitude, longitude }}
        radius={value.coordinates.accuracy}
        strokeColor={circleColor}
        fillColor={'rgba(0,0,0,0.1)'}
        strokeWidth={3}
      />
    )}
  </>);
});