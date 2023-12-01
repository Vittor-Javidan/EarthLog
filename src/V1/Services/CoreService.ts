import * as Location from 'expo-location';

import { FOLDER_App } from './FileSystemService';
import ConfigService from './ConfigService';
import CacheService from './CacheService';

export default class CoreService {

  static async initApp(): Promise<void> {
    await FOLDER_App.init();
    await ConfigService.loadConfig();
    Location.requestForegroundPermissionsAsync();
  }

  static async whipeAllData(): Promise<void> {
    await FOLDER_App.deleteFolder();
    await CacheService.deleteLastOpenProject();
    CacheService.resetCache();
  }
}
