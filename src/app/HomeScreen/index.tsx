import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import { BackHandler, Alert, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import * as Vibration from 'expo-haptics';

import { Layout } from '@Layout/index';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

import { LC } from './__LC__';
import { TC } from './__TC__';

export default function HomeScreen() {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);
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
      R['Hold on!'],
      R['Want to exit?'],
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
            BackHandler.exitApp();
          },
        },
      ]
    );
  }

  return (
    <Layout.Root
      title={R['Home screen']}
      drawerChildren={<TC.Drawer />}
      navigationTree={<TC.NavigationTree />}
      screenButtons={<TC.ScreenButtons />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView>
          <Animation>
            <LC.LastProjectButton />
            <LC.ProjectButtons />
          </Animation>
        </Layout.ScrollView>
      )}
    </Layout.Root>
  );
}

async function fetchProject(whenLoaded: () => void) {
  await CacheService.loadAllProjectsSettings();
  await CacheService.loadLastOpenProject();
  whenLoaded();
}

function Animation(props: { children: ReactNode}) {

  const { height } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        paddingTop: 10,
        padding: 5,
        gap: 10,
      }}
      from={{ top: 2 * height }}
      transition={{
        type: 'spring',
        duration: 500,
      }}
      animate={{
        top: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
