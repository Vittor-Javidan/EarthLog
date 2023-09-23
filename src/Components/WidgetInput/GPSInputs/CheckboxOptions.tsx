import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ApticsService from '@Services/ApticsService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { GPSInputTheme } from './ThemeType';

export default function CheckboxOptions(props: {
  features: GPSFeaturesDTO
  theme: GPSInputTheme
  onToogle_Coordinate: (checked: boolean) => void
  onToogle_Altitude: (checked: boolean) => void
}) {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.Input.GPSInput[config.language], []);

  if (props.features.editMode === false) {
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
        value={props.features.enableCoordinate}
        onChange={(checked) => props.onToogle_Coordinate(checked)}
        theme={props.theme}
      />
      <Option
        title={R['Altitude']}
        value={props.features.enableAltitude}
        onChange={(checked) => props.onToogle_Altitude(checked)}
        theme={props.theme}
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

  function onChange(checked: boolean) {
    props.onChange(checked);
    ApticsService.vibrate('success');
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
        theme={props.theme}
      />
      <Text.H3
        style={{ color: props.value ? props.theme.confirm : props.theme.font }}
      >
        {props.title}
      </Text.H3>
    </View>
  );
}
