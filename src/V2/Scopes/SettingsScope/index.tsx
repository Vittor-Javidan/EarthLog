import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Loading } from '@V2/Types/AppTypes';
import { Scope } from '@V2/Globals/NavigationControler';
import { useBackPress } from '@V2/Hooks/index';
import { translations } from '@V2/Translations/index';
import { ConfigService } from '@V2/Services/ConfigService';
import { MapAPI } from '@V2/Layers/API/Map';

import { Layout } from '@V2/Layout/index';
import { Screen_Settings } from './Screen_Settings';
import { NavigationTree } from './NavigationTree';

export const SettingsScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.settings[config.language], []);
  const [state     , setState     ] = useState<Loading>('Loading');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onMenuButtonPress = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);

  useBackPress(() => {
    switch (true) {
      case MapAPI.isMapOpen: MapAPI.toggleMap(); break;
      case showDrawer: setShowDrawer(false); break;
      default: props.onScopeChange({ scope: 'HOME SCOPE' });
    }
  }, [MapAPI.isMapOpen, showDrawer]);

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Settings']}
      subtitle=""
      showDrawer={showDrawer}
      onMenuButtonPress={onMenuButtonPress}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_Settings
          onPress_Themes={() => props.onScopeChange({ scope: 'THEME SCOPE' })}
          onPress_Vibration={() => props.onScopeChange({ scope: 'VIBRATION OPTIONS SCOPE' })}
          onPress_DateAndTime={() => props.onScopeChange({ scope: 'DATE AND TIME SCOPE' })}
          onPress_LanguageSelection={() => props.onScopeChange({ scope: 'LANGUAGE SELECTION SCOPE' })}
          onPress_WhipedAllData={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onScreenButton_Home={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      )}
    </Layout.Root>
  );
});
