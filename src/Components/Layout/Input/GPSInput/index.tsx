import React, { useState, useEffect, useMemo } from 'react';
import * as Location from 'expo-location';

import { GPS_DTO } from '@Types/index';
import { GPSWatcherService } from '@Services/GPSService';
import UtilService from '@Services/UtilService';

import InputRoot from '../Root';
import IconButtons from './IconButtons';
import { LC } from './__LocalComponents__';
import { alert_CheckBoxUncheck, alert_EraseData, alert_OverwritteData } from './Alerts';

export default function GPSInput(props: {
  label: string
  initialGPSData?: GPS_DTO,
  minCoordinateAccuracy?: number,
  minAltitudeAccuracy?: number,
  backgroundColor?: string
  color?: string
  color_placeholder?: string
}) {

  const gpsWatcher = useMemo(() => new GPSWatcherService(UtilService.deepCloning(props.initialGPSData ?? {})), []);

  const [gpsData, setGPSData] = useState<GPS_DTO>({});
  const [erasedData, setErasedData] = useState<GPS_DTO | null>(null);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [gpsON, setGpsOn] = useState<boolean>(false);
  const [enableCoordinate, setEnableCoordinate] = useState<boolean>(props.initialGPSData?.coordinates === undefined ? false : true);
  const [enableAltitude, setEnableAltitude] = useState<boolean>(props.initialGPSData?.altitude === undefined ? false : true);
  const [realTimeAccuracy_Coordinate, setRealTimeAccuracy_Coordinate] = useState<number | null>(null);
  const [realTimeAccuracy_Altitude, setRealTimeAccuracy_Altitude] = useState<number | null>(null);

  const dataAvailable = Object.keys(gpsData).length > 0;

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher();};
  }, []);

  async function startGPS() {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      return;
    }

    const handleAlert = (callback: () => void) => dataAvailable
    ? alert_OverwritteData(() => callback())
    : callback();

    handleAlert(async () => {
      await gpsWatcher.watchPositionAsync(
        (gpsData) => setGPSData(gpsData),
        (accuracy_Coordinate) => { setRealTimeAccuracy_Coordinate(accuracy_Coordinate); },
        (accuracy_Altitude) => { setRealTimeAccuracy_Altitude(accuracy_Altitude); }
      );
      setGpsOn(true);
    });
  }

  async function stopGPS() {
    gpsWatcher.stopWatcher();
    setGpsOn(false);
  }

  async function eraseData() {
    alert_EraseData(() => {
      gpsWatcher.setGpsData({});
      setErasedData(UtilService.deepCloning(gpsData));
      setGPSData({});
      setEnableCoordinate(false);
      setEnableAltitude(false);
    });
  }

  function restoreData() {

    if (erasedData === null) {
      return;
    }

    gpsWatcher.setGpsData(UtilService.deepCloning(erasedData));
    setGPSData(UtilService.deepCloning(erasedData));
    setErasedData(null);
    if (erasedData.coordinates !== undefined) { setEnableCoordinate(true); }
    if (erasedData.altitude !== undefined) { setEnableAltitude(true); }
  }

  async function toogleCoordinate(checked: boolean) {
    await alert_CheckBoxUncheck(
      checked,
      'Coordinate',
      () => {
        gpsWatcher.enableCoordinates(true);
        setEnableCoordinate(true);
      },
      () => {
        gpsWatcher.enableCoordinates(false);
        setEnableCoordinate(false);
        setGPSData(prev => {
          const newData: GPS_DTO = { ...prev };
          if (newData.coordinates !== undefined) {
            delete newData.coordinates;
          }
          return newData;
        });
      }
    );
  }

  async function toogleAltitude(checked: boolean) {
    await alert_CheckBoxUncheck(
      checked,
      'Altitude',
      () => {
        gpsWatcher.enableAltitude(true);
        setEnableAltitude(true);
      },
      () => {
        gpsWatcher.enableAltitude(false);
        setEnableAltitude(false);
        setGPSData(prev => {
          const newData: GPS_DTO = { ...prev };
          if (newData.altitude !== undefined) {
            delete newData.altitude;
          }
          return newData;
        });
      }
    );
  }

  return (
    <InputRoot
      label={props.label}
      backgroundColor={props.backgroundColor}
      color={props.color}
      color_placeholder={props.color_placeholder}
      iconButtons={
        <IconButtons
          gpsData={gpsData}
          erasedData={erasedData}
          gpsON={gpsON}
          editMode={editMode}
          onPress_UndoButton={() => restoreData()}
          onPress_PlayButton={async () => await startGPS()}
          onPress_StopButton={async () => await stopGPS()}
          onPress_TrashButton={async () => await eraseData()}
          onPress_EditButton={() => setEditMode(true)}
          onPress_CloseButton={() => setEditMode(false)}
        />
      }
    >
      <LC.CheckboxOption
        gpsON={gpsON}
        editMode={editMode}
        enableCoordinate={enableCoordinate}
        enableAltitude={enableAltitude}
        onToogle_Coordinate={async (checked) => await toogleCoordinate(checked)}
        onToogle_Altitude={async (checked) => await toogleAltitude(checked)}
      />
      <LC.DisplayData
        gpsData={gpsData}
      />
      <LC.Display_RealTimeAccuracy
        gpsON={gpsON}
        coordinateEnable={enableCoordinate}
        altitudeEnable={enableAltitude}
        realTimeAccuracy_Coordinate={realTimeAccuracy_Coordinate}
        realTimeAccuracy_Altitude={realTimeAccuracy_Altitude}
      />
      <LC.Loading
        gpsON={gpsON}
        coordinateEnable={enableCoordinate}
        altitudeEnable={enableAltitude}
      />
    </InputRoot>
  );
}
