import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';

export default function NavigationTree() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

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
          iconName="clipboard"
          onPress={() => navigate('SAMPLE SCREEN', id_project, id_sample)}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_4"
          iconName="pencil-sharp"
        />,
      ]}
    />
  );
}
