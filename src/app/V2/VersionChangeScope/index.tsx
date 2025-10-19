import React, { useEffect, useMemo, useState } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import ConfigService from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { VersionChangeScreen } from '@V2/Screens/VersionChangeScreen';

import NavigationTree from './NavigationTree';

export default function VersionChangeScope() {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.versionChange[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => navigate('HOME SCOPE'), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Available versions']}
      subtitle="Beta"
      drawerChildren={<></>}
      navigationTree={<NavigationTree/>}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <VersionChangeScreen />
      )}
    </Layout.Root>
  );
}
