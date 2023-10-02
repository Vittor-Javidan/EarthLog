
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';
import AlertService from '@Services/AlertService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import CredentialService from '@Services/CredentialService';

export default function SettingsScreen(): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.settingsScreen[config.language], []);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <View
        style={{ gap: 1 }}
      >
        <Button.TextWithIcon
          title={R['Language']}
          iconName="language"
          iconSide="Right"
          onPress={() => navigate('LANGUAGE SELECTION SCOPE')}
          theme={{
            font: theme.font_Button,
            font_Pressed: theme.font,
            background: theme.background_Button,
            background_Pressed: theme.background,
          }}
        />
        <Button.TextWithIcon
          title={R['Credentials']}
          iconName="card-outline"
          iconSide="Right"
          onPress={() => navigate('CREDENTIAL SCOPE')}
          theme={{
            font: theme.font_Button,
            font_Pressed: theme.font,
            background: theme.background_Button,
            background_Pressed: theme.background,
          }}
        />
        <Button.TextWithIcon
          title={'Whipe All Data'}
          iconName="trash-outline"
          iconSide="Right"
          onPress={async () => await whipeAllData()}
          theme={{
            font: theme.background,
            background: theme.wrong,
            font_Pressed: theme.wrong,
            background_Pressed: theme.background,
          }}
        />
      </View>
    </Layout.Screen>
  );
}

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
