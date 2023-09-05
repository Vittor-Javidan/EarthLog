import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import Checkbox from '@Components/Layout/Button/Checkbox';
import H3 from '@Components/Layout/Text/H3';

export default function CheckboxOptions(props: {
  features: GPSFeaturesDTO
  onToogle_Coordinate: (checked: boolean) => void
  onToogle_Altitude: (checked: boolean) => void
}) {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Input.GPSInput[language], []);
  const { editMode, enableCoordinate, enableAltitude } = props.features;

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
        title={stringResources['Coordinates']}
        value={enableCoordinate}
        onChange={(checked) => props.onToogle_Coordinate(checked)}
      />
      <Option
        title={stringResources['Altitude']}
        value={enableAltitude}
        onChange={(checked) => props.onToogle_Altitude(checked)}
      />
    </View>
  );
}

function Option(props: {
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
        style={{ color: props.value ? theme.confirm : theme.onBackground }}
      >
        {props.title}
      </H3>
    </View>
  );
}
