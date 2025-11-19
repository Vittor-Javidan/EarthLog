import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';

import { Loading } from '@V1/Types/AppTypes';
import { Scope } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { ConfigService } from '@V1/Services/ConfigService';
import { MapAPI } from '@V1/Layers/API/Map';

import { Layout } from '@V1/Layout/index';
import { NavigationTree } from './NavigationTree';
import { Screen_FileExplore } from './Screen_FileExplore';

export const FileExploreScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.fileExplore[config.language], []);
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
      title={R['File Explorer']}
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
        <Screen_FileExplore
          onScreenButton_Home={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      )}
    </Layout.Root>
  );
});
