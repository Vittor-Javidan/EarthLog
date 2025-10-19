import React, { useMemo, memo } from 'react';
import { View } from 'react-native';

import { WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';

import { TextInput_GPS } from './TextInput_GPS';

type TempAltitude = {
  value: string
  accuracy: string
}

export const AltitudeInputs = memo((props: {
  tempAltitude: TempAltitude
  theme: WidgetTheme
  onAltitudeChange: (newAlt: string) => void
  onAccuracyChange_Alt: (newAcc: string) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.gps[config.language], []);

  return (
    <View
      style={{
        gap: 0,
      }}
    >
      <TextInput_GPS
        type="meters"
        title={R['Altitude (m)']}
        value_placeholder={R['Altitude']}
        value={props.tempAltitude.value}
        onChangeText={(newAlt) => props.onAltitudeChange(newAlt)}
        theme={props.theme}
      />
      <TextInput_GPS
        type="meters"
        title={R['Accuracy (m)']}
        value_placeholder={R['Accuracy']}
        value={props.tempAltitude.accuracy}
        onChangeText={(newAcc) => props.onAccuracyChange_Alt(newAcc)}
        theme={props.theme}
      />
    </View>
  );
});
