import React, { useState, useMemo, useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import * as Vibration from 'expo-haptics';

import { Layout } from '@Layout/index';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import Drawer from './Drawer';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import LastProjectButton from './LocalComponents/LastProjectButton';
import ProjectButtons from './LocalComponents/ProjectButtons';

export default function HomeScreen() {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);
  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => {
    fetchProject(() => setState('Loaded'));
  }, []);

  useBackPress(async () => {
    await exitMessage();
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  });

  async function exitMessage() {
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
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView
          contenContainerStyle={{
            paddingTop: 10,
            padding: 5,
            gap: 10,
          }}
        >
          <LastProjectButton />
          <ProjectButtons />
        </Layout.ScrollView>
      )}
    </Layout.Root>
  );
}

async function fetchProject(whenLoaded: () => void) {
  await ProjectService.loadAllProjectsSettings();
  await ProjectService.loadLastOpenProject();
  whenLoaded();
}
