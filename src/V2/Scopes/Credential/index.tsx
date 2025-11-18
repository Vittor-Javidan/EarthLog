import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import { CredentialService } from '@V2/Services/CredentialService';
import { ConfigService } from '@V2/Services/ConfigService';
import { MapAPI } from '@V1/Layers/API/Map';

import { Layout } from '@V2/Layout/index';
import { Screen_CredentialSelection } from './Screen_CredentialSelection';
import { NavigationTree } from './NavigationTree';
import { Drawer } from './Drawer';

export const CredentialScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.credential[config.language], []);
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
    fetchCredentials(() => setState('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={R['Credentials']}
      subtitle=""
      showDrawer={showDrawer}
      onMenuButtonPress={onMenuButtonPress}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      }
      drawerChildren={
        <Drawer />
      }
      menuIcon="server"
      menuIconStyle={{
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 1,
      }}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_CredentialSelection
          onScreenButton_Home={() => props.onScopeChange({ scope: 'HOME SCOPE'})}
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
