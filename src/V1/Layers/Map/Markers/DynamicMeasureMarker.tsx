import { memo, useCallback } from "react"
import { Marker, MarkerPressEvent } from "react-native-maps";

import DevTools from "@DevTools";
import { AssetManager } from "@AssetManager";
import { CompassMeasurementDTO } from "@V1/Types/ProjectTypes";

export const DynamicMeasureMarker = memo((props: {
  openMeasurement: CompassMeasurementDTO
}) => {

  const { markerIcon, heading, label, dip, id, coordinates } = props.openMeasurement;

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
      title={label}
      coordinate={{ latitude, longitude }} 
      rotation={heading}
      description={`Heading: ${heading}° / Dip: ${dip}°`}
      onPress={onPress}
      image={{
        uri: AssetManager.getMarkerImage(markerIcon),
        scale: 1,
      }}
    />
  );
});