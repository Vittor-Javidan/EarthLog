import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import {
  LanguageTag,
  Loading
} from '@V2/Types';

import { Scope } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { ConfigService } from '@V2/Services/ConfigService';
import { MapAPI } from '@V2/Layers/API/Map';

import { Layout } from '@V2/Layout/index';
import { Screen_LanguageSelection } from './Screen_LanguageSelection';
import { NavigationTree } from './NavigationTree';

export const LanguageSelectionScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const [state     , setState     ] = useState<Loading>('Loading');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [language  , setLanguage  ] = useState<LanguageTag>(config.language);
  const R = translations.scope.languageSelection[language];

  const onMenuButtonPress = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);

  useBackPress(() => {
    switch (true) {
      case MapAPI.isMapOpen: MapAPI.toggleMap(); break;
      case showDrawer: setShowDrawer(false); break;
      default: props.onScopeChange({ scope: 'SETTINGS SCOPE' });
    }
  }, [MapAPI.isMapOpen,showDrawer]);

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Languages']}
      subtitle=""
      showDrawer={showDrawer}
      onMenuButtonPress={onMenuButtonPress}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onSettingsPress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_LanguageSelection
          onLanguageChange={(languageTag) => setLanguage(languageTag)}
          onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />
      )}
    </Layout.Root>
  );
});
