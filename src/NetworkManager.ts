import * as Network from 'expo-network';

export default class NetworkManager {

  static async hasInternetConnection(): Promise<boolean> {
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
