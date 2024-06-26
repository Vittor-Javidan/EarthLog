import React, { memo } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';

import { Layout } from '@V2/Layout/index';

export const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home-outline"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="card"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
