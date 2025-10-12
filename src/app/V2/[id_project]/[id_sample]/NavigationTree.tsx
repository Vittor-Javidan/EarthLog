import React, { memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V2/Globals/NavigationControler';

import { Layout } from '@V2/Layout/index';

const NavigationTree = memo(() => {

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

export default NavigationTree;
