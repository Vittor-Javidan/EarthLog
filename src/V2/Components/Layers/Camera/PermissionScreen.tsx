
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { PermissionResponse } from 'expo-camera';

import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';
import { Button } from '@V2/Button/index';

export const PermissionScreen = memo((props: {
  permission: PermissionResponse
  onRequestPermission: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.component.camera[config.language], []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        padding: 50,
        gap: 10,
      }}
    >
      <Text h1
        style={{
          color: theme.font,
          textAlign: 'center',
        }}
      >
        {R['Camera permission denied']}
      </Text>
      {props.permission.canAskAgain ? (
        <Button.TextWithIcon
          title={R['Grant permission']}
          iconName="camera"
          onPress={async () => await props.onRequestPermission()}
          theme={{
            font:              theme.font_Button,
            font_active:       theme.font_active,
            background:        theme.background_Button,
            background_active: theme.background_active,
          }}
          style={{
            borderRadius: 10,
          }}
        />
      ) : (
        <Text h1
          style={{
            color: theme.font,
          }}
        >
          {R['Please give camera access permission on your phone settings']}
        </Text>
      )}
    </View>
  );
});
