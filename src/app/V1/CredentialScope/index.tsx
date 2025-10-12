import React, { useEffect, useMemo, useState } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import CredentialService from '@V1/Services/CredentialService';
import ConfigService from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { CredentialSelectionScreen } from '@V1/Screens/CredentialScreen';

import NavigationTree from './NavigationTree';
import Drawer from './Drawer';

export default function LanguageSelectionScope() {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.credential[config.language], []);
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

async function fetchCredentials(
  whenLoaded: () => void
) {
  await CredentialService.loadAllCredentials();
  whenLoaded();
}
