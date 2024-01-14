import React, { memo, useEffect, useMemo, useState } from 'react';

import { Loading } from '@V1/Types/AppTypes';
import { navigate } from '@V1/Globals/NavigationControler';
import { useBackPress } from '@V1/Hooks/index';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { SettingsScreen } from '@V1/Screens/SettingsScreen';

export default function SettingsScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.settings[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => navigate('HOME SCOPE'), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Settings']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={ <NavigationTree/> }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <SettingsScreen />
      )}
    </Layout.Root>
  );
}

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home-outline"
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
