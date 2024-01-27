import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Animation } from '@V1/Animation/index';
import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';

export const VibrationOptionsScreen = memo(() => {

  const config                          = useMemo(() => ConfigService.config, []);
  const theme                           = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R                               = useMemo(() => translations.screen.vibrationOptions[config.language], []);
  const [onlyWarnings, setOnlyWarnings] = useState<boolean>(config.onlyWarningVibrations);

  const onOptionSelected = useCallback(async (enableOnlyWarnings: boolean) => {
    ConfigService.config.onlyWarningVibrations = enableOnlyWarnings;
    await ConfigService.saveConfig();
    setOnlyWarnings(enableOnlyWarnings);
  }, [onlyWarnings]);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <View
          style={{ gap: 1 }}
        >
          <Button.TextWithIcon
            title={R['Default']}
            iconName="alert-circle"
            theme={{
              font:              onlyWarnings === false ? theme.background : theme.font_Button,
              font_active:       onlyWarnings === false ? theme.confirm    : theme.font_active,
              background:        onlyWarnings === false ? theme.confirm    : theme.background_Button,
              background_active: onlyWarnings === false ? theme.background : theme.background_active,
            }}
            onPress={() => onOptionSelected(false)}
          />
          <Button.TextWithIcon
            title={R['Only warnings']}
            iconName="alert-circle"
            theme={{
              font:              onlyWarnings === true ? theme.background : theme.font_Button,
              font_active:       onlyWarnings === true ? theme.confirm    : theme.font_active,
              background:        onlyWarnings === true ? theme.confirm    : theme.background_Button,
              background_active: onlyWarnings === true ? theme.background : theme.background_active,
            }}
            onPress={() => onOptionSelected(true)}
          />
        </View>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
