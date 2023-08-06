import React, { useMemo, ReactNode } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Types/index';

export default function DataDisplay(props: {
  children: ReactNode
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <View
      style={{
        backgroundColor: theme.tertiary,
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      {props.children}
    </View>
  );
}
