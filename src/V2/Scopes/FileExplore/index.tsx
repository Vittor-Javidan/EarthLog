import React, { useState, useMemo, useEffect, memo } from 'react';

import { Loading } from '@V2/Types/AppTypes';
import { Scope } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { ConfigService } from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { NavigationTree } from './NavigationTree';
import { Screen_FileExplore } from './Screen_FileExplore';

export const FileExploreScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.fileExplore[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => props.onScopeChange({ scope: 'HOME SCOPE' }), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['File Explorer']}
      subtitle=""
      drawerChildren={<></>}
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
