import React, { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { useBackPress } from '@V1/Hooks/index';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import CacheService from '@V1/Services/CacheService';

import { Layout } from '@V1/Layout/index';
import { ExportProjectScreen } from '@V1/Screens/ExportProject';
import { NavigationTree } from './NavigationTree';

export default function exportProjectScope() {

  const id_project        = useLocalSearchParams().id_project as string;
  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.exportProject[config.language], []);
  const projectSettings   = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => navigate('PROJECT SCOPE', id_project), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Export project']}
      subtitle={projectSettings.name}
      drawerChildren={<></>}
      navigationTree={ <NavigationTree/> }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <ExportProjectScreen />
      )}
    </Layout.Root>
  );
}
