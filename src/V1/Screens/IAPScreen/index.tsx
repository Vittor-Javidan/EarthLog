import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Alert } from 'react-native';
import {withIAPContext, useIAP, finishTransaction, Purchase } from 'react-native-iap';

import SubscriptionManager from '@SubscriptionManager';

import { navigate } from '@V1/Globals/NavigationControler';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Text } from '@V1/Text/index';
import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { Button } from '@V1/Button/index';
import { TC } from './__TC__';

export const IAPScreen = withIAPContext(memo(() => {

  const config                = useMemo(() => ConfigService.config, []);
  const theme                 = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const buySubscription = useCallback(async () => {
    setLoading(true);
    await SubscriptionManager.buySubscription({
      onError: (errorMessage) => alert(errorMessage),
    });
  }, []);

  const onFinishTransaction = useCallback(async (currentPurchase: Purchase) => {
    await finishTransaction({ purchase: currentPurchase, isConsumable: false });
    navigate('RESTART APP');
  }, []);

  useEffect(() => {
    if (currentPurchaseError?.message) {
      alert(JSON.stringify(currentPurchaseError));
    }
  }, [currentPurchaseError]);

  useEffect(() => {
    if (currentPurchase) {
      onFinishTransaction(currentPurchase);
    }
  }, [currentPurchase]);

  useEffect(() => {
    Alert.alert(
      'Subscriptions Under Testing',
      'Subscriptions are currently being tested and not fully implemented. All app features are currently fully unlocked. Purchasing a subscription at this time will not change app usage and will not persist once testing is complete. Please check back later once subscription integration is complete.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons />
      }
    >
      <Animation.SlideFromLeft
        delay={200}
        duration={200}
      >
        {loading ? (
          <Layout.Loading />
        ) : (
          <View
            style={{
              padding: 10,
            }}
          >
            <View>
              <Text h3>
                {'Subscribing will allow you to:'}
              </Text>
              <View>
                <Text h3>
                  {'- Download projects with more than 5 samples'}
                </Text>
                <Text h3>
                  {'- Create unlimited samples within a single project'}
                </Text>
              </View>
            </View>
            <Button.TextWithIcon
              title="Buy subscription"
              iconName="wallet"
              onPress={async () => await buySubscription()}
              theme={{
                font_active: theme.font_active,
                background: theme.background_Button,
                background_active: theme.background_active,
                font: theme.font_Button,
              }}
              style={{
                borderRadius: 10,
              }}
            />
          </View>
        )}
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
}));
