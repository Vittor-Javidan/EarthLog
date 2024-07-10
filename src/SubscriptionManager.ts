import { useEffect } from 'react';
import { Platform } from 'react-native';
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

import NetworkManager from '@NetworkManager';

export type AppSubscribePlan = 'Free' | 'Premium'

const PREMIUM_PLAN_SKU = Platform.select({
  default: 'premium',
});

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

export function useCloseStore(o: {
  onClose: () => void
}, deps: [ closeStore: boolean ]) {
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

/**
 * @param {boolean} deps[0] - `retry`: toggle this value to retry to get subscriptions.
 */
export function useGetSubscriptions(o: {
  subscriptionAndroid: (subscriptions: SubscriptionAndroid) => void
  subscriptionIOS: (subscriptions: SubscriptionIOS) => void
  onError: (errorMessage: string) => void
}, deps: [ retry: boolean ]) {
  const { connected } = useIAP();
  const [ retry ] = deps;
  useEffect(() => {
    if (connected) {
      getSubscriptions({ skus: [ PREMIUM_PLAN_SKU ]}).then(subscriptions => {
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
    }
  }, [connected, retry]);
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

  static getPlan(): AppSubscribePlan {
    return this.userPlan;
  }

  static async loadPlan(o: {
    onFinish: () => void
    onError: (errorMessage: string) => void
  }) {

    this.userPlan = 'Free';

    if (await NetworkManager.hasInternetConection() === false) {
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

    if (!o.skipConnectionCheck && await NetworkManager.hasInternetConection() === false) {
      o.onError('No internet connection');
      return;
    }

    try {

      const purchases = await getAvailablePurchases();

      for (let i = 0; i < purchases.length; i++) {
        if (purchases[i].productId === PREMIUM_PLAN_SKU) {
          this.userPlan = 'Premium';
          break;
        }
      }

      o.onFinish();

    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }
}
