import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { ConfigService } from '@V2/Services/ConfigService';
import { MapAPI } from '@V2/Layers/API/Map';

import { Layout } from '@V2/Layout/index';
import { Screen_VibrationOptions } from './Screen_VibrationOptions';
import { NavigationTree } from './NavigationTree';

export const VibrationsOptionsScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.vibrationOptions[config.language], []);
  const [state     , setState     ] = useState<Loading>('Loading');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onMenuButtonPress = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);

  useBackPress(() => {
    switch (true) {
      case MapAPI.isMapOpen: MapAPI.toggleMap(); break;
      case showDrawer: setShowDrawer(false); break;
      default: props.onScopeChange({ scope: 'SETTINGS SCOPE' });
    }
  }, [MapAPI.isMapOpen, showDrawer]);

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Vibration']}
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
        <Screen_VibrationOptions
          onScreenButton_HomePress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />
      )}
    </Layout.Root>
  );
});
