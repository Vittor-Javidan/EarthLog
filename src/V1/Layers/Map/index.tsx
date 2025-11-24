import React, { memo, useCallback, useEffect, useState } from "react"
import { Dimensions } from "react-native"
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import DevTools, { useMapTutorial_LastKnownLocation } from "@DevTools";
import { MapFilter, MapScope, MapShowSetter, OpenEntity } from "@V1/Types/AppTypes";
import { CoordinateDTO } from "@V1/Types/ProjectTypes";
import { ConfigService } from "@V1/Services/ConfigService";
import { useTutorialLayer } from "../API/Tutorial";
import { MapAPI } from "../API/Map";
import { useFirstPosition, useFollowUserLocation } from "./Hooks";

import { MapAnimation } from "./Animation";
import { Map } from "./Map";
import { Markers } from "./Markers";
import { MarkersDisplay } from "./MarkersDisplay";
import { UI } from "./UI";

export const Layer_Map = memo(() => {

  const { top, bottom} = useSafeAreaInsets();
  const [mapRef           ,setMapRef           ] = useState<React.RefObject<MapView | null> | null>(null);
  const [isMapNeverOpen   ,setIsMapNeverOpen   ] = useState<boolean>(true);
  const [scope            ,setScope            ] = useState<MapScope>({ type: 'navigation' });
  const [tutorialMode     ,setTutorialMode     ] = useState<boolean>(DevTools.TUTORIAL_MODE);
  const [centerRegion     ,setCenterRegion     ] = useState<Region | null>(null);
  const [mapPressed       ,setMapPressed       ] = useState<boolean>(false);
  const [followUser       ,setFollowUser       ] = useState<boolean>(false);
  const [lastKnownLocation,setLastKnownLocation] = useState<CoordinateDTO | null>(null);
  const [goToCoordinate   ,setGoToCoordinate   ] = useState<CoordinateDTO | undefined>(undefined);
  const [openEntity       ,setOpenEntity       ] = useState<OpenEntity | null>(null);
  const [filter           ,setFilter           ] = useState<MapFilter>({
    projectInfo: true,
    sampleInfo: true,
    gpsInput: true,
    compassMeasurement: true,
  })
  const [show, setShow] = useState<MapShowSetter>({
    map: false,
    indicator: false,
    tutorial: ConfigService.config.tutorial_map,
    defaultUI: true,
    pinUI_Measurement: false,
  })
  MapAPI.scopeSetter        = setScope;
  MapAPI.tutorialModeSetter = setTutorialMode;
  MapAPI.openEntitySetter   = setOpenEntity;
  MapAPI.filterSetter       = setFilter;
  MapAPI.showSetter         = setShow;

  // Map Callbacks ------------------------------------------------------------------------------

  const onRegionChangeComplete = useCallback((region: Region) => {
    const newRegion: Region = {
      latitude: tutorialMode ? region.latitude - DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : region.latitude,
      longitude: tutorialMode ? region.longitude - DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : region.longitude,
      latitudeDelta: tutorialMode ? region.latitudeDelta - DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : region.latitudeDelta,
      longitudeDelta: tutorialMode ? region.longitudeDelta - DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : region.longitudeDelta,
    };
    setCenterRegion(newRegion);
  }, [tutorialMode]);

  const followUserLocation = useCallback(() => {
    if (!followUser) {
      setShow(prev => ({ ...prev, indicator: true }));
    }
    setFollowUser(prev => !prev);
  }, [followUser])

  // Allows children to detect map press events
  const onMapPress = useCallback(() => {
    setMapPressed(true);
  }, []);
  useEffect(() => {
    if (mapPressed) {
      setMapPressed(false);
    }
  }, [mapPressed]);

  // detects changes in goToCoordinate to move the map camera
  useEffect(() => {
    if (
      mapRef !== null &&
      mapRef.current &&
      goToCoordinate !== undefined
    ) {
      mapRef.current.animateCamera({
        center: { latitude: goToCoordinate.lat, longitude: goToCoordinate.long },
        zoom: 20,
      });
      setShow(prev => ({ ...prev, indicator: false }));
    }
  }, [goToCoordinate, mapRef])

  // Show/hide map sanitization
  useEffect(() => {
    if (show.map) {
      setIsMapNeverOpen(false)
    } else {
      setFollowUser(false);
      setShow(prev => ({ ...prev, indicator: false }));
    }
  }, [show.map]);

  useFirstPosition({
    showMap: show.map,
    onPositionReceived: (position) => {
      const { lat, long } = position
      const newLatitude  = tutorialMode ? lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
      const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
      setGoToCoordinate({ lat: newLatitude, long: newLongitude, accuracy: 0 });
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
      setGoToCoordinate({ lat: newLatitude, long: newLongitude, accuracy: 0 });
      setLastKnownLocation({
        lat: newLatitude,
        long: newLongitude,
        accuracy: position.accuracy,
      });
    }
  }, [followUser]);

  useTutorialLayer({
    config: "MAP",
    onClose: () => setShow(prev => ({ ...prev, tutorial: false })),
  }, [(show.tutorial && show.map)]);

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
  }, [tutorialMode, isMapNeverOpen]);

  return (<>
    <MapAnimation
      show={show.map}
      style={{
        position: 'absolute',
        justifyContent: 'center',
        top: top,
        left: 0,
        zIndex: 20,
        height: Dimensions.get('screen').height - top - bottom,
        width: Dimensions.get('screen').width,
        backgroundColor: '#000',
      }}
    >

      {/* UIs */}
      <UI.Default
        show={show.defaultUI}
        scope={scope}
        filter={filter}
        followUser={followUser}
        showCurrentPositionIndicator={mapRef === null || show.indicator}
        onCurrentPosition={followUserLocation}
        onFilterChange={setFilter}
      />
      <UI.PinMeasurement
        showUI={show.pinUI_Measurement}
        scope={scope}
        tutorialMode={tutorialMode}
        centerRegion={centerRegion}
        followUser={followUser}
        showCurrentPositionIndicator={mapRef === null || show.indicator}
        mapPressed={mapPressed}
        goToCoordinate={setGoToCoordinate}
        onCurrentPosition={followUserLocation}
        onMeasurementUpdate={setOpenEntity}
        onCloseMap={() => MapAPI.toggleMap(false)}
      />

      {/* Base Map Components */}
      <Map
        loadMap={isMapNeverOpen === false}
        followUser={followUser}
        style={{ flex: 1 }}
        onLoad={(mapRef) => setMapRef(mapRef)}
        onRegionChangeComplete={onRegionChangeComplete}
        onMapPress={onMapPress}
      >
        <Markers.LastKnownLocation
          tutorialMode={tutorialMode}
          lastKnownLocation={lastKnownLocation}
        />
        {(
          openEntity !== null &&
          openEntity.type === 'compass measurement'
        ) && (
          <Markers.DynamicMeasureMarker
            openMeasurement={openEntity.entity}
          />
        )}
        {scope.type !== 'navigation' && (
          <MarkersDisplay
            scope={scope}
            showMap={show.map}
            openEntity={openEntity}
            filter={filter}
          />
        )}
      </Map>
    </MapAnimation>
  </>);
})
