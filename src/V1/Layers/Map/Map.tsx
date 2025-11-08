import { memo, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import DevTools from "@DevTools";

export const Map = memo((props: {
  firstLoad: boolean
  followUser: boolean
  style: StyleProp<ViewStyle>
  children?: React.ReactNode
  onLoad: (mapRef: React.RefObject<MapView | null>) => void
}) => {
  const mapRef = useRef<MapView | null>(null);
  return props.firstLoad ? (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      mapType="satellite"
      zoomEnabled
      showsCompass
      showsUserLocation={props.followUser}
      showsMyLocationButton={false}
      style={props.style}
      onMapLoaded={() => {
        DevTools.useLog('MAP LOADED');
        props.onLoad(mapRef);
      }}
    >
      {props.children}
    </MapView>
  ) : <></>;
});