import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';
import CredentialService from '@Services/CredentialService';
import DatabaseService from '@Services/DatabaseService';
import CacheService from '@Services/CacheService';
import AlertService from '@Services/AlertService';

import { Button } from '@Button/index';

export const SettingsButtons = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.settings[config.language], []);

  return (
    <View
      style={{ gap: 1 }}
    >
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
        title={R['Credentials']}
        iconName="card-outline"
        onPress={() => navigate('CREDENTIAL SCOPE')}
        theme={{
          font: theme.font_Button,
          font_Pressed: theme.font_active,
          background: theme.background_Button,
          background_Pressed: theme.background_active,
        }}
      />
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
    </View>
  );
});

async function whipeAllData() {
  AlertService.handleAlert(true,
    {
      question: 'Want to whipe database?',
      type: 'warning',
    },
    async () => {
      HapticsService.vibrate('success');
      await CredentialService.deleteCredentialsFolder();
      await DatabaseService.deleteDatabaseFolder();
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
