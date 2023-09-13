import React from 'react';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';

import { API } from '../__API__';


export default function NavigationTree() {

  function exitScreen() {
    API.TemporaryProject.reset();
    navigate('HOME SCREEN');
  }

  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => exitScreen()}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="folder"
        />,
      ]}
    />
  );
}
