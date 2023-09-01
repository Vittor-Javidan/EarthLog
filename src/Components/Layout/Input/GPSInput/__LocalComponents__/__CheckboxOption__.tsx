import React, { useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

import Checkbox from '@Components/Layout/Button/Checkbox';
import H3 from '@Components/Layout/Text/H3';

export default function __CheckboxOption__(props: {
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
