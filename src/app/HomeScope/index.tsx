import React, { useState, useMemo, useEffect } from 'react';
import { BackHandler } from 'react-native';
import * as Vibration from 'expo-haptics';

import { Loading } from '@Types/otherTypes';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import HomeScreen from '@Screens/HomeScreen';

export default function HomeScope() {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(async () => {
    await exitMessage();
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  });

  useEffect(() => {
    fetchProject(() => setState('Loaded'));
  }, []);

  async function exitMessage() {
    await AlertService.handleAlert(true, {
      question: R['Want to exit?'],
      type: 'exit app',
    }, () => BackHandler.exitApp());
  }

  return (
    <Layout.Root
      title={R['Home screen']}
      drawerChildren={ <Drawer /> }
      navigationTree={ <NavigationTree /> }
    >
      <HomeScreen
        homeScopeState={state}
      />
    </Layout.Root>
  );
}

function NavigationTree() {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
        />,
      ]}
    />
  );
}

function Drawer() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);

  return (
    <Button.TextWithIcon
      title={R['Settings']}
      iconName="settings"
      iconSide="Right"
      theme={{
        font: theme.onTertiary,
        font_Pressed: theme.tertiary,
        background: theme.tertiary,
        background_Pressed: theme.onTertiary,
      }}
      onPress={() => navigate('SETTINGS SCOPE')}
    />
  );
}

async function fetchProject(whenLoaded: () => void) {
  await CacheService.loadAllProjectsSettings();
  await CacheService.loadLastOpenProject();
  whenLoaded();
}
