import React from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import API_ProjectCreation from './LocalComponents/API_ProjectCreation';

export default function NavigationTree() {

  async function exitScreen() {
    API_ProjectCreation.reset();
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
