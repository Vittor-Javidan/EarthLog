import React, { useState, useMemo, useEffect } from 'react';

import { Loading } from '@V2/Types/AppTypes';
import { navigate } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { ConfigService } from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';

import NavigationTree from './NavigationTree';
import { ExportedFilesScreen } from '@V2/Screens/ExportedFilesScreen';

export default function ExportedFilesScope() {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.exportedFiles[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => navigate('HOME SCOPE'), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Exported Files']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <ExportedFilesScreen />
      )}
    </Layout.Root>
  );
}
