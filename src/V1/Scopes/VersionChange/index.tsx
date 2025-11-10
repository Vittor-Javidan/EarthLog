import React, { memo, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { Screen_VersionChange } from './Screen_VersionChange';
import { NavigationTree } from './NavigationTree';

export const VersionChangeScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.versionChange[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => props.onScopeChange({ scope: 'HOME SCOPE' }), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Available versions']}
      subtitle="LTS V1"
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
        <Screen_VersionChange
          onPress_CurrentVersion={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onScreenButton_Home={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      )}
    </Layout.Root>
  );
});
