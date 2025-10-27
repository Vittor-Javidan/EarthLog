import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { CredentialService } from '@V1/Services/CredentialService';
import { HapticsService } from '@V1/Services/HapticsService';
import { ConfigService } from '@V1/Services/ConfigService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';
import { CacheService } from '@V1/Services/CacheService';

import { Layout } from '@V1/Layout/index';
import { HomeScreen } from '@V1/Screens/HomeScreen';

import NavigationTree from './NavigationTree';
import Drawer from './Drawer';

export default function HomeScope() {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.home[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  const exitMessage = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
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
      subtitle="LTS V1"
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
