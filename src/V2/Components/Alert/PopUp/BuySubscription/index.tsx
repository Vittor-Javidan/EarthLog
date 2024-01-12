import React, { useEffect, useMemo, memo, useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { withIAPContext, useIAP, finishTransaction, Purchase } from 'react-native-iap';

import SubscriptionManager, { useAppStoreConnection } from '@SubscriptionManager';

import { navigate } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import AlertService from '@V2/Services/AlertService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';
import { LC } from '@V2/Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const BuySubscription = withIAPContext(memo((props: {
  message: string
  closeModal: () => void
}) => {

  const config                          = useMemo(() => ConfigService.config, []);
  const theme                           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R                               = useMemo(() => translations.component.alert.buySubscription[config.language], []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [state       , setState       ] = useState({
    loadingTransaction: false,
  });

  const {
    connected,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const buySubscription = useCallback(async () => {
    setState({ loadingTransaction: true });
    await SubscriptionManager.buySubscription({
      onError: (errorMessage) => {
        setErrorMessage(errorMessage);
        setState({ loadingTransaction: false });
      },
    });
  }, []);

  const onFinishTransaction = useCallback(async (currentPurchase: Purchase) => {
    await finishTransaction({ purchase: currentPurchase, isConsumable: false });
    setState({ loadingTransaction: false });
    AlertService.runAcceptCallback();
    props.closeModal();
    navigate('RESTART APP');
  }, [props.closeModal]);

  useEffect(() => {
    if (currentPurchaseError?.message) {
      setErrorMessage(currentPurchaseError.message);
      setState({ loadingTransaction: false });
    }
  }, [currentPurchaseError]);

  useEffect(() => {
    if (currentPurchase) {
      onFinishTransaction(currentPurchase);
    }
  }, [currentPurchase, onFinishTransaction]);

  useAppStoreConnection({
    onFinish: () => {},
    onError: (errorMessage) => {
      setErrorMessage(errorMessage);
    },
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
          }}
        >
          <Text h3
            style={{
              textAlign: 'justify',
              color: theme.font,
              fontStyle: 'italic',
              padding: 10,
            }}
          >
            {state.loadingTransaction === true ? R['Openning store...'] : props.message}
          </Text>
          {state.loadingTransaction !== true && (
            <View
              style={{
                padding: 10,
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
        </View>
      )}
      {state.loadingTransaction === true && (
        <ActivityIndicator
          style={{ alignSelf: 'center' }}
          size="large"
          color={theme.font}
        />
      )}
      <FooterButtons
        connected={connected}
        loadingTransaction={state.loadingTransaction}
        onCancel={() => props.closeModal()}
        buySubscription={async () => await buySubscription()}
      />
    </LC.PopUp>
  );
}));
