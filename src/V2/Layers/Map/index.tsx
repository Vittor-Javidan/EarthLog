import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { Dimensions, Pressable, StyleProp, ViewStyle } from "react-native"
import { GoogleMaps, } from 'expo-maps';
import { GoogleMapsMapType, GoogleMapsMarker } from "expo-maps/build/google/GoogleMaps.types";

import DevTools from "@DevTools";
import { GPSWatcherService } from "@V2/Services_Core/GPSService";

import { Icon } from "@V2/Icon/index";
import { MapAnimation } from "./Animation";

export const MapLayer = memo(() => {

  const gpsWatcher = useMemo(() => new GPSWatcherService({}), [])
  const [currentPosition, setCurrentPosition] = useState<GoogleMapsMarker | undefined>(undefined);
  const [markers  ,       setMarkers        ] = useState<GoogleMapsMarker[]>([])
  const [showMap  ,       setShowMap        ] = useState<boolean>(false);
  const [enableMap,       setEnableMap      ] = useState<boolean>(false);

  const onMapOpen = useCallback(() => {
    setShowMap(prev => !prev)
    setEnableMap(true);
  }, [])
  
  useEffect(() => {
    if (enableMap) {
      const random = DevTools.gpsTutorialCoodinateMask();
      gpsWatcher.getCurrentPosition((position) => {
        if (position?.coordinates) {
          const latitude = DevTools.TUTORIAL_MODE ? position?.coordinates?.lat + random : position?.coordinates?.lat;
          const longitude = DevTools.TUTORIAL_MODE ? position?.coordinates?.long + random : position?.coordinates?.long;
          setCurrentPosition({
            coordinates: {
              latitude,
              longitude
            }
          })
        }
      })
    }
  }, [showMap, enableMap])

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher(); };
  }, []);

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
      <Map
        enableMap={enableMap}
        markers={currentPosition ? [currentPosition, ...markers] : markers}
        style={{ flex: 1 }}
      />
    </MapAnimation>
    <MapButton
      onPress={() => onMapOpen()}
    />
  </>);
})

const Map = memo((props: {
  enableMap: boolean
  markers: GoogleMapsMarker[]
  style?: StyleProp<ViewStyle>
}) => {
  return props.enableMap ? (
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
  ) : <></>;
});

export const MapButton = memo((props: {
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);
  const BOTTOM = 90

  return (
    <Pressable
      onPress={() => props.onPress()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        position: 'absolute',
        right: 0,
        bottom: BOTTOM,
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