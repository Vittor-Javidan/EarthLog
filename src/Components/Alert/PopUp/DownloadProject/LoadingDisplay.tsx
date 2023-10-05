import React, { memo, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import { Text } from '@Text/index';

export const LoadingDisplay = memo((props: {
  showDisplay: boolean
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  return props.showDisplay ? (<>
    <Text h3
      style={{
        paddingHorizontal: 10,
        alignSelf: 'center',
      }}
    >
      {'Connecting...'}
    </Text>
    <ActivityIndicator
      size="large"
      color={theme.font}
    />
  </>) : <></>;
});
