import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import {
  Loading
} from '@V1/Types';

import { Scope } from '@V1/Globals/NavigationControler';
import { useBackPress } from '@V1/Hooks/index';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';
import { CacheService } from '@V1/Services/CacheService';
import { MapAPI } from '@V1/Layers/API/Map';

import { Layout } from '@V1/Layout/index';
import { Screen_ExportProject } from './Screen_ExportProject';
import { NavigationTree } from './NavigationTree';

export const ExportProjectScope = memo((props: {
  id_project: string;
  onScopeChange: (scope: Scope) => void;
}) => {

  const { id_project } = props;
  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.exportProject[config.language], []);
  const projectSettings   = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
  const [state     , setState     ] = useState<Loading>('Loading');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onMenuButtonPress = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);

  useBackPress(() => {
    switch (true) {
      case MapAPI.isMapOpen: MapAPI.toggleMap(); break;
      case showDrawer: setShowDrawer(false); break;
      default: props.onScopeChange({ scope: 'PROJECT SCOPE', id_project });
    }
  }, [MapAPI.isMapOpen, showDrawer]);

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Export project']}
      subtitle={projectSettings.name}
      showDrawer={showDrawer}
      onMenuButtonPress={onMenuButtonPress}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onFolderPress={() => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_ExportProject
          id_project={id_project}
          onFihish={() => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
          onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
        />
      )}
    </Layout.Root>
  );
});
