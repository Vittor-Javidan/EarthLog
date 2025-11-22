import React, { memo, useCallback, useEffect, useState } from "react"
import { Dimensions } from "react-native"
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import DevTools, { useMapTutorial_LastKnownLocation } from "@DevTools";
import { MapMarkerFilter, MapScope, MapShowSetter } from "@V2/Types/AppTypes";
import { CompassMeasurementDTO, CoordinateDTO } from "@V2/Types/ProjectTypes";
import { ConfigService } from "@V2/Services/ConfigService";
import { useTutorialLayer } from "../API/Tutorial";
import { PopUpAPI } from "../API/PopUp";
import { MapAPI } from "../API/Map";
import { useFirstPosition, useFollowUserLocation, useOpenMeasurementLocation } from "./Hooks";

import { MapAnimation } from "./Animation";
import { Map } from "./Map";
import { MapLabel } from "./MapLabel";
import { Markers } from "./Markers";
import { MarkersDisplay } from "./MarkersDisplay";
import { MarkerFilter } from "./Filter";
import { UI } from "./UI";

export const Layer_Map = memo(() => {

  const { top, bottom} = useSafeAreaInsets();
  const [mapRef           , setMapRef           ] = useState<React.RefObject<MapView | null> | null>(null);
  const [scope            , setScope            ] = useState<MapScope>({ type: 'navigation' });
  const [isMapNeverOpen   , setIsMapNeverOpen   ] = useState<boolean>(true);
  const [followUser       , setFollowUser       ] = useState<boolean>(false);
  const [lastKnownLocation, setLastKnownLocation] = useState<CoordinateDTO | null>(null);
  const [goToCoordinate   , setGoToCoordinate   ] = useState<CoordinateDTO | undefined>(undefined);
  const [centerRegion     , setCenterRegion     ] = useState<Region | null>(null);
  const [tutorialMode     , setTutorialMode     ] = useState<boolean>(DevTools.TUTORIAL_MODE);
  const [markerFilter     , setMarkerFilter     ] = useState<MapMarkerFilter>({
    projectInfo: true,
    sampleInfo: true,
    gpsInput: true,
    compassMeasurement: true,
  })
  const [show, setShow] = useState<MapShowSetter>({
    map: false,
    indicator: false,
    tutorial: ConfigService.config.tutorial_map,
    pinUI_Measurement: false,
    defaultUI: true,
    filter: false,
  })
  MapAPI.scopeSetter        = setScope;
  MapAPI.tutorialModeSetter = setTutorialMode;
  MapAPI.markerFilterSetter = setMarkerFilter;
  MapAPI.showSetter         = setShow;

  // Measurement States
  const [backupCoordinate     , setBackupCoordinate     ] = useState<CoordinateDTO | undefined>(undefined);
  const [openMeasurement      , setOpenMeasurement      ] = useState<CompassMeasurementDTO | null>(null);
  const [didMeasurementChanged, setDidMeasurementChanged] = useState<boolean>(false);
  MapAPI.backupCoordinateSetter      = setBackupCoordinate;
  MapAPI.openMeasurementSetter       = setOpenMeasurement;
  MapAPI.didMeasurementChangedSetter = setDidMeasurementChanged;

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
  }, [openMeasurement, backupCoordinate, didMeasurementChanged])

  const onMeasurementOpen = useCallback((coordinate: CoordinateDTO) => {
    const { lat, long } = coordinate;
    const newLatitude  = tutorialMode ? lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
    const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
    setGoToCoordinate({
      lat: newLatitude,
      long: newLongitude,
      accuracy: 0,
    });
  }, [tutorialMode]);

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
        const { lat, long } = backupCoordinate;
        const newLatitude  = tutorialMode ? lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
        const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
        setGoToCoordinate({ lat: newLatitude, long: newLongitude, accuracy: 0 });
      }
    }
    setOpenMeasurement(newMeasurement);
  }, [openMeasurement, backupCoordinate, tutorialMode])

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

  const onFilterPress = useCallback(() => {
    console.log("Filter Pressed")
    setShow(prev => ({ ...prev, filter: true }));
  }, [])

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

  const onFilterChange_marker_projectInfo = useCallback((newValue: boolean) => {
    setMarkerFilter(prev => ({ ...prev, projectInfo: newValue }));
  }, []);

  const onFilterChange_markers_sampleInfo = useCallback((newValue: boolean) => {
    setMarkerFilter(prev => ({ ...prev, sampleInfo: newValue }));
  }, []);

  const onFilterChange_markers_gpsInput = useCallback((newValue: boolean) => {
    setMarkerFilter(prev => ({ ...prev, gpsInput: newValue }));
  }, []);

  const onFilterChange_markers_compassMeasurement = useCallback((newValue: boolean) => {
    setMarkerFilter(prev => ({ ...prev, compassMeasurement: newValue }));
  }, []);

  const onFilterClose = useCallback(() => {
    setShow(prev => ({ ...prev, filter: false }));
  }, []);

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
    onGoToCoordinate: onMeasurementOpen,
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
        onFilterPress={onFilterPress}
        onCurrentPosition={followUserLocation}
      />

      {/* Base Map Components */}
      <MapLabel scope={scope} />
      <MarkerFilter
        filter={markerFilter}
        onClose={onFilterClose}
        show={show.filter}
        onFilterChange_marker_projectInfo={onFilterChange_marker_projectInfo}
        onFilterChange_markers_sampleInfo={onFilterChange_markers_sampleInfo}
        onFilterChange_markers_gpsInput={onFilterChange_markers_gpsInput}
        onFilterChange_markers_compassMeasurement={onFilterChange_markers_compassMeasurement}
      />
      <Map
        loadMap={isMapNeverOpen === false}
        followUser={followUser}
        style={{ flex: 1 }}
        onLoad={(mapRef) => setMapRef(mapRef)}
        onRegionChangeComplete={onRegionChangeComplete}
        onMapPress={onMapPress}
      >
        {/* WARNING

          Avoid using useMemo on components rendered inside <Map />.
          The react-native-maps library does not behave well with memoized values.
          Even if everything works correctly in development, memoization values can lead to
          crashes or unexpected behavior in production builds.

          Markers often only re-render when their coordinate prop changes, ignoring
          updates to other props. Because of this, forcing an update usually requires
          toggling the marker’s visibility (e.g., {showMarker && <Marker_Component ... />} ),
          which eliminates any benefit memoization would have provided.

          Overall, this behavior is inconsistent and difficult to debug, so avoiding
          memoization for map children is recommended.

        */}
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
            showMarker_ProjectInfo={markerFilter.projectInfo}
            showMarkers_SampleInfo={markerFilter.sampleInfo}
            showMarkers_GPSInput={markerFilter.gpsInput}
            showMarkers_CompassMeasurement={markerFilter.compassMeasurement}
            openMeasurement={openMeasurement}
          />
        )}
      </Map>

    </MapAnimation>
  </>);
})
