import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
import { BackHandler } from 'react-native';

import { Loading } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';
import SyncService from '@Services/SyncService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { HomeScreen } from '@Screens/HomeScreen';

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
      <HomeScreen
        homeScopeState={state}
      />
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
      title={R['Settings']}
      iconName="settings"
      theme={{
        font: theme.font,
        background: theme.background,
        font_Pressed: theme.font_active,
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
    CacheService.loadAllCredentials(),
    SyncService.loadAllSyncData(),
  ];
  await Promise.all(promises);
  whenLoaded();
}
