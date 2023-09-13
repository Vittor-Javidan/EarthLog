import React from 'react';

import { navigate } from '@Globals/NavigationControler';

import { Layout } from '@Components/Layout';

export default function NavigationTree() {
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
          iconName="settings"
        />,
      ]}
    />
  );
}
