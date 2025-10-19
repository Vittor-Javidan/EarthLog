import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';

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
          font:              theme.font,
          font_active:       theme.wrong,
          background:        theme.wrong,
          background_active: theme.background_active,
        }}
        iconSize={30}
        style={{
          flex: 1,
          height: 40,
          justifyContent: 'center',
          paddingVertical: 0,
          borderRadius: 10,
        }}
      />
    </View>
  );
});
