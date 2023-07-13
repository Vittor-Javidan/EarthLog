import React, { useMemo, useState } from 'react';
import { View, Text, Switch } from 'react-native';

import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';

export default function BooleanWidget(props: {
  label: string
  onBooleanChange: (boolean: boolean) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const [value, setValue] = useState<boolean>(false);

  function onChange(boolean: boolean) {
    setValue(boolean);
    props.onBooleanChange(boolean);
  }

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.primary,
        paddingHorizontal: 5,
        borderColor: theme.secondary,
        borderWidth: 1,
        height: 50,
      }}
    >
      <Text
        style={{
          width: '50%',
          paddingHorizontal: 5,
        }}
      >
        {props.label}
      </Text>
      <Switch
        style={{
          width: '50%',
          paddingHorizontal: 10,
        }}
        trackColor={{ false: theme.wrong, true: theme.confirm }}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
}
