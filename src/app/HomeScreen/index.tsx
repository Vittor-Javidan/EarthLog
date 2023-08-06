import React, { useMemo } from 'react';
import { BackHandler, Alert } from 'react-native';
import * as Vibration from 'expo-haptics';
import { useBackPress } from '@Hooks/index';
import { Layout } from '@Layout/index';
import Drawer from './Drawer';
import ProjectButtons from './ProjectButtons';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';

export default function HomeScreen() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  useBackPress(async () => await exitMessage());

  async function exitMessage() {
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
    Alert.alert(
      stringResources['Hold on!'],
      stringResources['Want to exit?'],
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
            BackHandler.exitApp();
          },
        },
      ]
    );
  }

  return (
    <Layout.Root
      title="Earth Log"
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <ProjectButtons />
    </Layout.Root>
  );
}
