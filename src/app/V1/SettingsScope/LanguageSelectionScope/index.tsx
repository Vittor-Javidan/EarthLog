import React, { useMemo, useState } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { LanguageTag } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import ConfigService from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { LanguagesSelectionScreen } from '@V1/Screens/LanguageSelectionScreen';
import { NavigationTree } from './NavigationTree';

export default function LanguageSelectionScope() {

  const config                  = useMemo(() => ConfigService.config, []);
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
