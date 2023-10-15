import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';

export const FooterButtons = memo((props: {
  onCancel: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
        gap: 10,
      }}
    >
      <Button.Icon
        iconName="close"
        onPress={() => props.onCancel()}
        theme={{
          font: theme.font,
          font_Pressed: theme.wrong,
          background: theme.wrong,
          background_Pressed: theme.background_active,
        }}
        style={{
          flex: 0.5,
          height: 40,
          justifyContent: 'center',
          paddingVertical: 0,
          borderRadius: 10,
        }}
      />
    </View>
  );
});
