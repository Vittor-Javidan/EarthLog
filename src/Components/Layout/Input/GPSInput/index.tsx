import React, { useState, useEffect, useMemo } from 'react';
import * as Location from 'expo-location';

import { GPSAccuracyDTO, GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import { GPSWatcherService } from '@Services/GPSService';
import UtilService from '@Services/UtilService';

import InputRoot from '../Root';
import IconButtons from './IconButtons';
import { LC } from './__LocalComponents__';

export default function GPSInput(props: {
  label: string
  initialGPSData: GPS_DTO,
  backgroundColor?: string
  color?: string
  color_placeholder?: string
  hideDeleteButton?: boolean
  onPress_Save: (gpsData: GPS_DTO) => void
  onPress_Delete: () => void
}) {

  const gpsWatcher = useMemo(() => new GPSWatcherService(UtilService.deepCloning(props.initialGPSData)), []);
  const [initialGPSData, setInitalGPSData] = useState<GPS_DTO>(UtilService.deepCloning(props.initialGPSData));
  const [gpsData, setGPSData] = useState<GPS_DTO>(UtilService.deepCloning(props.initialGPSData));

  const [accuracy, setAccuracy] = useState<GPSAccuracyDTO>({
    coordinate: null,
    altitude: null,
  });

  const [features, setFeatures] = useState<GPSFeaturesDTO>({
    editMode: false,
    gpsON: false,
    enableCoordinate: props.initialGPSData?.coordinates === undefined ? false : true,
    enableAltitude: props.initialGPSData?.altitude === undefined ? false : true,
  });

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher();};
  }, []);

  async function startGPS() {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      return;
    }

    await gpsWatcher.watchPositionAsync(
      (gpsData) => {
        setGPSData(gpsData);
      },
      (accuracy_Coordinate, accuracy_Altitude) => {
        setAccuracy({
          coordinate: accuracy_Coordinate,
          altitude: accuracy_Altitude,
        });
      }
    );
    setFeatures(prev => ({ ...prev, gpsON: true }));
  }

  async function stopGPS() {
    gpsWatcher.stopWatcher();
    setFeatures(prev => ({ ...prev, gpsON: false }));
  }

  async function toogleCoordinate(checked: boolean) {
    if (checked) {
      gpsWatcher.enableCoordinates(true);
      setFeatures(prev => ({ ...prev, enableCoordinate: true }));
    } else {
      gpsWatcher.enableCoordinates(false);
      setFeatures(prev => ({ ...prev, enableCoordinate: false }));
      setGPSData(prev => {
        const newData = { ...prev };
        if (newData.coordinates !== undefined) { delete newData.coordinates; }
        return newData;
      });
    }
  }

  async function toogleAltitude(checked: boolean) {
    if (checked) {
      gpsWatcher.enableAltitude(true);
      setFeatures(prev => ({ ...prev, enableAltitude: true }));
    } else {
      gpsWatcher.enableAltitude(false);
      setFeatures(prev => ({ ...prev, enableAltitude: false }));
      setGPSData(prev => {
        const newData: GPS_DTO = { ...prev };
        if (newData.altitude !== undefined) { delete newData.altitude; }
        return newData;
      });
    }
  }

  function onCancel() {
    gpsWatcher.setGpsData(UtilService.deepCloning(initialGPSData));
    setGPSData(UtilService.deepCloning(initialGPSData));
    setFeatures(prev => ({
      ...prev,
      editMode: false,
      enableCoordinate: initialGPSData.coordinates === undefined ? false : true,
      enableAltitude: initialGPSData.altitude === undefined ? false : true,
    }));
  }

  function onSave() {
    setInitalGPSData(UtilService.deepCloning(gpsData));
    props.onPress_Save(UtilService.deepCloning(gpsData));
    setFeatures(prev => ({ ...prev, editMode: false }));
  }

  async function eraseData() {
    props.onPress_Delete();
  }

  return (
    <InputRoot

      label={props.label}
      backgroundColor={props.backgroundColor}
      color={props.color}
      color_placeholder={props.color_placeholder}

      iconButtons={
        <IconButtons
          hideDeleteButton={props.hideDeleteButton}
          features={features}
          onPress_PlayButton={async () => await startGPS()}
          onPress_StopButton={async () => await stopGPS()}
          onPress_TrashButton={async () => eraseData()}
          onPress_EditButton={() => setFeatures(prev => ({ ...prev, editMode: true }))}
        />
      }

      style={{
        gap: 20,
      }}

    >
      <LC.CheckboxOption
        features={features}
        onToogle_Coordinate={async (checked) => await toogleCoordinate(checked)}
        onToogle_Altitude={async (checked) => await toogleAltitude(checked)}
      />
      <LC.DataDisplayHandler
        gpsData={gpsData}
        features={features}
        onError={() => {}}
        onChange_gpsData={(newGPSData) => setGPSData(newGPSData)}
      />
      <LC.Display_RealTimeAccuracy
        accuracy={accuracy}
        features={features}
      />
      <LC.Loading
        features={features}
      />
      <LC.FooterButtons
        features={features}
        onPress_Cancel={() => onCancel()}
        onPress_Save={() => onSave()}
      />
    </InputRoot>
  );
}
