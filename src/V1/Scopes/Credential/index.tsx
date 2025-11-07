import React, { memo, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { CredentialService } from '@V1/Services/CredentialService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { Screen_CredentialSelection } from './Screen_CredentialSelection';
import { NavigationTree } from './NavigationTree';
import { Drawer } from './Drawer';

export const CredentialScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.credential[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => props.onScopeChange({ scope: 'HOME SCOPE' }), []);
  useEffect(() => {
    fetchCredentials(() => setState('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={R['Credentials']}
      subtitle=""
      drawerChildren={<Drawer />}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_CredentialSelection
          onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'HOME SCOPE'})}
        />
      )}
    </Layout.Root>
  );
});

async function fetchCredentials(
  whenLoaded: () => void
) {
  await CredentialService.loadAllCredentials();
  whenLoaded();
}
