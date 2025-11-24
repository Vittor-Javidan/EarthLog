import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';
import { BackHandler } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import {
  Loading
} from '@V2/Types';

import { Scope } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { CredentialService } from '@V2/Services/CredentialService';
import { HapticsService } from '@V2/Services/HapticsService';
import { ConfigService } from '@V2/Services/ConfigService';
import { CacheService } from '@V2/Services/CacheService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';
import { MapAPI } from '@V2/Layers/API/Map';

import { Layout } from '@V2/Layout/index';
import { Screen_Home } from './Screen_Home';
import { NavigationTree } from './NavigationTree';
import { Drawer } from './Drawer';

export const HomeScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.home[config.language], []);
  const [state     , setState     ] = useState<Loading>('Loading');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onMenuButtonPress = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);

  const exitMessage = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'exit app',
    }, () => BackHandler.exitApp());
  }, []);

  useBackPress(async () => {
    switch (true) {
      case MapAPI.isMapOpen: MapAPI.toggleMap(); break;
      case showDrawer: setShowDrawer(false); break;
      default: {
        await exitMessage();
        HapticsService.vibrate('warning');
      }
    }
  }, [MapAPI.isMapOpen, showDrawer]);

  useEffect(() => {
    fetchProject(() => {
      setState('Loaded');
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <Layout.Root
      title={R['Home screen']}
      subtitle="Beta"
      showDrawer={showDrawer}
      onMenuButtonPress={onMenuButtonPress}
      navigationTree={<NavigationTree />}
      drawerChildren={
        <Drawer
          onExportedFilesPress={() => props.onScopeChange({ scope: 'EXPORTED FILES SCOPE'})}
          onCredentialsPress={() => props.onScopeChange({ scope: 'CREDENTIAL SCOPE' })}
          onSettingsPress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
          onFileExplorerPress={() => props.onScopeChange({ scope: 'FILE EXPLORE SCOPE' })}
          onChangeVersionPress={() => props.onScopeChange({ scope: 'VERSION CHANGE SCOPE' })}
          onSubscriptionsPress={() => props.onScopeChange({ scope: 'SUBSCRIPTIONS SCOPE' })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_Home
          onScreenButton_Project={(id_project) => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
        />
      )}
    </Layout.Root>
  );
});

async function fetchProject(whenLoaded: () => void) {
  await CacheService.loadAllProjectsSettings();
  const promises = [
    CacheService.loadLastOpenProject(),
    CacheService.loadAllSyncData(),
    CredentialService.loadAllCredentials(),
  ];
  await Promise.all(promises);
  MapAPI.changeScope({ type: 'navigation' });
  whenLoaded();
}
