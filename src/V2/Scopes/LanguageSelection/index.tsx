import React, { memo, useMemo, useState } from 'react';

import { Scope } from '@V2/Globals/NavigationControler';
import { LanguageTag } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { ConfigService } from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
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
