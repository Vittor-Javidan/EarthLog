import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location';

import { GPS_DTO } from '@Types/index';
import { GPSWatcherService } from '@Services/GPSService';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import IconButton from '@Components/Layout/Button/IconButton';
import { LocalComponent } from './__LocalComponents__';
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

  const { theme } = useMemo(() => ConfigService.config, []);
  const gpsWatcher = useMemo(() => new GPSWatcherService({
    initialGPSData: UtilService.deepCloning(props.initialGPSData ?? {}),
    minCoordinateAccuracy: props.minCoordinateAccuracy ?? 20,
    minAltitudeAccuracy: props.minAltitudeAccuracy ?? 10,
  }), []);

  const [gpsData, setGPSData] = useState<GPS_DTO>({});
  const [erasedData, setErasedData] = useState<GPS_DTO | null>(null);
  const [gpsON, setGpsOn] = useState<boolean>(false);

  const [enableCoordinate, setEnableCoordinate] = useState<boolean>(props.initialGPSData?.coordinates === undefined ? false : true);
  const [enableAltitude, setEnableAltitude] = useState<boolean>(props.initialGPSData?.altitude === undefined ? false : true);

  const [realTimeAccuracy_Coordinate, setRealTimeAccuracy_Coordinate] = useState<number | null>(null);
  const [realTimeAccuracy_Altitude, setRealTimeAccuracy_Altitude] = useState<number | null>(null);

  const dataAvailable = Object.keys(gpsData).length > 0;

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher();};
  }, []);

  async function togleGPSWatch() {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      return;
    }

    if (gpsON) {
      gpsWatcher.stopWatcher();
      setGpsOn(false);
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

  async function eraseData() {
    alert_EraseData(() => {
      setErasedData({ ...gpsData });
      setGPSData({});
      setEnableCoordinate(false);
      setEnableAltitude(false);
    });
  }

  function restoreData() {

    if (erasedData === null) {
      return;
    }

    setGPSData({ ...erasedData });
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
    <LocalComponent.Root

      label={props.label}
      backgroundColor={props.backgroundColor}
      color={props.color}
      color_placeholder={props.color_placeholder}

      iconButtons={<>
        {erasedData !== null && (
          <IconButton
            iconName="arrow-undo"
            color={theme.onBackground}
            onPress={async () => restoreData()}
            style={{
              paddingHorizontal: 5,
              paddingVertical: 0,
              borderRadius: 10,
            }}
          />
        )}
        {dataAvailable && (
          <IconButton
            iconName="trash-outline"
            color={theme.wrong}
            onPress={async () => await eraseData()}
            style={{
              paddingHorizontal: 5,
              paddingVertical: 0,
              borderRadius: 10,
            }}
          />
        )}
        <IconButton
          iconName={gpsON ? 'stop' : 'play'}
          color={gpsON ? theme.wrong : theme.confirm}
          onPress={async () => await togleGPSWatch()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      </>}

    >
      {gpsON && (
        <View
          style={{
            gap: 5,
          }}
        >
          <LocalComponent.CheckboxOption
            title="Coordinate"
            value={enableCoordinate}
            onChange={async (checked) => await toogleCoordinate(checked)}
          />
          <LocalComponent.CheckboxOption
            title="Altitude"
            value={enableAltitude}
            onChange={async (checked) => await toogleAltitude(checked)}
          />
        </View>
      )}
      <LocalComponent.DisplayData
        gpsData={gpsData}
      />
      <LocalComponent.Display_RealTimeAccuracy
        gpsON={gpsON}
        coordinateEnable={enableCoordinate}
        altitudeEnable={enableAltitude}
        realTimeAccuracy_Coordinate={realTimeAccuracy_Coordinate}
        realTimeAccuracy_Altitude={realTimeAccuracy_Altitude}
      />
      <LocalComponent.Loading
        gpsON={gpsON}
        coordinateEnable={enableCoordinate}
        altitudeEnable={enableAltitude}
      />
    </LocalComponent.Root>
  );
}
