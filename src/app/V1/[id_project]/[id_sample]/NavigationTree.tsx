import React, { memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V1/Globals/NavigationControler';

import { Layout } from '@V1/Layout/index';

export const NavigationTree = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home-outline"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="folder-outline"
          onPress={() => navigate('PROJECT SCOPE', id_project)}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="clipboard"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
