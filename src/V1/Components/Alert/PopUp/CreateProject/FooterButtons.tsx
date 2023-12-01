import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';

export const FooterButtons = memo((props: {
  isNameEmpty: boolean
  showButtons: boolean
  onCancel: () => void
  onConfirm: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  return props.showButtons ? (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 10,
      }}
    >
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
      <Button.Icon
        iconName={props.isNameEmpty ? 'lock-closed-sharp' : 'checkmark-done-sharp'}
        onPress={() => props.onConfirm()}
        theme={{
          font:              theme.font,
          font_active:       theme.confirm,
          background:        theme.confirm,
          background_active: theme.background_active,
        }}
        style={{
          height: 40,
          flex: 1,
          justifyContent: 'center',
          paddingVertical: 5,
          borderRadius: 10,
        }}
      />
    </View>
  ) : <></>;
});
