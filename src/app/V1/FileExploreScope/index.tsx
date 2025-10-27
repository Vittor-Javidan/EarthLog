import React, { useState, useMemo, useEffect } from 'react';

import { Loading } from '@V1/Types/AppTypes';
import { navigate } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { FileExploreScreen } from '@V1/Screens/FileExplore';

import NavigationTree from './NavigationTree';

export default function FileExploreScope() {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.fileExplore[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => navigate('HOME SCOPE'), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['File Explorer']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <FileExploreScreen />
      )}
    </Layout.Root>
  );
}
