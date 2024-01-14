import React, { memo, useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { useBackPress } from '@V2/Hooks/index';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import CacheService from '@V2/Services/CacheService';

import { Layout } from '@V2/Layout/index';
import { ExportProjectScreen } from '@V2/Screens/ExportProject';

export default function exportProjectScope() {

  const id_project      = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const R               = useMemo(() => translations.scope.exportProject[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
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

const NavigationTree = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('RESTART APP')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="folder"
          onPress={() => navigate('PROJECT SCOPE', id_project)}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="arrow-redo"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
