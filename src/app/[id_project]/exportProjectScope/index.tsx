import React, { memo, useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/AppTypes';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { ExportProjectScreen } from '@Screens/ExportProject';

export default function exportProjectScope() {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.exportProject[config.language], []);
  const [loading, setLoading] = useState<Loading>('Loading');

  useBackPress(() => navigate('PROJECT SCOPE', id_project), []);
  useEffect(() => {
    setLoading('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Export project']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={ <NavigationTree/> }
    >
      <ExportProjectScreen
        projectScopeState={loading}
      />
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
          onPress={() => navigate('HOME SCOPE')}
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