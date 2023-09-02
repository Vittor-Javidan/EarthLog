import React, { useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

import Checkbox from '@Components/Layout/Button/Checkbox';
import H3 from '@Components/Layout/Text/H3';

export default function CheckboxOptions(props: {
  gpsON: boolean
  editMode: boolean
  enableCoordinate: boolean
  enableAltitude: boolean
  onToogle_Coordinate: (checked: boolean) => void
  onToogle_Altitude: (checked: boolean) => void
}) {

  if (props.editMode === false) {
    return <></>;
  }

  return (
    <View
      style={{
        gap: 5,
      }}
    >
      <Option
        title="Coordinate"
        value={props.enableCoordinate}
        onChange={(checked) => props.onToogle_Coordinate(checked)}
      />
      <Option
        title="Altitude"
        value={props.enableAltitude}
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
