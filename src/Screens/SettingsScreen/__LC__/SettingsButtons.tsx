import React, { memo, useMemo } from 'react';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';
import CacheService from '@Services/CacheService';
import AlertService from '@Services/AlertService';

import { Button } from '@Button/index';
import { FOLDER_App } from '@Services/FileSystemService';

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
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Date and time']}
      iconName="time"
      onPress={() => navigate('TIME AND DATE SCOPE')}
      theme={{
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Themes']}
      iconName="color-palette"
      onPress={() => navigate('THEME SCOPE')}
      theme={{
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Vibration']}
      iconName="alert-circle"
      onPress={() => navigate('VIBRATION OPTIONS SCOPE')}
      theme={{
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />


    {/* TODO: This must be removed before production release */}
    <Button.TextWithIcon
      title={'Whipe All Data'}
      iconName="trash-outline"
      onPress={async () => await whipeAllData()}
      theme={{
        font: theme.background,
        background: theme.wrong,
        font_Pressed: theme.wrong,
        background_Pressed: theme.background_active,
      }}
    />


  </>);
});

async function whipeAllData() {

  /* TODO:
    - This must be removed before production release.
  */

  AlertService.handleAlert(true,
    {
      question: 'Want to whipe database?',
      type: 'warning',
    },
    async () => {
      HapticsService.vibrate('success');
      await FOLDER_App.deleteFolder();
      await CacheService.deleteLastOpenProject();
      CacheService.lastOpenProject = {
        id_project: '',
        status: 'new',
        name: '',
        rules: {},
        sampleAlias: {
          plural: '',
          singular: '',
        },
      };
      CacheService.allProjects = [];
      CacheService.allWidgets_Project = [];
      CacheService.allWidgets_Template = [];
      CacheService.allSamples = [];
      CacheService.allWidgets_Sample = [];
      navigate('RESTART APP');
    }
  );
}
