import React, { useMemo, ReactNode } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';

export default function DataDisplay(props: {
  children: ReactNode
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <View
      style={{
        backgroundColor: theme.secondary,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}
    >
      {props.children}
    </View>
  );
}
