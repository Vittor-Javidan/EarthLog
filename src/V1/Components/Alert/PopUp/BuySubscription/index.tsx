import React, { useEffect, useMemo, memo, useCallback, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { withIAPContext, useIAP, finishTransaction, Purchase, SubscriptionAndroid, requestSubscription, endConnection, initConnection, flushFailedPurchasesCachedAsPendingAndroid, SubscriptionIOS, getSubscriptions } from 'react-native-iap';

import { navigate } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import AlertService from '@V1/Services/AlertService';
import ThemeService from '@V1/Services/ThemeService';

import { Text } from '@V1/Text/index';
import { LC } from '@V1/Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const BuySubscription = withIAPContext(memo((props: {
  message: string
  closeModal: () => void
}) => {

  const config                                        = useMemo(() => ConfigService.config, []);
  const theme                                         = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R                                             = useMemo(() => translations.component.alert.buySubscription[config.language], []);
  const [subscriptionAndroid, setSubscriptionAndroid] = useState<SubscriptionAndroid | null>(null);
  const [subscriptionIOS    , setSubscriptionIOS    ] = useState<SubscriptionIOS | null>(null);
  const [errorMessage       , setErrorMessage       ] = useState<string | null>(null);
  const [state              , setState              ] = useState({
    loadingTransaction: false,
    restartingApp: false,
  });

  const {
    connected,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const buySubscription = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loadingTransaction: true }));
      if (Platform.OS === 'android' && subscriptionAndroid !== null) {
        await requestSubscription({
          sku: subscriptionAndroid.productId,
          subscriptionOffers: [{
            sku: subscriptionAndroid.productId,
            offerToken: subscriptionAndroid.subscriptionOfferDetails[0].offerToken,
          }],
        });
      }
      if (Platform.OS === 'ios' && subscriptionIOS !== null) {
        await requestSubscription({ sku: subscriptionIOS.productId });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setState(prev => ({ ...prev, loadingTransaction: false }));
      }
    }
  }, [subscriptionAndroid, subscriptionIOS]);

  const onFinishTransaction = useCallback(async (currentPurchase: Purchase) => {
    if (connected) {
      await finishTransaction({ purchase: currentPurchase, isConsumable: false });
      AlertService.runAcceptCallback();
      props.closeModal();
      navigate('RESTART APP');
    }
  }, [props.closeModal, connected]);

  useEffect(() => {
    if (connected) {

      const PREMIUM_PLAN_SKU = Platform.select({
        default: 'premium',
      });

      try {
        if (Platform.OS === 'android') {
          getSubscriptions({ skus: [PREMIUM_PLAN_SKU ]}).then(subscriptions => {
            setSubscriptionAndroid(subscriptions[0] as SubscriptionAndroid);
          });
        }
        if (Platform.OS === 'ios') {
          getSubscriptions({ skus: [PREMIUM_PLAN_SKU ]}).then(subscriptions => {
            setSubscriptionIOS(subscriptions[0] as SubscriptionIOS);
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    }
  }, [connected]);

  useEffect(() => {
    if (currentPurchaseError?.message) {
      setErrorMessage(currentPurchaseError.message);
      setState(prev => ({ ...prev,  loadingTransaction: false }));
    }
  }, [currentPurchaseError]);

  useEffect(() => {
    if (currentPurchase && state.restartingApp === false) {
      setState(prev => ({ ...prev, restartingApp: true }));
      onFinishTransaction(currentPurchase);
    }
  }, [state.restartingApp, currentPurchase, onFinishTransaction]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      initConnection().then(async () => {
        await flushFailedPurchasesCachedAsPendingAndroid();
      }).catch(() => {
        setErrorMessage('Could not connect to app store');
      });
    }
    if (Platform.OS === 'ios') {
      setErrorMessage('Store connection not implemented for IOS');
    }
    return () => { endConnection(); };
  }, []);

  return (
    <LC.PopUp>
      <LC.ErrorDisplay
        error={errorMessage}
        showDisplay={errorMessage !== null}
      />
      {errorMessage === null && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            padding: 10,
          }}
        >
          {state.restartingApp === false ? (
            <Text h3
              style={{
                textAlign: 'justify',
                color: theme.font,
                fontStyle: 'italic',
              }}
            >
              {state.loadingTransaction === true ? R['Openning store...'] : props.message}
            </Text>
          ) : (
            <Text h3
              style={{
                textAlign: 'justify',
                color: theme.font,
                fontStyle: 'italic',
              }}
            >
              {R['Restarting the app...']}
            </Text>
          )}
          {state.loadingTransaction !== true && (
            <View
              style={{
                gap: 5,
                borderRadius: 10,
              }}
            >
              <Text h2
                style={{
                  paddingHorizontal: 10,
                  color: theme.font,
                }}
              >
                {R['Subscribing will allow you to:']}
              </Text>
              <View
                style={{
                  paddingHorizontal: 10,
                }}
              >
                <Text p
                  style={{
                    textAlign: 'left',
                    color: theme.font,
                  }}
                >
                  {R['- Download projects with more than 5 samples']}
                </Text>
                <Text p
                  style={{
                    textAlign: 'left',
                    color: theme.font,
                  }}
                >
                  {R['- Create unlimited samples within a single project']}
                </Text>
              </View>
            </View>
          )}
          {(subscriptionAndroid !== null && state.loadingTransaction === false) && (
            <Text h2
              style={{
                paddingHorizontal: 10,
                color: theme.font,
              }}
            >
              {subscriptionAndroid.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0].formattedPrice}
            </Text>
          )}
          {(subscriptionIOS !== null && state.loadingTransaction === false) && (
            <Text h2
              style={{
                paddingHorizontal: 10,
                color: theme.font,
              }}
            >
              {subscriptionIOS.localizedPrice}
            </Text>
          )}
        </View>
      )}
      {(state.loadingTransaction === true) && (
        <ActivityIndicator
          style={{ alignSelf: 'center' }}
          size="large"
          color={theme.font}
        />
      )}
      <FooterButtons
        showBuyButton={connected && subscriptionAndroid !== null && state.loadingTransaction === false && errorMessage === null}
        showCancelButton={state.restartingApp === false}
        onCancel={() => props.closeModal()}
        buySubscription={async () => await buySubscription()}
      />
    </LC.PopUp>
  );
}));
