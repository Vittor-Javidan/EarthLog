import React, { useState, memo, useMemo, useCallback } from 'react';

import SubscriptionManager, { useAppStoreConnection } from '@SubscriptionManager';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Layout } from '@V1/Layout/index';
import { Button } from '@V1/Button/index';
import { IAPScreen } from '@V1/Screens/IAPScreen';

export default function IAPScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.iap[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => navigate('HOME SCOPE'), []);

  useAppStoreConnection({
    onFinish: () => {
      setState('Loaded');
    },
    onError: (errorMessage) => {
      alert(errorMessage);
      navigate('HOME SCOPE');
    },
  }, []);

  return (
    <Layout.Root
      title={R['Premium subscription']}
      subtitle=""
      drawerChildren={ <Drawer /> }
      navigationTree={ <NavigationTree /> }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <IAPScreen />
      )}
    </Layout.Root>
  );
}

const NavigationTree = memo(() => (
  <Layout.NavigationTree.Root
    iconButtons={[
      <Layout.NavigationTree.Button
        key="treeIcon_1"
        iconName="home"
        onPress={() => {}}
      />,
    ]}
  />
));

const Drawer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.iap[config.language], []);

  const restoreSubscription = useCallback(async () => {
    await SubscriptionManager.restoreSubscription({
      onFinish: () => navigate('HOME SCOPE'),
      onError: (errorMessage) => alert(errorMessage),
    });
  }, []);

  return (<>
    {SubscriptionManager.getPlan() === 'Free' && (
      <Button.TextWithIcon
        title={R['Restore subscription']}
        iconName="refresh"
        onPress={async () => await restoreSubscription()}
        theme={{
          font:              theme.font,
          font_active:       theme.font_active,
          background:        theme.background,
          background_active: theme.background_active,
        }}
      />
    )}
  </>);
});
