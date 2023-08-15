import React from 'react';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';

export default function NavigationTree() {
  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="settings"
        />,
      ]}
    />
  );
}
