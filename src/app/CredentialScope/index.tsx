import React, { memo, useEffect, useMemo, useState } from 'react';

import { Loading } from '@Types/AppTypes';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import { useBackPress } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { CredentialSelectionScreen } from '@Screens/CredentialScreen';
import CredentialService from '@Services/CredentialService';

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
      drawerChildren={<></>}
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
          iconName="home"
          onPress={() => navigate('HOME SCOPE')}
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
  await CredentialService.loadAllCredentials();
  whenLoaded();
}
