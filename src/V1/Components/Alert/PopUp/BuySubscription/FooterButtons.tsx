import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';

export const FooterButtons = memo((props: {
  showBuyButton: boolean
  showCancelButton: boolean
  onCancel: () => void
  buySubscription: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.buySubscription[config.language], []);

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 10,
      }}
    >
      {props.showCancelButton && (
        <Button.Icon
          iconName="close"
          onPress={() => props.onCancel()}
          theme={{
            font:              theme.wrong,
            font_active:       theme.wrong,
            background:        theme.background_Button,
            background_active: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      {props.showBuyButton && (
        <Button.TextWithIcon
          title={R['Buy']}
          iconName="wallet-sharp"
          onPress={() => props.buySubscription()}
          theme={{
            font:              theme.font,
            font_active:       theme.confirm,
            background:        theme.confirm,
            background_active: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 3,
            gap: 10,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
      )}
    </View>
  );
});
