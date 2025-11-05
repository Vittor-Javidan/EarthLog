import { memo, useCallback, useState } from "react";
import { finishTransaction, useIAP } from "react-native-iap";

import { sleep } from "@V2/Globals/Sleep";
import { AppSubscriptions, SKU_IDs, SubscriptionManager, useFetchSubscriptions } from "@SubscriptionManager";

import { Animation } from "@V2/Animation/index";
import { Layout } from "@V2/Layout/index";
import { TC } from "./__TC__";
import { LC } from "./__LC__";

export const Screen_Subscriptions = memo((props: {
  onPurchaseSuccess: () => void,
  onScreenButton_Home: () => void
}) => {

  const [subscriptions, setSubscriptions] = useState<AppSubscriptions>({ mapSubscriptions: [], sponsorSubscriptions: [] });
  const [tryAgain     , setTryAgain     ] = useState<boolean>(false);

  useIAP({
    onPurchaseSuccess: async (purchase) => {
      await finishTransaction({
        purchase,
        isConsumable: false,
      })
      await sleep(50)
      props.onPurchaseSuccess();
    }
  })

  const onBuyMapSubscription = useCallback(async (offerToken: string) => {
    await SubscriptionManager.buySubscription({
      id_subscription: 'map', offerToken,
      onSuccess: () => { },
      onError: (errorMessage) => alert(errorMessage),
    })
  }, []);

  const onBuySponsorSubscription = useCallback(async (o: {
    id: SKU_IDs
    offerToken: string
  }) => {
    await SubscriptionManager.buySubscription({
      id_subscription: o.id, offerToken: o.offerToken,
      onSuccess: () => { },
      onError: (errorMessage) => alert(errorMessage),
    })
  }, []);

  useFetchSubscriptions({
    subscriptions: (subscriptions) => setSubscriptions(subscriptions),
    onError: (errorMessage) => setTryAgain(prev => !prev),
  }, [tryAgain]);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onHomePress={() => props.onScreenButton_Home()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <LC.GooglePlaySubscriptionsButton />
          {subscriptions.mapSubscriptions.length > 0 && (
            <LC.MapSubscriptionsButton
              mapSubscription={subscriptions.mapSubscriptions}
              onBuySubscription={async (offerToken) => await onBuyMapSubscription(offerToken)}
            />
          )}
          {subscriptions.sponsorSubscriptions.length === 3 && (
            <LC.SponsorSubscriptionsButton
              sponsorSubscription={subscriptions.sponsorSubscriptions}
              onBuySubscription={async (offer) => await onBuySponsorSubscription(offer)}
            />
          )}
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  )
});