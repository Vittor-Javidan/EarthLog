import React, { useState, useEffect, useMemo } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Vibration from 'expo-haptics';

import { AltitudeDTO, CoordinateDTO, GPS_DTO } from '@Types/index';
import { GPSWatcherService } from '@Services/GPSService';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import IconButton from '../Button/IconButton';
import InputContainer from './__InputContainer__';
import Checkbox from '../Button/Checkbox';
import H3 from '../Text/H3';
import P from '../Text/P';

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

    if (!gpsON) {
      if (anyGpsDataAvailable) {
        await useOvewriteAlert(async () => {
          setGpsOn(true);
          await gpsWatcher.watchPositionAsync(
            (gpsData) => setGPSData(gpsData),
            (accuracy_Coordinate) => { setAccuracy_Coordinate(accuracy_Coordinate); },
            (accuracy_Altitude) => { setAccuracy_Altitude(accuracy_Altitude); }
          );
        });
      } else {
        setGpsOn(true);
        await gpsWatcher.watchPositionAsync(
          (gpsData) => setGPSData(gpsData),
          (accuracy_Coordinate) => { setAccuracy_Coordinate(accuracy_Coordinate); },
          (accuracy_Altitude) => { setAccuracy_Altitude(accuracy_Altitude); }
        );
      }
    } else {
      setGpsOn(false);
      gpsWatcher.stopWatcher();
    }
  }

  function eraseData() {
    if (anyGpsDataAvailable) {
      useEraseAlert(() => {
        setErasedData({ ...gpsData });
        setGPSData({});
        gpsWatcher.enableCoordinates(false);
        gpsWatcher.enableCoordinates(false);
        setShowCoordinate(false);
        setShowAltitude(false);
      });
    }
  }

  function restoreData() {
    if (erasedData !== null) {
      setGPSData({ ...erasedData });
      setErasedData(null);
      if (erasedData.coordinates !== undefined) {
        setShowCoordinate(true);
      }
      if (erasedData.altitude !== undefined) {
        setShowAltitude(true);
      }
    }
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
    <InputContainer
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
        {anyGpsDataAvailable && <IconButton
          iconName="trash-outline"
          color={theme.wrong}
          onPress={async () => eraseData()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />}
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
      <View
        style={{
          gap: 10,
        }}
      >



        <View
          style={{
            flexDirection: 'row',
            gap: 30,
          }}
        >
          <CheckboxOption
            title="Coordinate"
            value={showCoordinate}
            onChange={async (checked) => await toogleCoordinate(checked)}
          />
          <CheckboxOption
            title="Altitude"
            value={showAltitude}
            onChange={async (checked) => await toogleAltitude(checked)}
          />
        </View>



        {showCoordinate && (
          <Display_Coordinate
            gpsON={gpsON}
            accuracyRealTime={accuracy_Coordinate}
            coordinateData={gpsData.coordinates}
          />
        )}



        {showAltitude && (
          <Display_Altitude
            gpsON={gpsON}
            accuracyRealTime={accuracy_Altitude}
            altitudeData={gpsData.altitude}
          />
        )}



        {gpsON && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <ActivityIndicator size="small" />
          </View>
        )}
      </View>
    </InputContainer>
  );
}

function Display_Coordinate(props: {
  gpsON: boolean
  accuracyRealTime: number | null
  coordinateData: CoordinateDTO | undefined
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  if (props.coordinateData === undefined) {
    return;
  }

  return (
    <View>
      <P
        style={{ color: theme.onBackground }}
      >
        {`Latitude: ${props.coordinateData.lat} (+-${props.coordinateData.accuracy}m)`}
      </P>
      <P
        style={{ color: theme.onBackground }}
      >
        {`Longitude: ${props.coordinateData.long} (+-${props.coordinateData.accuracy}m)`}
      </P>
      {props.gpsON && props.accuracyRealTime !== null && (
        <P
          style={{ color: theme.onBackground }}
        >
          {`accuracy: ${props.accuracyRealTime}`}
        </P>
      )}
    </View>
  );
}

function Display_Altitude(props: {
  gpsON: boolean
  accuracyRealTime: number | null
  altitudeData: AltitudeDTO | undefined
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  if (props.altitudeData === undefined) {
    return;
  }

  return (
    <View>
      <P
        style={{ color: theme.onBackground }}
      >
        {`Altitude: ${props.altitudeData.value} (+-${props.altitudeData.accuracy}m)`}
      </P>
      {props.gpsON && props.accuracyRealTime !== null && (
        <P
          style={{ color: theme.onBackground }}
        >
          {`accuracy: ${props.accuracyRealTime}`}
        </P>
      )}
    </View>
  );
}

function CheckboxOption(props: {
  title: string
  value: boolean
  onChange: (checked: boolean) => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Checkbox
        value={props.value}
        onChange={(checked => props.onChange(checked))}
      />
      <H3
        style={{ color: theme.onBackground }}
      >
        {props.title}
      </H3>
    </View>
  );
}

/**
 * @description Triggers an alert when receive false value. When the use unmark checkbox for example.
 * @Usage Can be used inside callbacks or function.
 */
async function useCheckBoxAlert(
  checked: boolean,
  type: 'Coordinate' | 'Altitude',
  onCheckedTrue: () => void,
  onCheckedFalse: () => void
) {
  if (checked === false) {
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
    Alert.alert(
      'Hold on!',
      type === 'Coordinate'
      ? 'If you procceed you gonna erase current coordinate saved data. Are you sure?'
      : 'If you procceed you gonna erase current altitude saved data. Are you sure?',
      [
        {
          text: 'No',
          onPress: async () => {
            await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
            return null;
          },
        },
        {
          text: 'Yes',
          onPress: async () => {
            await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
            onCheckedFalse();
          },
        },
      ]
    );
    return;
  }
  onCheckedTrue();
}

async function useEraseAlert(onErase: () => void) {
  await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  Alert.alert(
    'Hold on!',
    'Are you sure you want to delete all gps data?',
    [
      {
        text: 'No',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
        },
      },
      {
        text: 'Yes',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
          onErase();
        },
      },
    ]
  );
}

async function useOvewriteAlert(
  onAccept: () => void
) {
  await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  Alert.alert(
    'Hold on!',
    'Are you sure you want to override current gps data?',
    [
      {
        text: 'No',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
        },
      },
      {
        text: 'Yes',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
          onAccept();
        },
      },
    ]
  );
}
