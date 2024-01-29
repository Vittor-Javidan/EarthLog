import React, { useMemo, useState } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import { LanguageTag } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import ConfigService from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { LanguagesSelectionScreen } from '@V2/Screens/LanguageSelectionScreen';
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
