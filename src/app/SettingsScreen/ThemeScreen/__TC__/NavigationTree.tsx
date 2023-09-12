import React from 'react';

import { navigate } from '@Globals/NavigationControler';

import { Layout } from '@Components/Layout';
import { API } from '../__API__';

export default function NavigationTree() {

  function cancelAndExit(
    screen: 'HOME SCREEN' | 'SETTINGS SCREEN'
  ) {
    API.ExampleFigure.discart();
    navigate(screen);
  }

  return (
    <Layout.NavigationTree
      iconButtons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={() => cancelAndExit('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="settings"
          onPress={() => cancelAndExit('SETTINGS SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="color-palette"
        />,
      ]}
    />
  );
}
