import React, { useState, useEffect, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { GPSAccuracyDTO, GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import GPSService, { GPSWatcherService } from '@Services/GPSService';
import UtilService from '@Services/UtilService';

import InputRoot from '../Root';
import IconButtons from './IconButtons';
import { LC } from './__LocalComponents__';

export default function GPSInput(props: {
  label: string
  gpsData: GPS_DTO,
  backgroundColor?: string
  color?: string
  color_placeholder?: string
  hideDeleteButton?: boolean
  style?: StyleProp<ViewStyle>
  onPress_Save: (gpsData: GPS_DTO) => void
  onPress_Delete: () => void
}) {

  const gpsWatcher = useMemo(() => new GPSWatcherService(UtilService.deepCloning(props.gpsData)), []);
  const [localGPSData, setLocalGPSData] = useState<GPS_DTO>(UtilService.deepCloning(props.gpsData));

  const [accuracy, setAccuracy] = useState<GPSAccuracyDTO>({
    coordinate: null,
    altitude: null,
  });

  const [features, setFeatures] = useState<GPSFeaturesDTO>({
    editMode: false,
    gpsON: false,
    enableCoordinate: true,
    enableAltitude: true,
  });

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher();};
  }, []);

  useSincronizeGPSData(() => {
    gpsWatcher.setGpsData(UtilService.deepCloning(props.gpsData));
    gpsWatcher.enableAltitude(true);
    gpsWatcher.enableCoordinates(true);
    setLocalGPSData(props.gpsData);
    setFeatures(prev => ({
      ...prev,
      editMode: false,
      enableCoordinate: true,
      enableAltitude: true,
    }));
  }, [props.gpsData]);

  function toogleCoordinate(checked: boolean) {
    if (checked) {
      gpsWatcher.enableCoordinates(true);
      setFeatures(prev => ({ ...prev, enableCoordinate: true }));
    } else {
      gpsWatcher.enableCoordinates(false);
      setFeatures(prev => ({ ...prev, enableCoordinate: false }));
      setLocalGPSData(prev => {
        const newData = { ...prev };
        if (newData.coordinates !== undefined) { delete newData.coordinates; }
        return newData;
      });
    }
  }

  function toogleAltitude(checked: boolean) {
    if (checked) {
      gpsWatcher.enableAltitude(true);
      setFeatures(prev => ({ ...prev, enableAltitude: true }));
    } else {
      gpsWatcher.enableAltitude(false);
      setFeatures(prev => ({ ...prev, enableAltitude: false }));
      setLocalGPSData(prev => {
        const newData: GPS_DTO = { ...prev };
        if (newData.altitude !== undefined) { delete newData.altitude; }
        return newData;
      });
    }
  }

  async function startGPS() {
    await GPSService.getPermission(async () => {
      await gpsWatcher.watchPositionAsync(
        (gpsData) => setLocalGPSData(gpsData),
        (accuracy) => setAccuracy(accuracy)
      );
      setFeatures(prev => ({ ...prev, gpsON: true }));
    });
  }

  function stopGPS() {
    gpsWatcher.stopWatcher();
    setFeatures(prev => ({ ...prev, gpsON: false }));
    props.onPress_Save(UtilService.deepCloning(localGPSData));
  }

  function saveManualInput(newGPSData: GPS_DTO) {
    props.onPress_Save(newGPSData);
  }

  return (
    <InputRoot
      label={props.label}
      backgroundColor={props.backgroundColor}
      color={props.color}
      color_placeholder={props.color_placeholder}
      style={[{ gap: 10 }, props.style]}
      iconButtons={
        <IconButtons
          hideDeleteButton={props.hideDeleteButton}
          features={features}
          onPress_TrashButton={() => props.onPress_Delete()}
          onPress_EditButton={() => setFeatures(prev => ({ ...prev, editMode: !prev.editMode }))}
          onPress_PlayButton={async () => await startGPS()}
          onPress_StopButton={() => stopGPS()}
        />
      }
    >
      <LC.CheckboxOption
        features={features}
        onToogle_Coordinate={(checked) => toogleCoordinate(checked)}
        onToogle_Altitude={(checked) => toogleAltitude(checked)}
      />
      <LC.DataDisplay
        gpsData={localGPSData}
        features={features}
      />
      <LC.Display_RealTimeAccuracy
        accuracy={accuracy}
        features={features}
      />
      <LC.Loading
        features={features}
      />
      {features.editMode === true && (
        <LC.ManualInput
          features={features}
          onConfirm={(newGPSData) => saveManualInput(newGPSData)}
        />
      )}
    </InputRoot>
  );
}

/**
 *  - This hook exist only for the purpose of syncronize external gpsData with localGPSData.
 *  - LocalGPSData purpose is to update current component without triggering parent
 *  components, so it's possible to cancel any changes during usage.
 */
function useSincronizeGPSData(
  callback: () => void,
  deps: React.DependencyList | undefined
) {
  // Facade hook.
  // Its pupose is to add documentation and give an alias to useEffect usage
  useEffect(() => {
    callback();
  }, deps);
}
