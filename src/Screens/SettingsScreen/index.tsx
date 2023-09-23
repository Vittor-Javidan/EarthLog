
import React, { useMemo } from 'react';
import { Alert, View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';

export default function SettingsScreen(): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.Screens.SettingsScreen[config.language], []);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <View
        style={{
          gap: 1,
        }}
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
          title={R['Whipe Database']}
          iconName="trash-outline"
          iconSide="Right"
          onPress={async () => await whipeDataBase()}
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
        },
      },
    ]
  );
}
