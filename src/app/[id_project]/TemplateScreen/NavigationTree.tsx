import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';
import { useNavigate } from '@Hooks/index';

export default function NavigationTree() {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="file-tray"
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="copy"
        />,
      ]}
    />
  );
}
