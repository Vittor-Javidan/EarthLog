import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { translations } from '@Translations/index';

export const VibrationOptionsScreen = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.vibrationOptions[config.language], []);
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
        delay={200}
        duration={200}
      >
        <View
          style={{ gap: 1 }}
        >
          <Button.TextWithIcon
            title={R['Default']}
            iconName="alert-circle"
            theme={{
              font:               onlyWarnings === false ? theme.background : theme.font_Button,
              font_Pressed:       onlyWarnings === false ? theme.confirm    : theme.font_active,
              background:         onlyWarnings === false ? theme.confirm    : theme.background_Button,
              background_Pressed: onlyWarnings === false ? theme.background : theme.background_active,
            }}
            onPress={() => onOptionSelected(false)}
          />
          <Button.TextWithIcon
            title={R['Only warnings']}
            iconName="alert-circle"
            theme={{
              font:               onlyWarnings === true ? theme.background : theme.font_Button,
              font_Pressed:       onlyWarnings === true ? theme.confirm    : theme.font_active,
              background:         onlyWarnings === true ? theme.confirm    : theme.background_Button,
              background_Pressed: onlyWarnings === true ? theme.background : theme.background_active,
            }}
            onPress={() => onOptionSelected(true)}
          />
        </View>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
