import React, { useState, useEffect, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { GPSAccuracyDTO, GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import UtilService from '@Services/UtilService';
import GPSService, { GPSWatcherService } from '@Services/GPSService';

import InputRoot from '../Root';
import IconButtons from './IconButtons';
import { LC } from './__LocalComponents__';
import AlertService from '@Services/AlertService';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

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

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);
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

  function stopGPS() {
    gpsWatcher.stopWatcher();
    setFeatures(prev => ({ ...prev, gpsON: false, editMode: false }));
    props.onPress_Save(UtilService.deepCloning(localGPSData));
  }

  async function startGPS() {
    const noGPSData = Object.keys(localGPSData).length <= 0;
    await AlertService.handleAlert(
      noGPSData === false,
      R['current saved data will be replaced. Are you sure?'],
      async () => {
        await GPSService.getPermission(async () => {
          await gpsWatcher.watchPositionAsync(
            (gpsData) => setLocalGPSData(gpsData),
            (accuracy) => setAccuracy(accuracy)
          );
          setFeatures(prev => ({ ...prev, gpsON: true }));
        });
      }
    );
  }

  async function saveManualInput(newGPSData: GPS_DTO) {
    const noGPSData = Object.keys(localGPSData).length <= 0;
    await AlertService.handleAlert(
      noGPSData === false,
      R['current saved data will be replaced. Are you sure?'],
      () => props.onPress_Save(newGPSData)
    );
  }

  async function onDelete() {
    const noGPSData = Object.keys(localGPSData).length <= 0;
    await AlertService.handleAlert(
      noGPSData === false,
      R['current saved data will be erased. Are you sure?'],
      () => props.onPress_Delete()
    );
  }

  return (<>
    <InputRoot

      label={props.label}
      backgroundColor={props.backgroundColor}
      color={props.color}
      style={[{
        paddingVertical: 10,
        gap: 10,
      },props.style]}

      iconButtons={
        <IconButtons
          hideDeleteButton={props.hideDeleteButton}
          features={features}
          onPress_TrashButton={async () => await onDelete()}
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
          onConfirm={async (newGPSData) => await saveManualInput(newGPSData)}
        />
      )}
    </InputRoot>
  </>);
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
