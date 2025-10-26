import * as Location from 'expo-location';

import { FOLDER_App } from '@V2/Services_Files/AppFolders';
import { ConfigService } from './ConfigService';
import { CacheService } from './CacheService';

export class AppService {

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
