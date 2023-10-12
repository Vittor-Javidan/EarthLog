import React, { memo, useEffect, useMemo, useState } from 'react';

import { Loading } from '@Types/AppTypes';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import { useBackPress } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { CredentialSelectionScreen } from '@Screens/CredentialScreen';
import CacheService from '@Services/CacheService';

export default function LanguageSelectionScope(): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.credentialScope[config.language], []);

  const [loading, setLoading] = useState<Loading>('Loading');

  useBackPress(() => navigate('SETTINGS SCOPE'), []);
  useEffect(() => {
    fetchCredentials(() => setLoading('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={R['Credentials']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <CredentialSelectionScreen
        credentialScopeState={loading}
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
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="settings"
          onPress={() => navigate('SETTINGS SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="card-outline"
          onPress={() => {}}
        />,
      ]}
    />
  );
});

async function fetchCredentials(
  whenLoaded: () => void
) {
  await CacheService.loadAllCredentials();
  whenLoaded();
}
