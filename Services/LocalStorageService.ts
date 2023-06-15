import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Should never be called directly on UI. It meant to be used by other services.
 */
export default class LocalStorageService {

  async saveData (key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  }

  async getData(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('Retrieved data:', value);
      if (!value) {
        return null;
      }
      return value;
    } catch (error) {
      console.log('Error retrieving data:', error);
      return null;
    }
  }

  async removeData(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully!');
    } catch (error) {
      console.log('Error removing data:', error);
    }
  }
}
