import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initConnection,
  endConnection,
  getAvailablePurchases,
  SubscriptionAndroid,
  SubscriptionIOS,
  getSubscriptions,
  useIAP,
  flushFailedPurchasesCachedAsPendingAndroid,
  finishTransaction,
} from 'react-native-iap';

export type AppSubscribePlan = 'Free' | 'Premium'

function useConnected(callback: () => void, deps: React.DependencyList) {
  const { connected } = useIAP();
  useEffect(() => {
    if (connected) {
      callback();
    }
  }, [connected, ...deps]);
}

export function useConnectStore(o: {
  onError: (errorMessage: string) => void,
}) {
  const { connected } = useIAP();
  useEffect(() => {
    if (!connected) {
      if (Platform.OS === 'android') {
        initConnection().then(async () => {
          await flushFailedPurchasesCachedAsPendingAndroid().catch(() => {});
        }).catch(() => {
          o.onError('Could not connect to app store');
        });
      }
      if (Platform.OS === 'ios') {
        o.onError('Store connection not implemented for IOS');
      }
    }
    return () => {
      if (connected) {
        endConnection();
      }
    };
  }, [connected]);
}

export function useCloseStore(o: {onClose: () => void}, deps: [ boolean ]) {
  const { connected } = useIAP();
  const [ closeStore ] = deps;
  useEffect(() => {
    if (closeStore) {
      connected
      ? endConnection().then(() => o.onClose())
      : o.onClose();
    }
  }, [connected, closeStore]);
}

export function useGetSubscriptions(o: {
  subscriptionAndroid: (subscriptions: SubscriptionAndroid) => void
  subscriptionIOS: (subscriptions: SubscriptionIOS) => void
  onError: (errorMessage: string) => void
}, deps: [ retryToGetSubscriptions: boolean ]) {
  const [ retryToGetSubscriptions ] = deps;
  useConnected(() => {
    const PREMIUM_PLAN_SKU = Platform.select({
      default: 'premium',
    });
    getSubscriptions({ skus: [PREMIUM_PLAN_SKU ]}).then(subscriptions => {
      if (Platform.OS === 'android') {
        o.subscriptionAndroid(subscriptions[0] as SubscriptionAndroid);
      }
      if (Platform.OS === 'ios') {
        o.subscriptionIOS(subscriptions[0] as SubscriptionIOS);
      }
    }).catch(error => {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    });
  }, [ retryToGetSubscriptions ]);
}

export function useFinishTransaction(o: {
  onTransactionProcessing: () => void
  onFinishTransaction: () => void
}, deps: [ restartingApp: boolean ]) {
  const [ restartingApp ] = deps;
  const { currentPurchase } = useIAP();
  useEffect(() => {
    if (currentPurchase && restartingApp === false) {
      o.onTransactionProcessing();
      finishTransaction({ purchase: currentPurchase, isConsumable: false }).then(() => o.onFinishTransaction());
    }
  }, [currentPurchase, restartingApp]);
}

export function useCurrentPurchaseError(o: {
  onError: (errorMessage: string) => void
}) {
  const { currentPurchaseError } = useIAP();
  useEffect(() => {
    if (currentPurchaseError?.message) {
      o.onError(currentPurchaseError.message);
    }
  }, [currentPurchaseError]);
}

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

export default class SubscriptionManager {

  private static userPlan: AppSubscribePlan = 'Free';
  private static OFFLINE_TIME_LOCAL_STORAGE_KEY = 'OfflineTime';
  static PREMIUM_PLAN_SKU = Platform.select({
    default: 'premium',
  });

  static getPlan(): AppSubscribePlan {
    return this.userPlan;
  }

  static freeUserLimitCheck(condition: boolean) {
    return this.userPlan === 'Free' && condition;
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
    try {
      const networkPromise = Network.getNetworkStateAsync();
      const timeoutPromise = new Promise<void>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000));
      const network = await Promise.race([
        networkPromise,
        timeoutPromise,
      ]);
      return network?.isInternetReachable ?? false;
    } catch (error) {
      return false;
    }
  }

}
