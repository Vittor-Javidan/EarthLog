import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { API } from '../__API__';

export default function NavigationTree() {

  const id_project = useLocalSearchParams().id_project as string;

  function exitScreen(
    screen: 'PROJECT SCREEN' | 'HOME SCREEN'
  ) {
    API.SampleSettingsWidget.reset();
    navigate(screen, id_project);
  }

  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => exitScreen('HOME SCREEN')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="folder"
          onPress={() => exitScreen('PROJECT SCREEN')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="clipboard"
        />,
      ]}
    />
  );
}
