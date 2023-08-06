import React from 'react';
import { Layout } from '@Components/Layout';

export default function NavigationTree() {
  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
        />,
      ]}
    />
  );
}
