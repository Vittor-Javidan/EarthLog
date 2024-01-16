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

  const isBothPlataformSubscriptionNull = (subscriptionAndroid === null && subscriptionIOS === null);

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
            gap: 10,
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          {state.restartingApp === false ? (
            <Text h3
              style={{
                color: theme.font,
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              {state.loadingTransaction === true ? R['Openning store...'] : props.message}
            </Text>
          ) : (
            <Text h3
              style={{
                color: theme.font,
                textAlign: 'justify',
                fontStyle: 'italic',
              }}
            >
              {R['Restarting the app...']}
            </Text>
          )}
          {state.loadingTransaction === false && (<>
            <View
              style={{
                gap: 5,
                borderRadius: 10,
              }}
            >
              <Text h2
                style={{
                  color: theme.font,
                  textAlign: 'justify',
                  fontWeight: '500',
                }}
              >
                {R['A premium subscription will allow you to:']}
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <Text p
                  style={{
                    color: theme.font,
                    textAlign: 'left',
                  }}
                >
                  {R['- Download projects with more than 5 samples']}
                </Text>
                <Text p
                  style={{
                    color: theme.font,
                    textAlign: 'left',
                  }}
                >
                  {R['- Create unlimited samples within a single project']}
                </Text>
              </View>
            </View>
            <View>
              <Text p
                style={{
                  color: theme.font,
                  textAlign: 'justify',
                  fontStyle: 'italic',
                  fontWeight: '500',
                }}
              >
                {R['Subscriptions are not required to use the app and can be canceled at any time.']}
              </Text>
            </View>
          </>)}
          {(subscriptionAndroid !== null && state.loadingTransaction === false) && (
            <Text h2
              style={{
                color: theme.font,
                textAlign: 'center',
                paddingHorizontal: 10,
              }}
            >
              {`${subscriptionAndroid.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0].formattedPrice} / ${R['Month']}`}
            </Text>
          )}
          {(subscriptionIOS !== null && state.loadingTransaction === false) && (
            <Text h2
              style={{
                color: theme.font,
                paddingHorizontal: 10,
              }}
            >
              {subscriptionIOS.localizedPrice}
            </Text>
          )}
        </View>
      )}
      {(state.loadingTransaction === true || isBothPlataformSubscriptionNull) && (
        <ActivityIndicator
          style={{ alignSelf: 'center' }}
          size="large"
          color={theme.font}
        />
      )}
      <FooterButtons
        showBuyButton={connected && subscriptionAndroid !== null && state.loadingTransaction === false && errorMessage === null}
        showCancelButton={state.restartingApp === false &&  state.loadingTransaction === false}
        onCancel={() => props.closeModal()}
        buySubscription={async () => await buySubscription()}
      />
    </LC.PopUp>
  );
}));
