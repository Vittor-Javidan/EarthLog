import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import LanguagesSelectionScreen from '@Screens/LanguageSelectionScreen';

export default function LanguageSelectionScope(): JSX.Element {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.LanguagesScreen[language], [language]);

  useBackPress(() => navigate('SETTINGS SCOPE'));

  return (
    <Layout.Root
      title={R['Languages']}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <LanguagesSelectionScreen />
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
          onPress={() => navigate('SETTINGS SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="language"
        />,
      ]}
    />
  );
}
