
import React, { useMemo } from 'react';
import { Alert, View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';

export default function SettingsScreen(): JSX.Element {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.SettingsScreen[language], []);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <View
        style={{
          paddingTop: 1,
          gap: 1,
        }}
      >
        <Button.TextWithIcon
          title={R['Language']}
          iconName="language"
          iconSide="Right"
          onPress={() => navigate('LANGUAGE SELECTION SCOPE')}
          theme={{
            font: theme.onSecondary,
            font_Pressed: theme.secondary,
            background: theme.secondary,
            background_Pressed: theme.onSecondary,
          }}
        />
        <Button.TextWithIcon
          title={R['Whipe Database']}
          iconName="trash-outline"
          iconSide="Right"
          onPress={async () => await whipeDataBase()}
          theme={{
            font: theme.onWrong,
            font_Pressed: theme.wrong,
            background: theme.wrong,
            background_Pressed: theme.onWrong,
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
