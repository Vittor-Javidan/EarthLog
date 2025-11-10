import NetworkManager from '@NetworkManager';
import { useEffect } from 'react';
import {
  initConnection,
  endConnection,
  useIAP,
  fetchProducts,
  ProductSubscriptionAndroid,
  requestPurchase,
  getActiveSubscriptions,
} from 'react-native-iap';

export type SponsorTier = 0 | 1 | 2 | 3
export type AppSubscriptions = {
  mapSubscriptions: ProductSubscriptionAndroid[],
  sponsorSubscriptions: ProductSubscriptionAndroid[]
}

const SPONSOR_T1 = 'sponsor_t1'
const SPONSOR_T2 = 'sponsor_t2'
const SPONSOR_T3 = 'sponsor_t3'
const MAP_PLAN_SKU = 'map'
export const SKU_IDs = [
  MAP_PLAN_SKU,
  SPONSOR_T1,
  SPONSOR_T2,
  SPONSOR_T3
] as const;
export type SKU_IDs = typeof MAP_PLAN_SKU | typeof SPONSOR_T1 | typeof SPONSOR_T2 | typeof SPONSOR_T3;

export function useConnectStore(o: {
  onConnection: () => void,
  onError: (errorMessage: string) => void,
}) {
  const { connected } = useIAP();
  useEffect(() => {
    connected
    ? o.onConnection()
    : initConnection()
    .then(() => o.onConnection())
    .catch((error) => {
      error?.message
      ? o.onError(`Could not connect to app store: ${error.message}`)
      : o.onError('Could not connect to app store');
    });
    return () => {
      if (connected) {
        endConnection().catch((error) => {
          error?.message
          ? o.onError(`Could not close connection to app store: ${error.message}`)
          : o.onError('Could not close connection to app store');
        });
      }
    };
  }, []);
}

export function useFetchSubscriptions(o: {
  subscriptions: (subscriptions: AppSubscriptions) => void,
  onError: (errorMessage: string) => void,
},  deps: [refresher: boolean]) {

  const [refresher] = deps;
  const {connected} = useIAP();

  useEffect(() => {
    fetch();
  }, [connected, refresher]);

  async function fetch() {
    try {
      if (connected) {
        const subscriptions = await fetchProducts({ skus: [MAP_PLAN_SKU, SPONSOR_T1, SPONSOR_T2, SPONSOR_T3], type: 'subs' })
        if (subscriptions !== null) {
          const allSubscriptions = subscriptions as ProductSubscriptionAndroid[]
          const mapSubscriptions = allSubscriptions.filter(sub => sub.id === MAP_PLAN_SKU)
          const sponsorT1 = allSubscriptions.filter(sub => sub.id === SPONSOR_T1)
          const sponsorT2 = allSubscriptions.filter(sub => sub.id === SPONSOR_T2)
          const sponsorT3 = allSubscriptions.filter(sub => sub.id === SPONSOR_T3)

          // To make sure higher tiers come last
          o.subscriptions({ mapSubscriptions, sponsorSubscriptions: [...sponsorT1, ...sponsorT2, ...sponsorT3] });
        }
      };
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        error?.message
        ? o.onError(`Could not fetch subscriptions: ${error.message}`)
        : o.onError('Could not fetch subscriptions');
      } else {
        o.onError('Could not fetch subscriptions');
      }
    }
  }
}

export class SubscriptionManager {

  private static sponsorTier: SponsorTier = 0;
  private static isMapEnabled: boolean = false;

  static getStatus(): {
    sponsorship: SponsorTier
    isMapEnabled: boolean
  } {
    return {
      sponsorship: this.sponsorTier,
      isMapEnabled: this.isMapEnabled
    };
  }

  static async getActiveSubscriptions(o: {
    onSuccess: (o: {
      isMapEnabled: boolean
      sponsorship: number,
    }) => void,
  }) {

    try {

      const haveInternetAccess = await NetworkManager.hasInternetConnection();
      if (!haveInternetAccess) {
        /*
          If there is no access to internet, there is no reason for blocking features.
          The map will always need internet access to work anyway.

          The subscription will always be stored in memory. So unless the user
          or the user devices memory manager closes the app process by force,
          they will keep their features.
        */
        return;
      }

      await initConnection();

      const subscriptions = await getActiveSubscriptions() ?? [];
      const subscriptionsIds = subscriptions.map(sub => sub.productId);

      if (subscriptionsIds.length === 0) {
        this.sponsorTier = 0;
        this.isMapEnabled = false;
        o.onSuccess({
          isMapEnabled: this.isMapEnabled,
          sponsorship: this.sponsorTier,
        });
        return;
      }

      if (![SPONSOR_T1, SPONSOR_T2, SPONSOR_T3].some(id => subscriptionsIds.includes(id))) {
        this.sponsorTier = 0;
      }
      if (subscriptionsIds.includes(MAP_PLAN_SKU)) {
        this.isMapEnabled = true;
      }
      if (subscriptionsIds.includes(SPONSOR_T1)) {
        this.isMapEnabled = true;
        this.sponsorTier = 1;
      }
      if (subscriptionsIds.includes(SPONSOR_T2)) {
        this.isMapEnabled = true;
        this.sponsorTier = 2;
      }
      if (subscriptionsIds.includes(SPONSOR_T3)) {
        this.isMapEnabled = true;
        this.sponsorTier = 3;
      }

      o.onSuccess({
        isMapEnabled: this.isMapEnabled,
        sponsorship: this.sponsorTier,
      });

    } catch (err: any) {
      alert('could not get active subscriptions: ' + err?.message);
    } finally {
      await endConnection();
    }
  }

  static async buySubscription(o: {
    id_subscription: SKU_IDs,
    offerToken: string
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }) {
    try {
      await requestPurchase({
        type: 'subs',
        request: {
          android: {
            skus: [o.id_subscription],
            subscriptionOffers: [{
              sku: o.id_subscription,
              offerToken: o.offerToken,
            }]
          }
        }
      })
      o.onSuccess();
    } catch (err: any) {
      console.warn('requestPurchase failed', err);
    }
  }
}