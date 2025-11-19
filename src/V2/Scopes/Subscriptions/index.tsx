import React, { memo, useCallback, useMemo, useState } from "react";

import { useConnectStore } from "@SubscriptionManager";
import { Loading } from "@V2/Types/AppTypes";
import { Scope } from "@V2/Globals/NavigationControler";
import { translations } from "@V2/Translations/index";
import { ConfigService } from "@V2/Services/ConfigService";
import { useBackPress } from "@V2/Hooks/index";
import { MapAPI } from "@V2/Layers/API/Map";

import { Layout } from "@V2/Layout/index";
import { Screen_Subscriptions } from "./Screen_Subscriptions";
import { NavigationTree } from "./NavigationTree";

export const SubscriptionsScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.subscriptions[config.language], []);
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

  useConnectStore({
    onConnection: () => setState('Loaded'),
    onError: (errorMessage: string) => {
      props.onScopeChange({ scope: 'HOME SCOPE' });
      alert(errorMessage);
    }
  })

  return (
    <Layout.Root
      title={R["Subscriptions"]}
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
        <Screen_Subscriptions
          onPurchaseSuccess={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onScreenButton_Home={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      )}
    </Layout.Root>
  )
});