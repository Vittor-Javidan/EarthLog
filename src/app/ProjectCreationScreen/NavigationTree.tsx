import React from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import API_TemporaryProject from './LocalComponents/API_TemporaryProject';

export default function NavigationTree() {

  async function exitScreen() {
    API_TemporaryProject.reset();
    await useNavigate('HOME SCREEN');
  }

  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await exitScreen()}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="file-tray"
        />,
      ]}
    />
  );
}
