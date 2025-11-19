import React, { memo, useCallback, useState } from "react"
import { Dimensions } from "react-native"
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import DevTools, { useMapTutorial_LastKnownLocation } from "@DevTools";
import { SubscriptionManager } from "@SubscriptionManager";
import { MapScope } from "@V2/Types/AppTypes";
import { CoordinateDTO } from "@V2/Types/ProjectTypes";
import { ConfigService } from "@V2/Services/ConfigService";
import { ControllerAPI } from "@V2/Scopes/API/Controller";
import { useFirstPosition, useFollowUserLocation } from "./Hooks";
import { useTutorialLayer } from "../API/Tutorial";
import { MapAPI } from "../API/Map";

import { MapAnimation } from "./Animation";
import { Map } from "./Map";
import { Button_CurrentPosition } from "./Buttons/CurrentPosition";
import { MarkersDisplay } from "./MarkersDisplay";
import { MapLabel } from "./MapLabel";
import { Markers } from "./Markers";

export const MapLayer = memo(() => {

  const { top, bottom} = useSafeAreaInsets();
  const [mapRef           ,setMapRef           ] = useState<React.RefObject<MapView | null> | null>(null);
  const [showMap          ,setShowMap          ] = useState<boolean>(false);
  const [isMapNeveOpen    ,setIsMapNeverOpen   ] = useState<boolean>(true);
  const [showIndicator    ,setShowIndicator    ] = useState<boolean>(true);
  const [followUser       ,setFollowUser       ] = useState<boolean>(false);
  const [lastKnownLocation,setLastKnownLocation] = useState<CoordinateDTO | null>(null);
  const [scope            ,setScope            ] = useState<MapScope>({ type: 'navigation' });

  const [showTutorial     ,setShowTutorial     ] = useState(ConfigService.config.tutorial_map);
  const [tutorialMode     ,setTutorialMode     ] = useState<boolean>(DevTools.TUTORIAL_MODE);

  MapAPI.registerScopeSetter(setScope);
  MapAPI.registerTutorialModeSetter(setTutorialMode);
  MapAPI.registerToggleMapCallback(() => {
    showMap ? onMapClose() : onMapOpen();
  });

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

  useTutorialLayer({
    config: "MAP",
    onClose: () => setShowTutorial(false),
  }, [(showTutorial && showMap)]);

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
      <MapLabel scope={scope} />
      <Map
        loadMap={isMapNeveOpen === false}
        followUser={followUser}
        style={{ flex: 1 }}
        onLoad={(mapRef) => setMapRef(mapRef)}
      >
        <Markers.LastKnownLocation
          tutorialMode={tutorialMode}
          lastKnownLocation={lastKnownLocation}
        />
        {scope.type !== 'navigation' && (
          <MarkersDisplay
            scope={scope}
            showMap={showMap}
          />
        )}
      </Map>
      <Button_CurrentPosition
        followUser={followUser}
        onPress={() => followUserLocation()}
        showIndicator={mapRef === null || showIndicator}
      />
    </MapAnimation>
  </>);
})
