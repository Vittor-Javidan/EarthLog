import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';
import { BackHandler } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { Scope } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { CredentialService } from '@V1/Services/CredentialService';
import { HapticsService } from '@V1/Services/HapticsService';
import { ConfigService } from '@V1/Services/ConfigService';
import { CacheService } from '@V1/Services/CacheService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { Layout } from '@V1/Layout/index';
import { Screen_Home } from './Screen_Home';
import { NavigationTree } from './NavigationTree';
import { Drawer } from './Drawer';

export const HomeScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

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
      navigationTree={<NavigationTree />}
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
  whenLoaded();
}
