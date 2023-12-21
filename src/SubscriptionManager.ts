import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initConnection,
  endConnection,
  getAvailablePurchases,
  getSubscriptions,
  requestSubscription,
  SubscriptionAndroid,
  flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';

export type AppSubscribePlan = 'Free' | 'Premium'

export function useRestoreSubscription(o: {
  onFinish: () => void
  onError: (errorMessage: string) => void
}, deps: React.DependencyList) {
  useEffect(() => {
    SubscriptionManager.loadPlan({
      onFinish: () => o.onFinish(),
      onError: (errorMessage) => o.onError(errorMessage),
    });
  }, deps);
}

export function useAppStoreConnection(o: {
  onFinish: () => void
  onError: (errorMessage: string) => void
}, deps: React.DependencyList) {
  useEffect(() => {

    if (Platform.OS === 'ios') {

      o.onError('Store connection not implemented for IOS');

    } else {

      initConnection().then(() => {
        flushFailedPurchasesCachedAsPendingAndroid().then(() => {
          o.onFinish();
        });
      }).catch(() => {
        o.onError('Could not connect to app store');
      });

      return () => {
        endConnection();
      };
    }
  }, deps);
}

export default class SubscriptionManager {

  private static userPlan: AppSubscribePlan = 'Free';
  private static OFFLINE_TIME_LOCAL_STORAGE_KEY = 'OfflineTime';
  private static PREMIUM_PLAN_SKU = Platform.select({
    default: 'premium_test',
  });

  static getPlan(): AppSubscribePlan {
    return this.userPlan;
  }

  static async buySubscription(o: {
    onError: (errorMessage: string) => void
  }) {
    if (this.userPlan === 'Free') {
      try {
        if (Platform.OS === 'android') {
          const subscription = (await getSubscriptions({ skus: [this.PREMIUM_PLAN_SKU ]}))[0] as SubscriptionAndroid;
          await requestSubscription({
            sku: subscription.productId,
            subscriptionOffers: [{
              sku: subscription.productId,
              offerToken: subscription.subscriptionOfferDetails[0].offerToken,
            }],
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          o.onError(error.message);
        }
      }
    }
  }

  static async loadPlan(o: {
    onFinish: () => void
    onError: (errorMessage: string) => void
  }) {

    this.userPlan = 'Free';

    if (await this.hasInternetConection() === false) {
      await this.readOfflineAccess({
        onFinish: () => o.onFinish(),
      });
      return;
    }

    try {

      if (Platform.OS === 'ios') {
        this.userPlan = 'Premium';
        o.onFinish();
        return;
      }

      await initConnection();

      await this.restoreSubscription({
        skipConnectionCheck: true,
        onFinish: () => o.onFinish(),
        onError: (errorMessage) => {
          throw Error(errorMessage);
        },
      });

      await endConnection();

    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async restoreSubscription(o: {
    skipConnectionCheck?: boolean
    onFinish: () => void
    onError: (errorMessage: string) => void
  }) {

    if (!o.skipConnectionCheck && await this.hasInternetConection() === false) {
      o.onError('No internet connection');
      return;
    }

    try {

      const purchases = await getAvailablePurchases();

      console.log(purchases);

      for (let i = 0; i < purchases.length; i++) {
        if (purchases[i].productId === this.PREMIUM_PLAN_SKU) {
          this.userPlan = 'Premium';
          await this.saveOfflineAccess();
          break;
        }
      }

      if (this.userPlan !== 'Premium') {
        await this.removeOfflineAccess();
      }

      console.log(this.userPlan);
      o.onFinish();

    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  private static async readOfflineAccess(o: {
    onFinish: (userPlan: AppSubscribePlan) => void
  }): Promise<void> {
    try {

      const savedTimeSinceEpoch = await AsyncStorage.getItem(this.OFFLINE_TIME_LOCAL_STORAGE_KEY);

      if (savedTimeSinceEpoch !== null) {

        const savedTime = parseInt(savedTimeSinceEpoch, 10);
        const currentTime = Date.now();
        const timeDifference = currentTime - savedTime;
        const PREMIUM_OFFLINE_TIME_LIMIT = 4 * 24 * 60 * 60 * 1000; // 4 days

        if (timeDifference > 0 && timeDifference <= PREMIUM_OFFLINE_TIME_LIMIT) {
          this.userPlan = 'Premium';
        }
      }

      o.onFinish(this.userPlan);

    } catch (error) {
      alert('Could not read offline premium access');
    }
  }

  private static async saveOfflineAccess(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.OFFLINE_TIME_LOCAL_STORAGE_KEY, `${Date.now()}`);
    } catch (error) {
      alert('Could not save offline premium access');
    }
  }

  private static async removeOfflineAccess(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.OFFLINE_TIME_LOCAL_STORAGE_KEY);
    } catch (error) {
      alert('Could not remove offline premium access');
    }
  }

  private static async hasInternetConection(): Promise<boolean> {
    return (await Network.getNetworkStateAsync()).isInternetReachable ?? false;
  }
}
