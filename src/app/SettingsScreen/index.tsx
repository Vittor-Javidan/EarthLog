
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
  const R = useMemo(() => translations.Screens.SettingsScreen[language], []);

  useBackPress(() => navigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={R['Settings']}
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
          title={R['Language']}
          iconName="language"
          iconSide="Right"
          onPress={() => navigate('LANGUAGES SCREEN')}
        />
        <Layout.Button.TextWithIcon
          title={R['Theme']}
          iconName="color-palette"
          iconSide="Right"
          onPress={() => navigate('THEME SCREEN')}
        />
        <Layout.Button.TextWithIcon
          title={R['Whipe Database']}
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

  const R = translations.Screens.SettingsScreen[ConfigService.config.language];
  await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);

  Alert.alert(
    R['Hold on!'],
    R['Want to whipe database?'],
    [
      {
        text: R['NO'],
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
          return null;
        },
        style: 'cancel',
      },
      {
        text: R['YES'],
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
