import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Should never be called directly on UI. It meant to be used by other services.
 */
export class LocalStorageService {

  static async saveData (key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  }

  static async getData(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) {
        return null;
      }
      return value;
    } catch (error) {
      return null;
    }
  }

  static async removeData(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  }
}
