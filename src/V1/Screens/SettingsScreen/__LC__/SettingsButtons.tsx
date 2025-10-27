import React, { memo, useMemo } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { FOLDER_App } from '@V1/Services_Files/AppFolders';
import { HapticsService } from '@V1/Services/HapticsService';
import { ConfigService } from '@V1/Services/ConfigService';
import { CacheService } from '@V1/Services/CacheService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { Button } from '@V1/Button/index';

export const SettingsButtons = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.settings[config.language], []);

  return (<>
    <Button.TextWithIcon
      title={R['Language']}
      iconName="language"
      onPress={() => navigate('LANGUAGE SELECTION SCOPE')}
      theme={{
        font:              theme.font_Button,
        font_active:       theme.font_active,
        background:        theme.background_Button,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Date and time']}
      iconName="time"
      onPress={() => navigate('TIME AND DATE SCOPE')}
      theme={{
        font:              theme.font_Button,
        font_active:       theme.font_active,
        background:        theme.background_Button,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Themes']}
      iconName="color-palette"
      onPress={() => navigate('THEME SCOPE')}
      theme={{
        font:              theme.font_Button,
        font_active:       theme.font_active,
        background:        theme.background_Button,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Vibration']}
      iconName="alert-circle"
      onPress={() => navigate('VIBRATION OPTIONS SCOPE')}
      theme={{
        font:              theme.font_Button,
        font_active:       theme.font_active,
        background:        theme.background_Button,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Whipe ALL DATA']}
      iconName="trash-outline"
      onPress={async () => await whipeAllData()}
      theme={{
        font:              theme.background,
        background:        theme.wrong,
        font_active:       theme.wrong,
        background_active: theme.background_active,
      }}
    />
  </>);
});

async function whipeAllData() {
  await PopUpAPI.handleAlert(true,
    {
      question: 'Want to whipe database?',
      type: 'warning',
    },
    async () => {
      HapticsService.vibrate('success');
      await FOLDER_App.deleteFolder();
      await CacheService.deleteLastOpenProject();
      CacheService.resetCache();
      navigate('RESTART APP');
    }
  );
}
