import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import ConfigService from '@Services/ConfigService';

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
