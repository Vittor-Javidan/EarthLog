import React, { memo, useEffect, useMemo, useState } from "react"
import { Dimensions, Pressable, StyleProp, ViewStyle } from "react-native"
import { GoogleMaps, } from 'expo-maps';
import { GoogleMapsMapType, GoogleMapsMarker } from "expo-maps/build/google/GoogleMaps.types";

import { GPSWatcherService } from "@V1/Services_Core/GPSService";

import { Icon } from "@V1/Icon/index";
import { MapAnimation } from "./Animation";

export const MapLayer = memo(() => {

  const gpsWatcher = useMemo(() => new GPSWatcherService({}), []);
  const [markers, setMarkers] = useState<GoogleMapsMarker[]>([])
  const [showMap, setShowMap] = useState<boolean>(false);
  
  // useEffect(() => {
  //   gpsWatcher.getCurrentPosition((position) => {
  //     if (position?.coordinates) {
  //       setMarkers([{
  //         coordinates: {
  //           latitude: position?.coordinates?.lat,
  //           longitude: position?.coordinates?.long
  //         }
  //       }]);
  //     }
  //   })
  // }, [])

  return (<>
    <MapAnimation
      show={showMap}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'red',
      }}
    >
      <Map markers={markers} style={{ flex: 1 }} />
    </MapAnimation>
    <MapButton
      onPress={() => setShowMap(prev => !prev)}
    />
  </>);
})

const Map = memo((props: {
  markers: GoogleMapsMarker[]
  style?: StyleProp<ViewStyle>
}) => {

  return (
    <GoogleMaps.View
      properties={{
        mapType: GoogleMapsMapType.SATELLITE
      }}
      uiSettings={{
        zoomControlsEnabled: false,
        compassEnabled: true,
      }}
      style={props.style}
      onMapLoaded={() => console.log("Map Loaded")}
      cameraPosition={{
        coordinates: {
          latitude: props.markers[0]?.coordinates?.latitude,
          longitude: props.markers[0]?.coordinates?.longitude
        },
        zoom: 16,
      }}
      markers={props.markers}
    />
  )
});

export const MapButton = memo((props: {
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPress={() => props.onPress()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        position: 'absolute',
        right: 0,
        bottom: Dimensions.get('screen').height/2 - 30,
        zIndex: 21,
        backgroundColor: pressed ? 'red' : 'white',
        height: 60,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
      }}
    >
      <Icon
        iconName="map"
        color={pressed ? "white" : "red"}
        fontSize={30}
      />
    </Pressable>
  );
});