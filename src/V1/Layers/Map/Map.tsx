import { memo, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import DevTools from "@DevTools";

export const Map = memo((props: {
  loadMap: boolean
  followUser: boolean
  style: StyleProp<ViewStyle>
  children?: React.ReactNode
  onLoad: (mapRef: React.RefObject<MapView | null>) => void
  onMapPress: () => void
  onRegionChangeComplete: (region: Region) => void
}) => {
  const mapRef = useRef<MapView | null>(null);
  return props.loadMap ? (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      mapType="satellite"
      zoomEnabled
      showsCompass
      showsUserLocation={DevTools.TUTORIAL_MODE ? false : props.followUser}
      showsMyLocationButton={false}
      style={props.style}
      onPress={props.onMapPress}
      onRegionChangeComplete={props.onRegionChangeComplete}
      onMapLoaded={() => {
        DevTools.useLog('MAP LOADED');
        props.onLoad(mapRef);
      }}
    >
      {props.children}
    </MapView>
  ) : <></>;
});