import React, { memo, useCallback, useState } from "react"
import { Dimensions, View } from "react-native"
import MapView, { Circle, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AssetManager } from "@AssetManager";
import { SubscriptionManager } from "@SubscriptionManager";
import { MapScope, MarkerData } from "@V2/Types/AppTypes";
import { CoordinateDTO } from "@V2/Types/ProjectTypes";
import { ControllerAPI } from "@V2/Scopes/API/Controller";
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
  const [firstLoad        ,setFirstLoad        ] = useState<boolean>(false);
  const [showIndicator    ,setShowIndicator    ] = useState<boolean>(true);
  const [followUser       ,setFollowUser       ] = useState<boolean>(false);
  const [lastKnownLocation,setLastKnownLocation] = useState<CoordinateDTO | null>(null);
  const [scope            ,setScope            ] = useState<MapScope>({ type: 'navigation' });

  const [markerData       ,setMarkerData       ] = useState<MarkerData[]>([]);

  MapAPI.registerScopeSetter(setScope);
  MapAPI.registerMarkersDataSetter(setMarkerData);

  const toggleMap = useCallback((showMap: boolean) => {
    showMap ? onMapClose() : onMapOpen();
  }, [])

  const onMapOpen = useCallback(() => {
    if (SubscriptionManager.getStatus().isMapEnabled) {
      setShowMap(prev => !prev)
      setFirstLoad(true);
    } else {
      ControllerAPI.changeScope({ scope: 'SUBSCRIPTIONS SCOPE' });
    }
  }, [])

  const onMapClose = useCallback(() => {
    setFollowUser(false);
    setShowIndicator(false);
    setShowMap(false);
  }, [])

  const goToCoordinate = useCallback((latitude: number, longitude: number) => {
    if (mapRef !== null && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        zoom: 20,
      });
      setShowIndicator(false);
    }
  }, [mapRef])

  const followUserLocation = useCallback(() => {
    if (!followUser) {
      setShowIndicator(true);
    }
    setFollowUser(prev => !prev);
  }, [followUser])

  useFirstPosition({
    showMap: showMap,
    onPositionReceived: (position) => {
      goToCoordinate(position.lat, position.long);
      setLastKnownLocation(position);
    }
  }, [mapRef]);

  useFollowUserLocation({
    onCoordinateUpdate: (position) => {
      goToCoordinate(position.lat, position.long);
      setLastKnownLocation(position);
    }
  }, [followUser]);

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
          isFirstLoad={firstLoad}
          onMarkerUpdate={(markerData) => setMarkerData([...markerData])}          
        />
      )}
      <Map
        firstLoad={firstLoad}
        followUser={followUser}
        style={{ flex: 1 }}
        onLoad={(mapRef) => setMapRef(mapRef)}
      >
        <Marker_LastKnownLocation
          lastKnownLocation={lastKnownLocation}
          isFollowingUser={followUser}
          coordinate={lastKnownLocation!}
        />
        <Markers markerData={markerData} />
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
  lastKnownLocation: CoordinateDTO | null
  isFollowingUser: boolean
  coordinate: CoordinateDTO
}) => {

  if (!props.lastKnownLocation || props.isFollowingUser) {
    return null;
  }

  return (
    <View key={`lastKnownLocation`}>
      <Marker
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
  markerData: MarkerData[]
}) => {
  return (<>
    {props.markerData.map((marker) => (
      <View key={marker.id_marker}>
        <Marker
          coordinate={{
            latitude: marker.coordinates.latitude,
            longitude: marker.coordinates.longitude,
          }}
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
          center={{
            latitude: marker.coordinates.latitude,
            longitude: marker.coordinates.longitude,
          }}
          radius={marker.coordinates.accuracy}
          strokeColor={marker.pinColor}
          fillColor={'rgba(0,0,0,0.1)'}
          strokeWidth={3}
        />
      </View>
    ))}
  </>);
})
