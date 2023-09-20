import React, { useMemo } from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { GPSFeaturesDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { GPSInputTheme } from './ThemeType';

export default function CheckboxOptions(props: {
  features: GPSFeaturesDTO
  theme: GPSInputTheme
  onToogle_Coordinate: (checked: boolean) => void
  onToogle_Altitude: (checked: boolean) => void
}) {

  const { theme, features } = props;
  const { editMode, enableCoordinate, enableAltitude } = features;
  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);

  if (editMode === false) {
    return <></>;
  }

  return (
    <View
      style={{
        gap: 20,
        flexDirection: 'row',
      }}
    >
      <Option
        title={R['Coordinates']}
        value={enableCoordinate}
        onChange={(checked) => props.onToogle_Coordinate(checked)}
        theme={theme}
      />
      <Option
        title={R['Altitude']}
        value={enableAltitude}
        onChange={(checked) => props.onToogle_Altitude(checked)}
        theme={theme}
      />
    </View>
  );
}

function Option(props: {
  title: string
  value: boolean
  theme: GPSInputTheme
  onChange: (checked: boolean) => void
}) {

  const { theme } = props;

  function onChange(checked: boolean) {
    props.onChange(checked);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Button.Checkbox
        value={props.value}
        onChange={(checked => onChange(checked))}
        theme={theme}
      />
      <Text.H3
        style={{ color: props.value ? theme.confirm : theme.font }}
      >
        {props.title}
      </Text.H3>
    </View>
  );
}
