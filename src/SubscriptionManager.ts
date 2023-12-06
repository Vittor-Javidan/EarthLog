import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppSubscribePlan = 'Free' | 'Premium'

export default class SubscriptionManager {

  private static OFFLINE_TIME_LOCAL_STORAGE_KEY = 'OfflineTime';
  private static userPlan: AppSubscribePlan = 'Free';

  static getPlan(): AppSubscribePlan {
    return this.userPlan;
  }

  private static async offlinePremiumAccess(): Promise<void> {
    try {

      const savedTimeSinceEpoch = await AsyncStorage.getItem(this.OFFLINE_TIME_LOCAL_STORAGE_KEY);
      if (savedTimeSinceEpoch !== null) {

        const savedTime = parseInt(savedTimeSinceEpoch, 10);
        const currentTime = Date.now();
        const timeDifference = currentTime - savedTime;
        const PREMIUM_OFFLINE_TIME_LIMIT = 4 * 24 * 60 * 60 * 1000; // 4 days

        if (timeDifference > 0 && timeDifference <= PREMIUM_OFFLINE_TIME_LIMIT) {
          this.userPlan = 'Premium';
          return;
        }
      }

      this.userPlan = 'Free';

    } catch (error) {
      alert('Premim offline time not readable');
    }
  }

  private static async saveOfflineAccess(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.OFFLINE_TIME_LOCAL_STORAGE_KEY, `${Date.now()}`);
    } catch (error) {
      alert('Could not save offline premium access');
    }
  }

  static async hasInternetConection(): Promise<boolean> {
    return (await Network.getNetworkStateAsync()).isInternetReachable ?? false;
  }
}
