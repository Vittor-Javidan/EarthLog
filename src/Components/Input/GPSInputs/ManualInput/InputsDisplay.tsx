import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';
import AltitudeInputs from './AltitudeInputs';
import CoordinatesInputs from './CoordinatesInputs';
import FooterButtons from './FooterButtons';
import { GPSInputTheme } from '../ThemeType';

type TempCoordinates = {
  latitude: string
  longitude: string
  accuracy: string
}
type TempAltitude = {
  value: string
  accuracy: string
}

export default function InputsDisplay(props: {
  features: GPSFeaturesDTO
  theme: GPSInputTheme
  onSave: (gpsData: GPS_DTO) => void
  onCancel: () => void
  onError: () => void
}) {

  const { theme, features } = props;
  const { enableCoordinate, enableAltitude } = features;
  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);

  const [errorMessage,  setErrorMessage ] = useState<string>('');
  const [coordinates,   setCoordinates  ] = useState<TempCoordinates>({
    latitude: '',
    longitude: '',
    accuracy: '',
  });
  const [altitude,      setAltitude     ] = useState<TempAltitude>({
    value: '',
    accuracy: '',
  });

  function checkMissingInfo(whenOk: () => void) {

    const missingInfo_Coord = enableCoordinate && (
      coordinates.latitude  === ''  ||
      coordinates.longitude === ''  ||
      coordinates.accuracy  === ''
    );

    const missingInfo_Alt = enableAltitude && (
      altitude.value    === '' ||
      altitude.accuracy === ''
    );

    if (missingInfo_Coord || missingInfo_Alt) {
      setErrorMessage(R['* All fields must be fulfill']);
      props.onError();
      return;
    }

    whenOk();
  }

  function onSave() {
    checkMissingInfo(() => {
      const newGPSData: GPS_DTO = {};
      if (enableCoordinate) {
        newGPSData.coordinates = {
          lat: Number(coordinates.latitude),
          long: Number(coordinates.longitude),
          accuracy: Number(coordinates.accuracy),
        };
      }
      if (enableAltitude) {
        newGPSData.altitude = {
          value: Number(altitude.value),
          accuracy: Number(altitude.accuracy),
        };
      }
      setErrorMessage('');
      props.onSave(newGPSData);
    });
  }

  function onCancel() {
    setErrorMessage('');
    props.onCancel();
  }

  return (<>
    {errorMessage !== '' && (
      <Text.P
        style={{
          color: theme.wrong,
          textAlign: 'left',
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        {errorMessage}
      </Text.P>
    )}
    <View
      style={{
        gap: 30,
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
    >
      {enableCoordinate && (
        <CoordinatesInputs
          tempCoordinate={coordinates}
          onLatitudeChange={(newLat) => setCoordinates(prev => ({ ...prev, latitude: newLat }))}
          onLongitudeChange={(newLong) => setCoordinates(prev => ({ ...prev, longitude: newLong }))}
          onAccuracyChange_Coord={(newAcc) => setCoordinates(prev => ({ ...prev, accuracy: newAcc }))}
          theme={theme}
        />
      )}
      {enableAltitude && (
        <AltitudeInputs
          tempAltitude={altitude}
          onAltitudeChange={(newAlt) => setAltitude(prev => ({ ...prev, value: newAlt }))}
          onAccuracyChange_Alt={(newAcc) => setAltitude(prev => ({ ...prev, accuracy: newAcc}))}
          theme={theme}
        />
      )}
      <FooterButtons
        onCancel={() => onCancel()}
        onSave={() => onSave()}
        theme={theme}
      />
    </View>
  </>);
}
