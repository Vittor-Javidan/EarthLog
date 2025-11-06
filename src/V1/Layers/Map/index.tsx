import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Dimensions, Pressable, StyleProp, ViewStyle } from "react-native"
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import DevTools from "@DevTools";
import { SubscriptionManager } from "@SubscriptionManager";
import { GPSWatcherService } from "@V1/Services_Core/GPSService";
import { ControllerAPI } from "@V1/Scopes/API/Controller";

import { Icon } from "@V1/Icon/index";
import { MapAnimation } from "./Animation";
import { GPS_DTO } from "@V1/Types/ProjectTypes";

type GooglePinColors =
'red' | 'tomato' | 'orange' | 'yellow' | 'gold' | 'wheat' |
'linen' | 'green' | 'blue' | 'teal' | 'purple' | 'indigo'

export const MapLayer = memo(() => {

  const gpsWatcher = useMemo(() => new GPSWatcherService({}), [])
  const [mapRef         , setMapRef         ] = useState<React.RefObject<MapView | null> | null>(null);
  const [currentPosition, setCurrentPosition] = useState<GPS_DTO | null>(null);
  const [markers        , setMarkers        ] = useState<MapMarker[]>([])
  const [showMap        , setShowMap        ] = useState<boolean>(false);
  const [enableMap      , setEnableMap      ] = useState<boolean>(false);

  const onMapOpen = useCallback(() => {
    if (SubscriptionManager.getStatus().isMapEnabled) {
      setShowMap(prev => !prev)
      setEnableMap(true);
    } else {
      ControllerAPI.changeScope({ scope: 'SUBSCRIPTIONS SCOPE' });
    }
  }, [])
  
  useEffect(() => {
    if (enableMap) {
      const random = DevTools.gpsTutorialCoodinateMask();
      gpsWatcher.getCurrentPosition((position) => {
        if (position?.coordinates) {
          const latitude = DevTools.TUTORIAL_MODE ? position?.coordinates?.lat + random : position?.coordinates?.lat;
          const longitude = DevTools.TUTORIAL_MODE ? position?.coordinates?.long + random : position?.coordinates?.long;
          const accuracy = position?.coordinates?.accuracy;
          setCurrentPosition({ coordinates: { lat: latitude, long: longitude, accuracy: accuracy } });
        }
      })
    }
  }, [showMap, enableMap])

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher(); };
  }, []);

  useEffect(() => {
    if (
      mapRef !== null &&
      currentPosition &&
      currentPosition.coordinates &&
      mapRef.current
    ) {
      mapRef.current.animateCamera({
        center: {
          latitude: currentPosition.coordinates.lat,
          longitude: currentPosition.coordinates.long,
        },
        zoom: 15,
      });
    }
  }, [currentPosition, mapRef]);

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
        backgroundColor: '#000',
      }}
    >
      <Map
        currentPosition={currentPosition}
        enableMap={enableMap}
        style={{ flex: 1 }}
        onLoad={(mapRef) => setMapRef(mapRef)}
      >
        {(
          currentPosition !== null &&
          currentPosition.coordinates
        ) && (
          <Marker
            key={`${Math.random()}${currentPosition.coordinates.lat},${currentPosition.coordinates.long}`}
            coordinate={{
              latitude: currentPosition.coordinates.lat,
              longitude: currentPosition.coordinates.long,
            }}
            pinColor="red"
            title="You are here"
          />
        )}
      </Map>
    </MapAnimation>
    <MapButton
      onPress={() => onMapOpen()}
    />
  </>);
})

const Map = memo((props: {
  currentPosition: GPS_DTO | null
  enableMap: boolean
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  onLoad: (mapRef: React.RefObject<MapView | null>) => void
}) => {

  const mapRef = useRef<MapView | null>(null);

  return props.enableMap ? (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      mapType="satellite"
      zoomEnabled
      showsCompass
      style={props.style}
      onMapLoaded={() => {
        console.log('Map loaded');
        props.onLoad(mapRef);
      }}
      initialRegion={(
        props.currentPosition !== null &&
        props.currentPosition.coordinates
      ) ? {
        latitude: props.currentPosition.coordinates.lat,
        longitude: props.currentPosition.coordinates.long,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      } : undefined}
    >
      {props.children}
    </MapView>
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