import AsyncStorage from '@react-native-async-storage/async-storage';

export type LocalStorageData = Record<string, string | null>

export default class LocalStorageService {

  async saveData (key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  }

  async getData(key: string): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Data retrieved successfully
        console.log('Retrieved data:', value);
        return value;
      }
      return '';
    } catch (error) {
      console.log('Error retrieving data:', error);
      return '';
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
