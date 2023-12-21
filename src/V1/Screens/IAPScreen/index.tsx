import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import {withIAPContext, useIAP, finishTransaction, Purchase } from 'react-native-iap';

import SubscriptionManager from '@SubscriptionManager';

import { navigate } from '@V1/Globals/NavigationControler';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { Button } from '@V1/Button/index';
import { TC } from './__TC__';

export const IAPScreen = withIAPContext(memo(() => {

  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  const {
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const buySubscription = useCallback(async () => {
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
        <View
          style={{
            padding: 10,
          }}
        >
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
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
}));
