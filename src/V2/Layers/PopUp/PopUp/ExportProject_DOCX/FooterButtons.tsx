import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Button } from '@V2/Button/index';

export const FooterButtons = memo((props: {
  showConfirmButton: boolean
  showCancelButton: boolean
  isNameEmpty: boolean
  showConfirmErrorButton: boolean
  onCancel: () => void
  onConfirm: () => void
  onConfirmError: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 10,
      }}
    >
      {props.showConfirmErrorButton && (<>
        <Button.Icon
          iconName={'checkmark-done-sharp'}
          onPress={() => props.onConfirmError()}
          theme={{
            font:              theme.font,
            font_active:       theme.font_active,
            background:        theme.background_Button,
            background_active: theme.background_active,
          }}
          iconSize={25}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
      </>)}
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
          iconSize={30}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      {props.showConfirmButton && (
        <Button.Icon
          iconName={props.isNameEmpty ? 'lock-closed-sharp' : 'checkmark-done-sharp'}
          onPress={() => props.onConfirm()}
          theme={{
            font:              theme.font,
            font_active:       theme.confirm,
            background:        theme.confirm,
            background_active: theme.background_active,
          }}
          iconSize={25}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
      )}
    </View>
  );
});
