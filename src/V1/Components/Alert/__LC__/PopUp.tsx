import React, { memo, ReactNode, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

export const PopUp = memo((props: {
  children: ReactNode
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  return (
    <View
      style={{
        width: '100%',
        maxHeight: '95%',
        backgroundColor: theme.background,
        borderRadius: 10,
        paddingVertical: 10,
        gap: 20,
      }}
    >
      {props.children}
    </View>
  );
});
