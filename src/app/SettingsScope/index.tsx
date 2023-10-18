import React, { memo, useEffect, useMemo, useState } from 'react';

import { Loading } from '@Types/AppTypes';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { SettingsScreen } from '@Screens/SettingsScreen';

export default function SettingsScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.settings[config.language], []);
  const [loading, setLoading] = useState<Loading>('Loading');

  useBackPress(() => navigate('HOME SCOPE'), []);
  useEffect(() => {
    setLoading('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Settings']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={ <NavigationTree/> }
    >
      <SettingsScreen
        settingsScopeState={loading}
      />
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
          onPress={() => {}}
        />,
      ]}
    />
  );
});
