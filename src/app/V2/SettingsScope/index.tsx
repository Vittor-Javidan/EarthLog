import React, { memo, useEffect, useMemo, useState } from 'react';

import { Loading } from '@V2/Types/AppTypes';
import { navigate } from '@V2/Globals/NavigationControler';
import { useBackPress } from '@V2/Hooks/index';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { SettingsScreen } from '@V2/Screens/SettingsScreen';

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
          iconName="home"
          onPress={() => navigate('RESTART APP')}
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
