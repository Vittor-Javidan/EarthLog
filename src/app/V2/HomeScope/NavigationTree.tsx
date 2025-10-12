import React, { memo } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';

import { Layout } from '@V2/Layout/index';

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('HOME SCOPE')}
        />,
      ]}
    />
  );
});

export default NavigationTree;
