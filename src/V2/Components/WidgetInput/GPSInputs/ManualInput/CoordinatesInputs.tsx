import React, { useMemo, memo } from 'react';
import { View, Platform } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';

import { TextInput_GPS } from './TextInput_GPS';

type TempCoordinates = {
  latitude: string
  longitude: string
  accuracy: string
}

export const CoordinatesInputs = memo((props: {
  tempCoordinate: TempCoordinates
  theme: WidgetTheme
  onLatitudeChange: (newLat: string) => void
  onLongitudeChange: (newLong: string) => void
  onAccuracyChange_Coord: (newAcc: string) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.gps[config.language], []);

  return (
    <View
      style={{
        gap: Platform.OS === 'ios' ? 10 : 0,
      }}
    >
      <TextInput_GPS
        type="latitude"
        title={R['Latitude (DD)']}
        value_placeholder={R['Latitude']}
        value={props.tempCoordinate.latitude}
        onChangeText={(newLat) => props.onLatitudeChange(newLat)}
        theme={props.theme}
      />
      <TextInput_GPS
        type="longitude"
        title={R['Longitude (DD)']}
        value_placeholder={R['Longitude']}
        value={props.tempCoordinate.longitude}
        onChangeText={(newLong) => props.onLongitudeChange(newLong)}
        theme={props.theme}
      />
      <TextInput_GPS
        type="meters"
        title={R['Accuracy (m)']}
        value_placeholder={R['Accuracy']}
        value={props.tempCoordinate.accuracy}
        onChangeText={(newAcc) => props.onAccuracyChange_Coord(newAcc)}
        theme={props.theme}
      />
    </View>
  );
});
