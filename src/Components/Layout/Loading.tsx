import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';

import ConfigService from '@Services/ConfigService';

import View from './View';

export default function Loading(): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        size="large"
        color={theme.onBackground}
      />
    </View>
  );
}
