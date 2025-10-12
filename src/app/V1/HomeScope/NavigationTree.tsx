import React, { memo } from 'react';

import { Layout } from '@V1/Layout/index';

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => {}}
        />,
      ]}
    />
  );
});

export default NavigationTree;
