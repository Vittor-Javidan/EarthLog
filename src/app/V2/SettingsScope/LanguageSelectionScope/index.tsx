import React, { memo, useMemo, useState } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import { LanguageTag } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import ConfigService from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { LanguagesSelectionScreen } from '@V2/Screens/LanguageSelectionScreen';

export default function LanguageSelectionScope() {

  const config = useMemo(() => ConfigService.config, []);
  const [language, setLanguage] = useState<LanguageTag>(config.language);
  const R = translations.scope.languageSelection[language];

  useBackPress(() => navigate('SETTINGS SCOPE'), []);

  return (
    <Layout.Root
      title={R['Languages']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <LanguagesSelectionScreen
        onLanguageChange={(languageTag) => setLanguage(languageTag)}
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
          iconName="home-outline"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="settings-outline"
          onPress={() => navigate('SETTINGS SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="language"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
