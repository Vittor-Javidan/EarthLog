import React from 'react';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';

import API_TemporaryProject from './LocalComponents/API_TemporaryProject';

export default function NavigationTree() {

  function exitScreen() {
    API_TemporaryProject.reset();
    navigate('HOME SCREEN');
  }

  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={() => exitScreen()}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="folder"
        />,
      ]}
    />
  );
}
