import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Animation } from '@V2/Animation/index';
import { Button } from '@V2/Button/index';
import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';

export const VibrationOptionsScreen = memo(() => {

  const config                          = useMemo(() => ConfigService.config, []);
  const theme                           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
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
            title={R['Only warnings']}
            iconName="alert-circle"
            theme={{
              font:              onlyWarnings === true ? theme.font_confirm         : theme.font,
              font_active:       onlyWarnings === true ? theme.background_confirm   : theme.font_active,
              background:        onlyWarnings === true ? theme.background_confirm   : theme.background,
              background_active: onlyWarnings === true ? theme.font_confirm         : theme.background_active,
            }}
            onPress={() => onOptionSelected(true)}
          />
          <Button.TextWithIcon
            title={R['All Clicks']}
            iconName="alert-circle"
            theme={{
              font:              onlyWarnings === false ? theme.font_confirm        : theme.font,
              font_active:       onlyWarnings === false ? theme.background_confirm  : theme.font_active,
              background:        onlyWarnings === false ? theme.background_confirm  : theme.background,
              background_active: onlyWarnings === false ? theme.font_confirm        : theme.background_active,
            }}
            onPress={() => onOptionSelected(false)}
          />
        </View>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
