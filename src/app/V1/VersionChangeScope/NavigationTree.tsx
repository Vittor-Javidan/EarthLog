import React, { memo } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';

import { Layout } from '@V1/Layout/index';

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home-outline"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="shuffle"
          onPress={() => {}}
        />,
      ]}
    />
  );
});

export default NavigationTree;
