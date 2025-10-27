import React, { useState, useMemo, useEffect } from 'react';

import { Loading } from '@V2/Types/AppTypes';
import { navigate } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { ConfigService } from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { FileExploreScreen } from '@V2/Screens/FileExplore';

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
