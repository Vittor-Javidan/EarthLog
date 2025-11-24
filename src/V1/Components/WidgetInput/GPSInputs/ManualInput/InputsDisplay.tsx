import React, { useMemo, useState, memo, useCallback } from 'react';
import { View } from 'react-native';

import {
  GPSFeaturesDTO,
  GPS_DTO,
  WidgetTheme
} from '@V1/Types';

import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Text } from '@V1/Text/index';
import { AltitudeInputs } from './AltitudeInputs';
import { CoordinatesInputs } from './CoordinatesInputs';
import { FooterButtons } from './FooterButtons';

type TempCoordinates = {
  latitude: string
  longitude: string
  accuracy: string
}
type TempAltitude = {
  value: string
  accuracy: string
}

export const InputsDisplay = memo((props: {
  gpsData: GPS_DTO
  features: GPSFeaturesDTO
  theme: WidgetTheme
  onSave: (gpsData: GPS_DTO) => void
  onCancel: () => void
  onError: () => void
}) => {

  const config                            = useMemo(() => ConfigService.config, []);
  const R                                 = useMemo(() => translations.widgetInput.gps[config.language], []);
  const [errorMessage,  setErrorMessage ] = useState<string>('');

  const [coordinates,   setCoordinates  ] = useState<TempCoordinates>({
    latitude: props.gpsData.coordinates ? String(props.gpsData.coordinates.lat) : '',
    longitude: props.gpsData.coordinates ? String(props.gpsData.coordinates.long) : '',
    accuracy: props.gpsData.coordinates ? String(props.gpsData.coordinates.accuracy) : '',
  });

  const [altitude,      setAltitude     ] = useState<TempAltitude>({
    value: props.gpsData.altitude ? String(props.gpsData.altitude.value) : '',
    accuracy: props.gpsData.altitude ? String(props.gpsData.altitude.accuracy) : '',
  });

  const checkMissingInfo = useCallback((whenOk: () => void) => {

    const missingInfo_Coord = props.features.enableCoordinate && (
      coordinates.latitude  === ''  ||
      coordinates.longitude === ''  ||
      coordinates.accuracy  === ''
    );
    const missingInfo_Alt = props.features.enableAltitude && (
      altitude.value    === '' ||
      altitude.accuracy === ''
    );

    if (missingInfo_Coord || missingInfo_Alt) {
      setErrorMessage(R['* All fields must be fulfill']);
      props.onError();
      return;
    }

    whenOk();
  }, [props.features, altitude, coordinates]);

  const onSave = useCallback(() => {
    checkMissingInfo(() => {
      const newGPSData: GPS_DTO = {};
      if (props.features.enableCoordinate) {
        newGPSData.coordinates = {
          lat: Number(coordinates.latitude),
          long: Number(coordinates.longitude),
          accuracy: Number(coordinates.accuracy),
        };
      }
      if (props.features.enableAltitude) {
        newGPSData.altitude = {
          value: Number(altitude.value),
          accuracy: Number(altitude.accuracy),
        };
      }
      setErrorMessage('');
      props.onSave(newGPSData);
    });
  }, [props.features, props.onSave, coordinates, altitude, checkMissingInfo]);

  const onCancel = useCallback(() => {
    setErrorMessage('');
    props.onCancel();
  }, [props.onCancel]);

  return (<>
    {errorMessage !== '' && (
      <Text p
        style={{
          color: props.theme.wrong,
          textAlign: 'left',
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        {errorMessage}
      </Text>
    )}
    <View
      style={{
        gap: 30,
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
    >
      {props.features.enableCoordinate && (
        <CoordinatesInputs
          tempCoordinate={coordinates}
          onLatitudeChange={(newLat) => setCoordinates(prev => ({ ...prev, latitude: newLat }))}
          onLongitudeChange={(newLong) => setCoordinates(prev => ({ ...prev, longitude: newLong }))}
          onAccuracyChange_Coord={(newAcc) => setCoordinates(prev => ({ ...prev, accuracy: newAcc }))}
          theme={props.theme}
        />
      )}
      {props.features.enableAltitude && (
        <AltitudeInputs
          tempAltitude={altitude}
          onAltitudeChange={(newAlt) => setAltitude(prev => ({ ...prev, value: newAlt }))}
          onAccuracyChange_Alt={(newAcc) => setAltitude(prev => ({ ...prev, accuracy: newAcc}))}
          theme={props.theme}
        />
      )}
      <FooterButtons
        onCancel={() => onCancel()}
        onSave={() => onSave()}
        theme={props.theme}
      />
    </View>
  </>);
});
