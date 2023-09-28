import React, { useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { GPSInputTheme } from './ThemeType';

export const CheckboxOptions = memo((props: {
  features: GPSFeaturesDTO
  theme: GPSInputTheme
  onToogle_Coordinate: (checked: boolean) => void
  onToogle_Altitude: (checked: boolean) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.gpsInput[config.language], []);

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
});

const Option = memo((props: {
  title: string
  value: boolean
  theme: GPSInputTheme
  onChange: (checked: boolean) => void
}) => {

  const onChange = useCallback((checked: boolean) => {
    props.onChange(checked);
    HapticsService.vibrate('success');
  }, [props.onChange]);

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
        onChange={(checked) => onChange(checked)}
        theme={props.theme}
      />
      <Text h3
        style={{ color: props.value ? props.theme.confirm : props.theme.font }}
      >
        {props.title}
      </Text>
    </View>
  );
});
