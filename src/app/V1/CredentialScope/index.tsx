import React, { memo, useEffect, useMemo, useState } from 'react';
import { Linking } from 'react-native';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import CredentialService from '@V1/Services/CredentialService';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';
import { CredentialSelectionScreen } from '@V1/Screens/CredentialScreen';

export default function LanguageSelectionScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.credential[config.language], []);

  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => navigate('HOME SCOPE'), []);
  useEffect(() => {
    fetchCredentials(() => setState('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={R['Credentials']}
      subtitle=""
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <CredentialSelectionScreen />
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
          iconName="home-outline"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="card"
          onPress={() => {}}
        />,
      ]}
    />
  );
});

const Drawer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.credential[config.language], []);

  return (<>
    <Button.TextWithIcon
      title={R['Create a server']}
      iconName="server"
      onPress={() => Linking.openURL('https://github.com/Vittor-Javidan/EarthLogServerExample')}
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
    />
  </>);
});

async function fetchCredentials(
  whenLoaded: () => void
) {
  await CredentialService.loadAllCredentials();
  whenLoaded();
}
