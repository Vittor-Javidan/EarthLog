import React, { useMemo, ReactNode } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

export default function DataDisplay(props: {
  children: ReactNode
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

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
