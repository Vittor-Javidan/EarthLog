import React, { memo } from 'react';

import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';

import { Layout } from '@Layout/index';
import { VibrationOptionsScreen } from '@Screens/VibrationOptionsScreen';

export default function VibrationsOptionsScope() {

  useBackPress(() => navigate('SETTINGS SCOPE'), []);

  return (
    <Layout.Root
      title={'Vibrations'}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <VibrationOptionsScreen />
    </Layout.Root>
  );
}

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="settings"
          onPress={() => navigate('SETTINGS SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="alert-circle"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
