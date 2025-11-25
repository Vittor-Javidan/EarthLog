import { memo, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Region } from "react-native-maps";

import {
  CoordinateDTO,
  GPSInputData,
  GPSSource,
  MapFilter,
  MapScope,
  OpenEntity
} from "@V1/Types";

import DevTools from "@DevTools";
import { Z_INDEX } from "@V1/Globals/zIndex";
import { CacheService } from "@V1/Services/CacheService";
import { PinGPS_API } from "@V1/Layers/API/Map";
import { PopUpAPI } from "@V1/Layers/API/PopUp";
import { useMapPress } from "../../Hooks";

import { LC } from "../../__LC__";
import { MapButton } from "../../Buttons";

export const UI_PinGPS = memo((props: {
  showUI: boolean;
  scope: MapScope
  filter: MapFilter;
  tutorialMode: boolean;
  followUser: boolean;
  showCurrentPositionIndicator: boolean;
  centerRegion: Region | null
  mapPressed: boolean;
  onCurrentPosition: () => void;
  goToCoordinate: (coordinate: CoordinateDTO) => void;
  onMeasurementUpdate: (gpsInput: OpenEntity | null) => void;
  onFilterChange: (filter: MapFilter) => void;
  onCloseMap: () => void;
}) => {

  const {
    showUI,
    scope,
    tutorialMode,
    centerRegion,
    mapPressed,
    filter,
  } = props;

  const [showFilter      , setShowFilter      ] = useState(false);
  const [backupCoordinate, setBackupCoordinate] = useState<CoordinateDTO | undefined>(undefined);
  const [openGPS         , setOpenGPS         ] = useState<GPSInputData | null>(null);
  const [gpsSource       , setGpsSource       ] = useState<GPSSource | null>(null);
  const [didGPSChanged   , setDidGPSChanged   ] = useState<boolean>(false);

  PinGPS_API.backupCoordinateSetter = setBackupCoordinate;
  PinGPS_API.openGPSSetter          = setOpenGPS;
  PinGPS_API.gpsSourceSetter        = setGpsSource;
  PinGPS_API.didGPSChangedSetter    = setDidGPSChanged;

  const saveAndCloseGPSCoordinates = useCallback(() => {
    PopUpAPI.handleAlert((didGPSChanged && backupCoordinate !== undefined), {
      type: 'warning',
      question: 'You changed the GPS input location. Do you want to save the changes?',
    }, () => {
      if (openGPS === null || gpsSource === null) { return }
      openGPS.value.coordinates === undefined
      ? PinGPS_API.triggerRegionUpdate(undefined)
      : PinGPS_API.triggerRegionUpdate({
          lat: openGPS.value.coordinates.lat,
          long: openGPS.value.coordinates.long,
          accuracy: 0,
        });
      props.onCloseMap();
    });
  }, [didGPSChanged, backupCoordinate, openGPS, gpsSource])

  const updateGPSCoordinates = useCallback(() => {
    if (openGPS === null || gpsSource === null) { return }
    if (centerRegion === null) { return }
    const newGPSInput = { ...openGPS }
    newGPSInput.value = {
      ...newGPSInput.value,
      coordinates: {
        lat: centerRegion.latitude,
        long: centerRegion.longitude,
        accuracy: 0,
      }
    }
    setDidGPSChanged(true);
    setOpenGPS(newGPSInput);
  }, [centerRegion, openGPS, gpsSource])

  const resetGPSCoordinates = useCallback(() => {
    if (openGPS === null || gpsSource === null) { return }
    const newGPSInput = { ...openGPS };
    switch (backupCoordinate) {
      case undefined: {
        if (newGPSInput.value.coordinates) {
          delete newGPSInput.value.coordinates;
        }
        break;
      }
      default: {
        newGPSInput.value.coordinates = { ...backupCoordinate };
        const { lat, long } = backupCoordinate;
        const newLatitude = tutorialMode ? lat + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
        const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
        props.goToCoordinate({ lat: newLatitude, long: newLongitude, accuracy: 0 });
        break;
      }
    }
    setDidGPSChanged(false);
    setOpenGPS(newGPSInput);
  }, [backupCoordinate, openGPS, gpsSource]);

  const deleteGPSCoordinates = useCallback(() => {
    if (openGPS === null || gpsSource === null) { return }
    const newGPSInput = { ...openGPS };
    if (newGPSInput.value.coordinates) {
      delete newGPSInput.value.coordinates;
      setDidGPSChanged(true);
    }
    setOpenGPS(newGPSInput);
  }, [openGPS, gpsSource]);

  const onGPSOpen = useCallback((coordinate: CoordinateDTO) => {
    const { lat, long } = coordinate;
    const newLatitude  = tutorialMode ? lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
    const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
    props.goToCoordinate({ lat: newLatitude, long: newLongitude, accuracy: 0 });
  }, [tutorialMode])

  const onFilterClose = useCallback(() => {
    setShowFilter(false);
  }, []);

  const onFilterOpen = useCallback(() => {
    setShowFilter(true);
  }, []);

  useUpdateGPS({
    showUI,
    openGPS,
    source: gpsSource,
    onMeasurementUpdate: props.onMeasurementUpdate,
  });

  useOpenGPSLocation({
    scope,
    openGPS,
    source: gpsSource,
    onGoToCoordinate: onGPSOpen,
  });

  useMapPress({
    mapPressed: mapPressed,
    onMapPressed: () => updateGPSCoordinates()
  })

  if (
    !showUI ||
    centerRegion === null ||
    openGPS === null ||
    gpsSource === null
  ) return <></>;

  return (<>
    <LC.MapLabel scope={props.scope} />
    <LC.MapCrosshair show={showUI} />
    <LC.Filter
      filter={filter}
      onClose={onFilterClose}
      show={showFilter}
      onFilterChange={props.onFilterChange}
      style={{
        position: 'absolute',
        zIndex: Z_INDEX.LAYER_MAP + 1,
        alignSelf: 'center',
      }}
    />
    <View
      style={{
        position: 'absolute',
        zIndex: Z_INDEX.LAYER_MAP + 1,
        bottom: 40,
        left: 10,
        gap: 10,
      }}
    >
      <MapButton.Pin
        onPress={updateGPSCoordinates}
      />
      <MapButton.Save
        onPress={saveAndCloseGPSCoordinates}
      />
      <MapButton.Reset
        onPress={resetGPSCoordinates}
      />
      <MapButton.Delete
        onPress={deleteGPSCoordinates}
      />
      <MapButton.Filter
        onPress={onFilterOpen}
      />
      <MapButton.CurrentPosition
        showIndicator={props.showCurrentPositionIndicator}
        followUser={props.followUser}
        onPress={props.onCurrentPosition}
      />
    </View>
  </>)
});

function useUpdateGPS(o: {
  showUI: boolean,
  openGPS: GPSInputData | null,
  source: GPSSource | null,
  onMeasurementUpdate: (measurement: OpenEntity | null) => void,
}) {
  const { showUI, openGPS, source } = o;
  useEffect(() => {
    if (!showUI) { return; }
    if (openGPS === null || source === null) { return; }
    o.onMeasurementUpdate({
      type: 'gps input',
      source: source,
      entity: openGPS,
    });
  }, [showUI, openGPS, source])
}

function useOpenGPSLocation(o: {
  scope: MapScope,
  openGPS: GPSInputData | null,
  source: GPSSource | null,
  onGoToCoordinate: (coordinate: CoordinateDTO) => void,
}) {
  const { scope, openGPS, source } = o;
  useEffect(() => {
    
    if (openGPS === null || source === null) {
      return;
    }
    
    const gpsCoordinates = openGPS.value.coordinates;
    if (gpsCoordinates !== undefined) {
      o.onGoToCoordinate({ lat: gpsCoordinates.lat, long: gpsCoordinates.long, accuracy: 0 });
      return;
    }

    switch (scope.type) {

      case 'sample': {
        const sampleSetting = CacheService.getSampleFromCache({ id_sample: scope.id_sample});
        if (
          sampleSetting.gps !== undefined &&
          sampleSetting.gps.coordinates !== undefined
        ) {
          const coordinates = sampleSetting.gps.coordinates;
          o.onGoToCoordinate({ lat: coordinates.lat, long: coordinates.long, accuracy: 0 });
          return;
        }
        break
      }

      case 'project': {
        const projectSetting = CacheService.getProjectFromCache({ id_project: scope.id_project});
        if (
          projectSetting.gps !== undefined &&
          projectSetting.gps.coordinates !== undefined
        ) {
          const coordinates = projectSetting.gps.coordinates;
          o.onGoToCoordinate({ lat: coordinates.lat, long: coordinates.long, accuracy: 0 });
          return;
        }
        break
      }
    }
  }, [scope, openGPS, source]) 
}