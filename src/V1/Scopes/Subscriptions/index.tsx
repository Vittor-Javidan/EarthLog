import React, { memo, useCallback, useMemo, useState } from "react";

import {
  Loading
} from "@V1/Types";

import { useConnectStore } from "@SubscriptionManager";
import { Scope } from "@V1/Globals/NavigationControler";
import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";
import { useBackPress } from "@V1/Hooks/index";
import { MapAPI } from "@V1/Layers/API/Map";

import { Layout } from "@V1/Layout/index";
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