import React from 'react';

import { Layout } from '@Components/Layout';

export default function NavigationTree() {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
        />,
      ]}
    />
  );
}
