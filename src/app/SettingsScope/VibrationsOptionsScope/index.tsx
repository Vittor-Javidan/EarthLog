import React, { memo, useMemo } from 'react';

import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';

import { Layout } from '@Layout/index';
import { VibrationOptionsScreen } from '@Screens/VibrationOptionsScreen';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export default function VibrationsOptionsScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.vibrationOptions[config.language], []);
  useBackPress(() => navigate('SETTINGS SCOPE'), []);

  return (
    <Layout.Root
      title={R['Vibration']}
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
