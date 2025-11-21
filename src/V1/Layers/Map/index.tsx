import React, { memo, useCallback, useEffect, useState } from "react"
import { Dimensions } from "react-native"
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import DevTools, { useMapTutorial_LastKnownLocation } from "@DevTools";
import { MapScope } from "@V1/Types/AppTypes";
import { CompassMeasurementDTO, CoordinateDTO } from "@V1/Types/ProjectTypes";
import { ConfigService } from "@V1/Services/ConfigService";
import { useTutorialLayer } from "../API/Tutorial";
import { PopUpAPI } from "../API/PopUp";
import { MapAPI } from "../API/Map";
import { useFirstPosition, useFollowUserLocation, useOpenMeasurementLocation } from "./Hooks";

import { MapAnimation } from "./Animation";
import { Map } from "./Map";
import { MapLabel } from "./MapLabel";
import { Markers } from "./Markers";
import { MarkersDisplay } from "./MarkersDisplay";
import { UI } from "./UI";

export const MapLayer = memo(() => {

  const { top, bottom} = useSafeAreaInsets();
  const [mapRef           , setMapRef           ] = useState<React.RefObject<MapView | null> | null>(null);
  const [scope            , setScope            ] = useState<MapScope>({ type: 'navigation' });
  const [isMapNeverOpen   , setIsMapNeverOpen   ] = useState<boolean>(true);
  const [followUser       , setFollowUser       ] = useState<boolean>(false);
  const [lastKnownLocation, setLastKnownLocation] = useState<CoordinateDTO | null>(null);
  const [goToCoordinate   , setGoToCoordinate   ] = useState<CoordinateDTO | undefined>(undefined);
  const [centerRegion     , setCenterRegion     ] = useState<Region | null>(null);
  const [tutorialMode     , setTutorialMode     ] = useState<boolean>(DevTools.TUTORIAL_MODE);

  // Measurement States
  const [backupCoordinate     , setBackupCoordinate     ] = useState<CoordinateDTO | undefined>(undefined);
  const [openMeasurement      , setOpenMeasurement      ] = useState<CompassMeasurementDTO | null>(null);
  const [didMeasurementChanged, setDidMeasurementChanged] = useState<boolean>(false);

  const [show, setShow] = useState({
    map: false,
    indicator: false,
    tutorial: ConfigService.config.tutorial_map,
    pinUI_Measurement: false,
    defaultUI: true
  })

  MapAPI.registerShowSetter(setShow);
  MapAPI.registerScopeSetter(setScope);
  MapAPI.registerTutorialModeSetter(setTutorialMode);
  MapAPI.registerBackupCoordinateSetter(setBackupCoordinate);
  MapAPI.registerOpenMeasurementSetter(setOpenMeasurement);
  MapAPI.registerDidMeasurementChangedSetter(setDidMeasurementChanged);

  // Measurement Pin UI Callbacks ------------------------------------------------------------

  const saveAndCloseMeasurementCoordinates = useCallback(() => {
    if (openMeasurement === null) return;
    PopUpAPI.handleAlert((didMeasurementChanged && backupCoordinate !== undefined), {
      type: 'warning',
      question: 'You changed the measurement location. Do you want to save the changes?',
    }, () => {
      openMeasurement.coordinates === undefined
      ? MapAPI.triggerRegionUpdate(undefined)
      : MapAPI.triggerRegionUpdate({
          lat: openMeasurement.coordinates.lat,
          long: openMeasurement.coordinates.long,
          accuracy: 0,
        });
      MapAPI.toggleMap(false);
    })
  }, [openMeasurement])

  const updateMeasurementCoordinates = useCallback(() => {
    if (centerRegion === null) return;
    if (openMeasurement === null) return;
    setOpenMeasurement(prev => {
      if (prev === null) return null;
      const newMeasurement = { ...prev }
      newMeasurement.coordinates = {
        lat: centerRegion.latitude,
        long: centerRegion.longitude,
        accuracy: 0,
      }
      return newMeasurement;
    });
    setDidMeasurementChanged(true);
  }, [centerRegion, openMeasurement])

  const deleteMeasurementCoordinates = useCallback(() => {
    if (openMeasurement === null) return;
    const newMeasurement = { ...openMeasurement };
    if (newMeasurement.coordinates) {
      delete newMeasurement.coordinates;
      setDidMeasurementChanged(true);
    }
    setOpenMeasurement(newMeasurement);
  }, [openMeasurement])

  const resetMeasurementCoordinates = useCallback(() => {
    if (openMeasurement === null) return;
    const newMeasurement = { ...openMeasurement };
    switch (backupCoordinate) {
      case undefined: {
        if (newMeasurement.coordinates) {
          delete newMeasurement.coordinates;
        }
        break;
      }
      default: {
        newMeasurement.coordinates = { ...backupCoordinate };
        setGoToCoordinate({ ...backupCoordinate });
      }
    }
    setOpenMeasurement(newMeasurement);
  }, [openMeasurement, backupCoordinate])

  // Map Callbacks ------------------------------------------------------------------------------

  const followUserLocation = useCallback(() => {
    if (!followUser) {
      setShow(prev => ({ ...prev, indicator: true }));
    }
    setFollowUser(prev => !prev);
  }, [followUser])

  const onMapPress = useCallback(() => {
    if (// Pin Measurement UI map press behavior
      show.pinUI_Measurement &&
      openMeasurement !== null &&
      centerRegion !== null
    ) {
      updateMeasurementCoordinates();
    }
  }, [updateMeasurementCoordinates])

  useEffect(() => {
    if (// detects changes in goToCoordinate to move the map camera
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

  useOpenMeasurementLocation({
    openMeasurement: openMeasurement,
    scope: scope,
    showMap: show.map,
    onGoToCoordinate: (coordinate) => setGoToCoordinate(coordinate),
  })

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
        top: top,
        left: 0,
        zIndex: 20,
        height: Dimensions.get('screen').height - top - bottom,
        width: Dimensions.get('screen').width,
        backgroundColor: '#000',
      }}
    >

      {/* UIs */}
      <UI.PinMeasurement
        show={show.pinUI_Measurement}
        followUser={followUser}
        showCurrentPositionIndicator={mapRef === null || show.indicator}
        onReset={resetMeasurementCoordinates}
        onDelete={deleteMeasurementCoordinates}
        onSave={saveAndCloseMeasurementCoordinates}
        onPin={updateMeasurementCoordinates}
        onCurrentPosition={followUserLocation}
      />
      <UI.Default
        show={show.defaultUI}
        followUser={followUser}
        showCurrentPositionIndicator={mapRef === null || show.indicator}
        onCurrentPosition={followUserLocation}
      />

      {/* Base Map Components */}
      <MapLabel scope={scope} />
      <Map
        loadMap={isMapNeverOpen === false}
        followUser={followUser}
        style={{ flex: 1 }}
        onLoad={(mapRef) => setMapRef(mapRef)}
        onRegionChangeComplete={setCenterRegion}
        onMapPress={onMapPress}
      >
        <Markers.LastKnownLocation
          tutorialMode={tutorialMode}
          lastKnownLocation={lastKnownLocation}
        />
        {openMeasurement !== null && (
          <Markers.DynamicMeasureMarker
            openMeasurement={openMeasurement}
          />
        )}
        {scope.type !== 'navigation' && (
          <MarkersDisplay
            scope={scope}
            showMap={show.map}
            openMeasurement={openMeasurement}
          />
        )}
      </Map>

    </MapAnimation>
  </>);
})
