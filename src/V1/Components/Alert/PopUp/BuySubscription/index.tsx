import React, { useMemo, memo, useCallback, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { withIAPContext, useIAP, SubscriptionAndroid, requestSubscription, SubscriptionIOS } from 'react-native-iap';

import { useCloseStore, useConnectStore, useCurrentPurchaseError, useFinishTransaction, useGetSubscriptions } from '@SubscriptionManager';

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
    closeStore: false,
    retryToGetSubscriptions: false,
  });

  const {
    connected,
  } = useIAP();

  const isBothPlataformSubscriptionNull = (subscriptionAndroid === null && subscriptionIOS === null          );
  const showAndroidPrice                = (subscriptionAndroid !== null && state.loadingTransaction === false);
  const showIOSPrice                    = (subscriptionIOS     !== null && state.loadingTransaction === false);
  const showSubscriptionDescription     = state.loadingTransaction === false;
  const showLoadingIndicator            = state.loadingTransaction === true;

  const onCancel = useCallback(async () => {
    setState(prev => ({ ...prev, closeStore: true }));
  }, []);

  const buySubscription = useCallback(async () => {

    if (state.closeStore) {
      return;
    }

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
  }, [subscriptionAndroid, subscriptionIOS, state.closeStore]);

  useConnectStore({
    onError:   (errorMessage) => setErrorMessage(errorMessage),
  });

  useCloseStore({
    onClose: () => props.closeModal(),
  }, [state.closeStore]);

  useGetSubscriptions({
    subscriptionAndroid: (subscription) => setSubscriptionAndroid(subscription),
    subscriptionIOS:     (subscription) => setSubscriptionIOS(subscription),
    onError:             (errorMessage) => {
      switch (errorMessage) {
        case 'Unable to auto-initialize connection': setState(prev => ({ ...prev, retryToGetSubscriptions: !state.retryToGetSubscriptions })); break;
        default: setErrorMessage(errorMessage);
      }
    },
  }, [state.retryToGetSubscriptions]);

  useFinishTransaction({
    onTransactionProcessing: () => setState(prev => ({ ...prev, restartingApp: true })),
    onFinishTransaction: () => {
      AlertService.runAcceptCallback();
      setState(prev => ({ ...prev, closeStore: true }));
      navigate('RESTART APP');
    },
  }, [state.restartingApp]);

  useCurrentPurchaseError({
    onError: (errorMessage) => {
      setErrorMessage(errorMessage);
      setState(prev => ({ ...prev,  loadingTransaction: false }));
    },
  });

  return (
    <LC.PopUp>
      <LC.ErrorDisplay
        error={errorMessage}
        showDisplay={errorMessage !== null}
      />

      {/* MAIN DISPLAY */}
      {errorMessage === null && (
        <View
          style={{
            justifyContent: 'center',
            gap: 10,
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >

          {/* MESSAGE FEEDBACK */}
          <Text p
            style={{
              color: theme.font,
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            {
              state.restartingApp      ? R['Restarting the app...'] :
              state.closeStore         ? R['Closing...']            :
              state.loadingTransaction ? R['Openning store...']     :
              props.message
            }
          </Text>

          {/* SUBSCRIPTION DESCRIPTION */}
          {showSubscriptionDescription && (<>
            <View
              style={{
                gap: 5,
                borderRadius: 10,
              }}
            >
              <Text h2
                style={{
                  color: theme.font,
                  textAlign: 'left',
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
                  {R['- Download projects with more than 10 samples']}
                </Text>
                <Text p
                  style={{
                    color: theme.font,
                    textAlign: 'left',
                  }}
                >
                  {R['- Create more than 10 samples within a single project']}
                </Text>
              </View>
            </View>
            <View>
              <Text h2
                style={{
                  color: theme.font,
                  textAlign: 'justify',
                  fontSize: 12,
                }}
              >
                {R['Subscriptions are not required to use the app and can be canceled at any time.']}
              </Text>
            </View>
          </>)}

          {/* PRICE DISPLAY */}
          {isBothPlataformSubscriptionNull && (
            <Text h2
              style={{
                color: theme.font,
                textAlign: 'center',
                paddingHorizontal: 10,
                fontSize: 20,
              }}
            >
              {R['Loading price...']}
            </Text>
          )}
          {showAndroidPrice && (
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
          {showIOSPrice && (
            <Text h2
              style={{
                color: theme.font,
                paddingHorizontal: 10,
                fontSize: 20,
              }}
            >
              {subscriptionIOS.localizedPrice}
            </Text>
          )}

        </View>
      )}

      {/* LOADING FEEDBACK */}
      {showLoadingIndicator && (
        <ActivityIndicator
          style={{ alignSelf: 'center' }}
          size="large"
          color={theme.font}
        />
      )}

      <FooterButtons
        showBuyButton={connected && subscriptionAndroid !== null && state.loadingTransaction === false && errorMessage === null}
        showCancelButton={state.restartingApp === false && state.loadingTransaction === false}
        onCancel={ () => onCancel()}
        buySubscription={async () => await buySubscription()}
      />
    </LC.PopUp>
  );
}));
