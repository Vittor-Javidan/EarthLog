import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import { Layout } from '@Components/Layout';

export default function NavigationTree() {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('HOME SCREEN')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="folder"
          onPress={() => navigate('PROJECT SCREEN', id_project)}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="layers"
        />,
      ]}
    />
  );
}
