import React, { memo, useCallback, useState } from "react"
import { Dimensions, View } from "react-native"
import MapView, { Circle, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import DevTools, { useMapTutorial_LastKnownLocation } from "@DevTools";
import { AssetManager } from "@AssetManager";
import { SubscriptionManager } from "@SubscriptionManager";
import { MapScope, MarkerData } from "@V1/Types/AppTypes";
import { CoordinateDTO } from "@V1/Types/ProjectTypes";
import { ControllerAPI } from "@V1/Scopes/API/Controller";
import { useFirstPosition, useFollowUserLocation } from "./Hooks";
import { MapAPI } from "../API/Map";

import { MapAnimation } from "./Animation";
import { Map } from "./Map";
import { Button_Map } from "./Buttons/MapButton";
import { Button_CurrentPosition } from "./Buttons/CurrentPosition";
import { DataDisplay } from "./DataDisplay";

export const MapLayer = memo(() => {

  const { top, bottom} = useSafeAreaInsets();
  const [mapRef           ,setMapRef           ] = useState<React.RefObject<MapView | null> | null>(null);
  const [showMap          ,setShowMap          ] = useState<boolean>(false);
  const [isMapNeveOpen    ,setIsMapNeverOpen   ] = useState<boolean>(true);
  const [showIndicator    ,setShowIndicator    ] = useState<boolean>(true);
  const [followUser       ,setFollowUser       ] = useState<boolean>(false);
  const [lastKnownLocation,setLastKnownLocation] = useState<CoordinateDTO | null>(null);
  const [scope            ,setScope            ] = useState<MapScope>({ type: 'navigation' });

  const [tutorialMode     ,setTutorialMode     ] = useState<boolean>(DevTools.TUTORIAL_MODE);
  const [markerData       ,setMarkerData       ] = useState<MarkerData[]>([]);

  MapAPI.registerScopeSetter(setScope);
  MapAPI.registerMarkersDataSetter(setMarkerData);
  MapAPI.registerTutorialModeSetter(setTutorialMode);

  const toggleMap = useCallback((showMap: boolean) => {
    showMap ? onMapClose() : onMapOpen();
  }, [])

  const onMapOpen = useCallback(() => {
    if (SubscriptionManager.getStatus().isMapEnabled) {
      setShowMap(prev => !prev)
      setIsMapNeverOpen(false);
    } else {
      ControllerAPI.changeScope({ scope: 'SUBSCRIPTIONS SCOPE' });
    }
  }, [])

  const onMapClose = useCallback(() => {
    setFollowUser(false);
    setShowIndicator(false);
    setShowMap(false);
  }, [])

  const followUserLocation = useCallback(() => {
    if (!followUser) {
      setShowIndicator(true);
    }
    setFollowUser(prev => !prev);
  }, [followUser])

  const goToCoordinate = useCallback((latitude: number, longitude: number) => {
    if (mapRef !== null && mapRef.current) {
      mapRef.current.animateCamera({
        center: { latitude, longitude },
        zoom: 20,
      });
      setShowIndicator(false);
    }
  }, [mapRef])

  useFirstPosition({
    showMap: showMap,
    onPositionReceived: (position) => {
      const { lat, long } = position
      const newLatitude  = tutorialMode ? lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
      const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
      goToCoordinate(newLatitude, newLongitude);
      setLastKnownLocation({
        lat: newLatitude,
        long: newLongitude,
        accuracy: position.accuracy,
      });
    }
  }, [mapRef]);

  useFollowUserLocation({
    onCoordinateUpdate: (position) => {
      const { lat, long } = position
      const newLatitude  = tutorialMode ? lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
      const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
      goToCoordinate(newLatitude, newLongitude);
      setLastKnownLocation({
        lat: newLatitude,
        long: newLongitude,
        accuracy: position.accuracy,
      });
    }
  }, [followUser]);

  useMapTutorial_LastKnownLocation({
    onTutorialModeOn: () => {
      setLastKnownLocation(prev => {
        if (prev === null) return null;
        return {
          lat: prev.lat   + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE,
          long: prev.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE,
          accuracy: prev.accuracy,
        };
      });
    },
    onTutorialModeOff: () => {
      setLastKnownLocation(prev => {
        if (prev === null) return null;
        return {
          lat: prev.lat   - DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE,
          long: prev.long - DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE,
          accuracy: prev.accuracy,
        };
      });
    }
  }, [tutorialMode, isMapNeveOpen]);

  return (<>
    <MapAnimation
      show={showMap}
      style={{
        position: 'absolute',
        top: top,
        left: 0,
        zIndex: 20,
        height: Dimensions.get('screen').height - top - bottom,
        width: Dimensions.get('screen').width,
        backgroundColor: '#000',
      }}
    >
      {(scope.type === 'project' || scope.type === 'sample') && (
        <DataDisplay
          scope={scope}
          showMap={showMap}
          onMarkerUpdate={(markerData) => setMarkerData([...markerData])}          
        />
      )}
      <Map
        loadMap={isMapNeveOpen === false}
        followUser={followUser}
        style={{ flex: 1 }}
        onLoad={(mapRef) => setMapRef(mapRef)}
      >
        <Marker_LastKnownLocation
          tutorialMode={tutorialMode}
          lastKnownLocation={lastKnownLocation}
          coordinate={lastKnownLocation!}
        />
        <Markers
          tutorialMode={tutorialMode}
          markerData={markerData}
        />
      </Map>
      <Button_CurrentPosition
        followUser={followUser}
        onPress={() => followUserLocation()}
        showIndicator={mapRef === null || showIndicator}
      />
    </MapAnimation>
    <Button_Map
      onPress={() => toggleMap(showMap)}
    />
  </>);
})

const Marker_LastKnownLocation = memo((props: {
  tutorialMode: boolean
  lastKnownLocation: CoordinateDTO | null
  coordinate: CoordinateDTO
}) => {

  if (!props.lastKnownLocation) {
    return null;
  }

  return (
    <View key={`lastKnownLocation`}>
      <Marker
        key={`${props.tutorialMode ? Math.random() : ''}`}
        coordinate={{
          latitude: props.coordinate.lat,
          longitude: props.coordinate.long,
        }}
        title="Your last known location"
        zIndex={0}
        description=""
        image={{
          uri: AssetManager.getMarkerImage('USER_LAST_KNOWN_LOCATION'),
          scale: 1,
        }}
      />
      <Circle
        center={{
          latitude: props.coordinate.lat,
          longitude: props.coordinate.long,
        }}
        radius={props.coordinate.accuracy}
        strokeColor="red"
        fillColor={'rgba(0,0,0,0.1)'}
        strokeWidth={3}
      />
    </View>
  );
})

const Markers = memo((props: {
  tutorialMode: boolean
  markerData: MarkerData[]
}) => {
  return (<>
    {props.markerData.map((marker) => {

      const latitude  = props.tutorialMode ? marker.coordinates.latitude  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : marker.coordinates.latitude;
      const longitude = props.tutorialMode ? marker.coordinates.longitude + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : marker.coordinates.longitude;

      return (
        <View key={marker.id_marker}>
          <Marker
            key={`${props.tutorialMode ? Math.random() : ''}-${marker.id_marker}`}
            coordinate={{ latitude, longitude }}
            title={marker.title}
            pinColor={marker.pinColor}
            zIndex={marker.zIndex}
            description={marker.description}
            image={{
              uri: AssetManager.getMarkerImage(marker.image),
              scale: 1,
            }}
          />
          <Circle
            center={{ latitude, longitude }}
            radius={marker.coordinates.accuracy}
            strokeColor={marker.pinColor}
            fillColor={'rgba(0,0,0,0.1)'}
            strokeWidth={3}
          />
        </View>
      )
    })}
  </>);
})
