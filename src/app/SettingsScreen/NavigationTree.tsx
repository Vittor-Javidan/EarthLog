import React from 'react';
import { Layout } from '@Components/Layout';
import { useNavigate } from '@Hooks/index';

export default function NavigationTree() {
  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="settings"
        />,
      ]}
    />
  );
}
