import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';
import { useNavigate } from '@Hooks/index';
import API_Inputs_SampleSettings from './LocalComponents/API_Inputs_SampleSettings';

export default function NavigationTree() {

  const id_project = useLocalSearchParams().id_project as string;

  async function exitScreen(
    screen: 'PROJECT SCREEN' | 'HOME SCREEN'
  ) {
    API_Inputs_SampleSettings.reset();
    await useNavigate(screen, id_project);
  }

  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await exitScreen('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="folder"
          onPress={async () => await exitScreen('PROJECT SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="clipboard"
        />,
      ]}
    />
  );
}
