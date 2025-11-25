import { memo, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Region } from "react-native-maps";

import {
  CompassMeasurementDTO,
  CoordinateDTO,
  MapFilter,
  MapScope,
  OpenEntity
} from "@V1/Types";

import DevTools from "@DevTools";
import { Z_INDEX } from "@V1/Globals/zIndex";
import { CacheService } from "@V1/Services/CacheService";
import { PinMeasurementUI_API } from "@V1/Layers/API/Map";
import { PopUpAPI } from "@V1/Layers/API/PopUp";
import { useMapPress } from "../../Hooks";

import { LC } from "../../__LC__";
import { MapButton } from "../../Buttons";

export const UI_PinMeasurement = memo((props: {
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
  onMeasurementUpdate: (measurement: OpenEntity | null) => void;
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

  const [showFilter           , setShowFilter           ] = useState(false);
  const [backupCoordinate     , setBackupCoordinate     ] = useState<CoordinateDTO | undefined>(undefined);
  const [openMeasurement      , setOpenMeasurement      ] = useState<CompassMeasurementDTO | null>(null);
  const [didMeasurementChanged, setDidMeasurementChanged] = useState<boolean>(false);
  PinMeasurementUI_API.backupCoordinateSetter      = setBackupCoordinate;
  PinMeasurementUI_API.openMeasurementSetter       = setOpenMeasurement;
  PinMeasurementUI_API.didMeasurementChangedSetter = setDidMeasurementChanged;

  const saveAndCloseMeasurementCoordinates = useCallback(() => {
    PopUpAPI.handleAlert((didMeasurementChanged && backupCoordinate !== undefined), {
      type: 'warning',
      question: 'You changed the measurement location. Do you want to save the changes?',
    }, () => {
      if (openMeasurement === null) { return }
      openMeasurement.coordinates === undefined
      ? PinMeasurementUI_API.triggerRegionUpdate(undefined)
      : PinMeasurementUI_API.triggerRegionUpdate({
          lat: openMeasurement.coordinates.lat,
          long: openMeasurement.coordinates.long,
          accuracy: 0,
        });
      props.onCloseMap();
    })
  }, [openMeasurement, backupCoordinate, didMeasurementChanged])

  const updateMeasurementCoordinates = useCallback(() => {
    if (openMeasurement === null) { return }
    if (centerRegion === null) { return }
    const newMeasuremente = { ...openMeasurement }
    newMeasuremente.coordinates = {
      lat: centerRegion.latitude,
      long: centerRegion.longitude,
      accuracy: 0,
    }
    setDidMeasurementChanged(true);
    setOpenMeasurement(newMeasuremente);
  }, [centerRegion, openMeasurement])

  const resetMeasurementCoordinates = useCallback(() => {
    if (openMeasurement === null) { return }
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
        props.goToCoordinate({ lat: newLatitude, long: newLongitude, accuracy: 0 });
      }
    }
    setDidMeasurementChanged(false);
    setOpenMeasurement(newMeasurement);
  }, [openMeasurement, backupCoordinate, tutorialMode])

  const deleteMeasurementCoordinates = useCallback(() => {
    if (openMeasurement === null) { return }
    const newMeasurement = { ...openMeasurement };
    if (newMeasurement.coordinates) {
      delete newMeasurement.coordinates;
      setDidMeasurementChanged(true);
    }
    setOpenMeasurement(newMeasurement);
  }, [openMeasurement])

  const onMeasurementOpen = useCallback((coordinate: CoordinateDTO) => {
      const { lat, long } = coordinate;
      const newLatitude  = tutorialMode ? lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : lat;
      const newLongitude = tutorialMode ? long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : long;
      props.goToCoordinate({ lat: newLatitude, long: newLongitude, accuracy: 0 });
  }, [tutorialMode]);

  const onFilterClose = useCallback(() => {
    setShowFilter(false);
  }, []);

  const onFilterOpen = useCallback(() => {
    setShowFilter(true);
  }, []);

  useUpdateMeasurement({
    showUI: showUI,
    openMeasurement: openMeasurement,
    onMeasurementUpdate: props.onMeasurementUpdate,
  })

  useOpenMeasurementLocation({
    openMeasurement: openMeasurement,
    scope: scope,
    onGoToCoordinate: onMeasurementOpen,
  })

  useMapPress({
    mapPressed: mapPressed,
    onMapPressed: () => updateMeasurementCoordinates()
  })

  if (
    !showUI ||
    centerRegion === null ||
    openMeasurement === null
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
        onPress={updateMeasurementCoordinates}
      />
      <MapButton.Save
        onPress={saveAndCloseMeasurementCoordinates}
      />
      <MapButton.Reset
        onPress={resetMeasurementCoordinates}
      />
      <MapButton.Delete
        onPress={deleteMeasurementCoordinates}
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

function useUpdateMeasurement(o: {
  showUI: boolean,
  openMeasurement: CompassMeasurementDTO | null,
  onMeasurementUpdate: (measurement: OpenEntity | null) => void,
}) {
  const { showUI, openMeasurement } = o;
  useEffect(() => {
    if (!showUI) { return; }
    if (openMeasurement === null) { return; }
    o.onMeasurementUpdate({
      type: 'compass measurement',
      entity: openMeasurement,
    });
  }, [showUI, openMeasurement])
}

function useOpenMeasurementLocation(o: {
  scope: MapScope,
  openMeasurement: CompassMeasurementDTO | null,
  onGoToCoordinate: (coordinate: CoordinateDTO) => void,
}) {
  const { scope, openMeasurement } = o;
  useEffect(() => {
    
    if (openMeasurement === null) {
      return;
    }
    
    const measurementCoordinates = openMeasurement.coordinates;
    if (measurementCoordinates !== undefined) {
      o.onGoToCoordinate({ lat: measurementCoordinates.lat, long: measurementCoordinates.long, accuracy: 0 });
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
  }, [scope, openMeasurement]) 
}