import React, { useState, useMemo, useEffect } from 'react';

import { Loading } from '@V1/Types/AppTypes';
import { navigate } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';

import NavigationTree from './NavigationTree';
import { ExportedFilesScreen } from '@V1/Screens/ExportedFilesScreen';

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
