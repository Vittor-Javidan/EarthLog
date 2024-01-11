import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
import { BackHandler, Linking } from 'react-native';

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

import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';
import { HomeScreen } from '@V1/Screens/HomeScreen';
import SubscriptionManager from '@SubscriptionManager';

export default function HomeScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.home[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  const exitMessage = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'exit app',
    }, () => BackHandler.exitApp());
  }, []);

  useEffect(() => {
    fetchProject(() => setState('Loaded'));
  }, []);

  useBackPress(async () => {
    await exitMessage();
    HapticsService.vibrate('warning');
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
          onPress={() => navigate('RESTART APP')}
        />,
      ]}
    />
  );
});

const Drawer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.home[config.language], []);

  const buySubscription = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'Buy Subscription',
      message: R['Premium subscription'],
    }, () => {});
  }, []);

  return (<>
    {SubscriptionManager.getPlan() === 'Free' && (
      <Button.TextWithIcon
        title={R['Premium']}
        iconName="wallet-outline"
        onPress={async () => await buySubscription()}
        theme={{
          font:              theme.font,
          font_active:       theme.font_active,
          background:        theme.background,
          background_active: theme.background_active,
        }}
      />
    )}
    <Button.TextWithIcon
      title={R['Credentials']}
      iconName="card-outline"
      onPress={() => navigate('CREDENTIAL SCOPE')}
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Settings']}
      iconName="settings-outline"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => navigate('SETTINGS SCOPE')}
    />
    <Button.TextWithIcon
      title={R['Privacy Policy']}
      iconName="shield-outline"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => Linking.openURL('https://github.com/Vittor-Javidan/PRIVACY_POLICIES/blob/main/EARTH_LOG.md')}
    />
  </>);
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
