import { memo } from "react";
import { View } from "react-native";
import { Circle, Marker } from "react-native-maps";

import { AssetManager } from "@AssetManager";
import { translations } from "@V2/Translations/index";
import { CoordinateDTO } from "@V2/Types/ProjectTypes";
import { ConfigService } from "@V2/Services/ConfigService";

export const Marker_LastKnownLocation = memo((props: {
  tutorialMode: boolean
  lastKnownLocation: CoordinateDTO | null
}) => {

  const config = ConfigService.config
  const R      = translations.layers.map[config.language];

  if (!props.lastKnownLocation) {
    return null;
  }

  return (
    <View key={`lastKnownLocation`}>
      <Marker
        key={`${props.tutorialMode ? Math.random() : ''}`}
        coordinate={{
          latitude: props.lastKnownLocation.lat,
          longitude: props.lastKnownLocation.long,
        }}
        title={R['Your last location']}
        zIndex={0}
        description=""
        image={{
          uri: AssetManager.getMarkerImage('USER_LAST_KNOWN_LOCATION'),
          scale: 1,
        }}
      />
      <Circle
        center={{
          latitude: props.lastKnownLocation.lat,
          longitude: props.lastKnownLocation.long,
        }}
        radius={props.lastKnownLocation.accuracy}
        strokeColor="red"
        fillColor={'rgba(0,0,0,0.1)'}
        strokeWidth={3}
      />
    </View>
  );
})