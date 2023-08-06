import React from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import API_ExampleFigure from './LocalComponents/API_ExampleFigure';

export default function NavigationTree() {

  async function cancelAndExit(
    screen: 'HOME SCREEN' | 'SETTINGS SCREEN'
  ) {
    API_ExampleFigure.discart();
    await useNavigate(screen);
  }

  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await cancelAndExit('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="settings"
          onPress={async () => await cancelAndExit('SETTINGS SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="color-palette"
        />,
      ]}
    />
  );
}
