import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
import { BackHandler } from 'react-native';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import CredentialService from '@V1/Services/CredentialService';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import AlertService from '@V1/Services/AlertService';
import CacheService from '@V1/Services/CacheService';
import ThemeService from '@V1/Services/ThemeService';
import SyncService from '@V1/Services/SyncService';

import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';
import { HomeScreen } from '@V1/Screens/HomeScreen';

export default function HomeScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.home[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useEffect(() => {
    fetchProject(() => setState('Loaded'));
  }, []);

  useBackPress(async () => {
    await exitMessage();
    HapticsService.vibrate('warning');
  }, []);

  const exitMessage = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'exit app',
    }, () => BackHandler.exitApp());
  }, []);

  return (
    <Layout.Root
      title={R['Home screen']}
      subtitle=""
      drawerChildren={ <Drawer /> }
      navigationTree={ <NavigationTree /> }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <HomeScreen />
      )}
    </Layout.Root>
  );
}

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => {}}
        />,
      ]}
    />
  );
});

const Drawer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.home[config.language], []);

  return (<>
    <Button.TextWithIcon
      title={R['Credentials']}
      iconName="card-outline"
      onPress={() => navigate('CREDENTIAL SCOPE')}
      theme={{
        font: theme.font,
        font_Pressed: theme.font_active,
        background: theme.background,
        background_Pressed: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Settings']}
      iconName="settings"
      theme={{
        font: theme.font,
        font_Pressed: theme.font_active,
        background: theme.background,
        background_Pressed: theme.background_active,
      }}
      onPress={() => navigate('SETTINGS SCOPE')}
    />
  </>);
});

async function fetchProject(whenLoaded: () => void) {
  await CacheService.loadAllProjectsSettings();
  const promises = [
    CacheService.loadLastOpenProject(),
    CredentialService.loadAllCredentials(),
    SyncService.loadAllSyncData(),
  ];
  await Promise.all(promises);
  whenLoaded();
}
