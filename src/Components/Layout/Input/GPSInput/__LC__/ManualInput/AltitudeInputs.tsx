import React, { useMemo } from 'react';
import { View, Platform } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import TextInput_GPS from './TextInput_GPS';

type TempAltitude = {
  value: string
  accuracy: string
}

export default function AltitudeInputs(props: {
  tempAltitude: TempAltitude
  onAltitudeChange: (newAlt: string) => void
  onAccuracyChange_Alt: (newAcc: string) => void
}) {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);

  return (
    <View
      style={{
        gap: Platform.OS === 'ios' ? 10 : 0,
      }}
    >
      <TextInput_GPS
        type="meters"
        title={R['Altitude (m)']}
        value_placeholder={R['Altitude']}
        value={props.tempAltitude.value}
        onChangeText={(newAlt) => props.onAltitudeChange(newAlt)}
      />
      <TextInput_GPS
        type="meters"
        title={R['Accuracy (m)']}
        value_placeholder={R['Accuracy']}
        value={props.tempAltitude.accuracy}
        onChangeText={(newAcc) => props.onAccuracyChange_Alt(newAcc)}
      />
    </View>
  );
}
