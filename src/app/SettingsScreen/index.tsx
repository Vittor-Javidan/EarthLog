
import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import * as Vibration from 'expo-haptics';

import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';
import CacheService from '@Services/CacheService';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';

export default function SettingsScreen(): JSX.Element {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SettingsScreen[language], []);

  useBackPress(() => navigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={stringResources['Settings']}
      drawerChildren={<></>}
      screenButtons={<TC.ScreenButtons />}
      navigationTree={<TC.NavigationTree />}
    >
      <Layout.View
        style={{
          paddingTop: 1,
          gap: 1,
        }}
      >
        <Layout.Button.TextWithIcon
          title={stringResources['Language']}
          iconName="language"
          iconSide="Right"
          onPress={() => navigate('LANGUAGES SCREEN')}
        />
        <Layout.Button.TextWithIcon
          title={stringResources['Theme']}
          iconName="color-palette"
          iconSide="Right"
          onPress={() => navigate('THEME SCREEN')}
        />
        <Layout.Button.TextWithIcon
          title={stringResources['Whipe Database']}
          iconName="trash-outline"
          iconSide="Right"
          color_background={theme.wrong}
          color_font={theme.onWrong}
          onPress={async () => await whipeDataBase()}
        />
      </Layout.View>
    </Layout.Root>
  );
}

async function whipeDataBase() {

  const stringResources = translations.Screens.SettingsScreen[ConfigService.config.language];
  await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);

  Alert.alert(
    stringResources['Hold on!'],
    stringResources['Want to whipe database?'],
    [
      {
        text: stringResources['NO'],
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
          return null;
        },
        style: 'cancel',
      },
      {
        text: stringResources['YES'],
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
          await DatabaseService.deleteDatabase();
          await CacheService.deleteLastOpenProject();
          CacheService.lastOpenProject = {
            id_project: '',
            name: '',
            rules: {},
          };
          CacheService.allProjects = [];
          CacheService.allWidgets_Project = [];
          CacheService.allWidgets_Template = [];
          CacheService.allSamples = [];
          CacheService.allWidgets_Sample = [];
          navigate('RESTART APP');
        },
      },
    ]
  );
}
