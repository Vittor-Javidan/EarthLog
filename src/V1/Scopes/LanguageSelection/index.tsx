import React, { memo, useMemo, useState } from 'react';

import { Scope } from '@V1/Globals/NavigationControler';
import { LanguageTag } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { Screen_LanguageSelection } from './Screen_LanguageSelection';
import { NavigationTree } from './NavigationTree';

export const LanguageSelectionScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config                  = useMemo(() => ConfigService.config, []);
  const [language, setLanguage] = useState<LanguageTag>(config.language);
  const R = translations.scope.languageSelection[language];

  useBackPress(() => props.onScopeChange({ scope: 'SETTINGS SCOPE' }), []);

  return (
    <Layout.Root
      title={R['Languages']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onSettingsPress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />
      }
    >
      <Screen_LanguageSelection
        onLanguageChange={(languageTag) => setLanguage(languageTag)}
        onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
      />
    </Layout.Root>
  );
});
