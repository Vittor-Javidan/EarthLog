import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { Loading } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import CredentialService from '@V2/Services/CredentialService';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import AlertService from '@V2/Services/AlertService';
import CacheService from '@V2/Services/CacheService';

import { Layout } from '@V2/Layout/index';
import { HomeScreen } from '@V2/Screens/HomeScreen';
import { NavigationTree } from './NavigationTree';
import { Drawer } from './Drawer';

export default function HomeScope() {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.home[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  const exitMessage = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'exit app',
    }, () => BackHandler.exitApp());
  }, []);

  useEffect(() => {
    fetchProject(() => {
      setState('Loaded');
      SplashScreen.hideAsync();
    });
  }, []);

  useBackPress(async () => {
    await exitMessage();
    HapticsService.vibrate('warning');
  }, []);

  return (
    <Layout.Root
      title={R['Home screen']}
      subtitle="Beta"
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <HomeScreen />
      )}
    </Layout.Root>
  );
}

async function fetchProject(whenLoaded: () => void) {
  await CacheService.loadAllProjectsSettings();
  const promises = [
    CacheService.loadLastOpenProject(),
    CacheService.loadAllSyncData(),
    CredentialService.loadAllCredentials(),
  ];
  await Promise.all(promises);
  whenLoaded();
}
