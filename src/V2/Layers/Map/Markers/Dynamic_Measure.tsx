import { memo, useCallback } from "react"
import { Marker, MarkerPressEvent } from "react-native-maps";

import DevTools from "@DevTools";
import { AssetManager } from "@AssetManager";
import { translations } from "@V2/Translations/index";
import { CompassMeasurementDTO } from "@V2/Types/ProjectTypes";
import { ConfigService } from "@V2/Services/ConfigService";

export const Dynamic_Measure = memo((props: {
  openMeasurement: CompassMeasurementDTO
}) => {

  const { markerIcon, heading, label, dip, id, coordinates } = props.openMeasurement;
  const config = ConfigService.config
  const R      = translations.layers.map[config.language]

  if (coordinates === undefined) {
    return <></>;
  }

  const latitude  = DevTools.TUTORIAL_MODE ? coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long;

  const onPress = useCallback((e: MarkerPressEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Marker
      key={id}
      title={label === '' ? R['No label'] : label}
      coordinate={{ latitude, longitude }} 
      rotation={heading}
      description={R['Heading: ${heading}° / Dip: ${dip}°'](heading, dip)}
      onPress={onPress}
      image={{
        uri: AssetManager.getMarkerImage(markerIcon),
        scale: 1,
      }}
    />
  );
});