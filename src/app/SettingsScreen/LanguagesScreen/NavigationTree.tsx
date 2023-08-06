import React from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

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
          onPress={async () => await useNavigate('SETTINGS SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="language"
        />,
      ]}
    />
  );
}
