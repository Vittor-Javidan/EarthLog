import React, { memo, useState } from "react";

import { useConnectStore } from "@SubscriptionManager";
import { Loading } from "@V1/Types/AppTypes";
import { Scope } from "@V1/Globals/NavigationControler";
import { useBackPress } from "@V1/Hooks/index";

import { Layout } from "@V1/Layout/index";
import { Screen_Subscriptions } from "./Screen_Subscriptions";
import { NavigationTree } from "./NavigationTree";

export const SubscriptionsScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const [state    , setState] = useState<Loading>('Loading');

  useBackPress(() => props.onScopeChange({ scope: 'HOME SCOPE' }), []);
  useConnectStore({
    onConnection: () => setState('Loaded'),
    onError: (errorMessage: string) => {
      props.onScopeChange({ scope: 'HOME SCOPE' });
      alert(errorMessage);
    }
  })

  return (
    <Layout.Root
      title="Subscriptions"
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
        <Screen_Subscriptions
          onPurchaseSuccess={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onScreenButton_Home={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      )}
    </Layout.Root>
  )
});