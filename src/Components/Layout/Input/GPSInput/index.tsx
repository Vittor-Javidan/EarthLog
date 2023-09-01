import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location';

import { GPS_DTO } from '@Types/index';
import { GPSWatcherService } from '@Services/GPSService';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import IconButton from '@Components/Layout/Button/IconButton';
import { LocalComponent } from './__LocalComponents__';
import { useCheckBoxAlert, useEraseAlert, useOvewritteDataAlert } from './Alerts';

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

  const [gpsON, setGpsOn] = useState<boolean>(false);
  const [showCoordinate, setShowCoordinate] = useState<boolean>(props.initialGPSData?.coordinates === undefined ? false : true);
  const [showAltitude, setShowAltitude] = useState<boolean>(props.initialGPSData?.altitude === undefined ? false : true);
  const [gpsData, setGPSData] = useState<GPS_DTO>({});
  const [accuracy_Coordinate, setAccuracy_Coordinate] = useState<number | null>(null);
  const [accuracy_Altitude, setAccuracy_Altitude] = useState<number | null>(null);
  const [erasedData, setErasedData] = useState<GPS_DTO | null>(null);

  const anyGpsDataAvailable = Object.keys(gpsData).length > 0;

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher();};
  }, []);

  async function togleGPSWatch() {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      return;
    }

    if (gpsON) {
      setGpsOn(false);
      gpsWatcher.stopWatcher();
      return;
    }

    if (!anyGpsDataAvailable) {
      setGpsOn(true);
      await gpsWatcher.watchPositionAsync(
        (gpsData) => setGPSData(gpsData),
        (accuracy_Coordinate) => { setAccuracy_Coordinate(accuracy_Coordinate); },
        (accuracy_Altitude) => { setAccuracy_Altitude(accuracy_Altitude); }
      );
      return;
    }

    useOvewritteDataAlert(async () => {
      await gpsWatcher.watchPositionAsync(
        (gpsData) => setGPSData(gpsData),
        (accuracy_Coordinate) => { setAccuracy_Coordinate(accuracy_Coordinate); },
        (accuracy_Altitude) => { setAccuracy_Altitude(accuracy_Altitude); }
        );
      setGpsOn(true);
    });
  }

  async function eraseData() {
    useEraseAlert(() => {
      setErasedData({ ...gpsData });
      setGPSData({});
      setShowCoordinate(false);
      setShowAltitude(false);
    });
  }

  function restoreData() {

    if (erasedData === null) {
      return;
    }

    setGPSData({ ...erasedData });
    setErasedData(null);
    if (erasedData.coordinates !== undefined) { setShowCoordinate(true); }
    if (erasedData.altitude !== undefined) { setShowAltitude(true); }
  }

  async function toogleCoordinate(checked: boolean) {
    await useCheckBoxAlert(
      checked,
      'Coordinate',
      () => {
        gpsWatcher.enableCoordinates(true);
        setShowCoordinate(true);
      },
      () => {
        gpsWatcher.enableCoordinates(false);
        setShowCoordinate(false);
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
    await useCheckBoxAlert(
      checked,
      'Altitude',
      () => {
        gpsWatcher.enableAltitude(true);
        setShowAltitude(true);
      },
      () => {
        gpsWatcher.enableAltitude(false);
        setShowAltitude(false);
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
        {anyGpsDataAvailable && (
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
        <View>
          <LocalComponent.CheckboxOption
            title="Coordinate"
            value={showCoordinate}
            onChange={async (checked) => await toogleCoordinate(checked)}
          />
          <LocalComponent.CheckboxOption
            title="Altitude"
            value={showAltitude}
            onChange={async (checked) => await toogleAltitude(checked)}
          />
        </View>
      )}
      {showCoordinate && (
        <LocalComponent.Display_Coordinate
          gpsON={gpsON}
          accuracyRealTime={accuracy_Coordinate}
          coordinateData={gpsData.coordinates}
        />
      )}
      {showAltitude && (
        <LocalComponent.Display_Altitutde
          gpsON={gpsON}
          accuracyRealTime={accuracy_Altitude}
          altitudeData={gpsData.altitude}
        />
      )}
      {gpsON && <LocalComponent.Loading />}
    </LocalComponent.Root>
  );
}
