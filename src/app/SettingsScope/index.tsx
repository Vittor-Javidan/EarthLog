
import React, { useMemo } from 'react';

import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import SettingsScreen from '@Screens/SettingsScreen';

export default function SettingsScope(): JSX.Element {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.SettingsScreen[language], []);

  useBackPress(() => navigate('HOME SCOPE'));

  return (
    <Layout.Root
      title={R['Settings']}
      drawerChildren={<></>}
      navigationTree={ <NavigationTree/> }
    >
      <SettingsScreen />
    </Layout.Root>
  );
}

function NavigationTree() {
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
        />,
      ]}
    />
  );
}
