import LocalStorageService from './LocalStorageService';
import LanguageService, { Languages } from './SettingsService';

export type ConfigDTO = {
  language: Languages
}

export default class ConfigService {

  private static LOCAL_STORAGE_KEY: string = 'config';
  private static DEFAULT_CONFIG: ConfigDTO = {
    language: new LanguageService().getDeviceLanguage(),
  };

  async getConfig(): Promise<ConfigDTO> {
    const data = await new LocalStorageService().getData(ConfigService.LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as ConfigDTO;
    }
    return ConfigService.DEFAULT_CONFIG;
  }

  async saveConfig(configData: ConfigDTO): Promise<void> {
    await new LocalStorageService().saveData(ConfigService.LOCAL_STORAGE_KEY, JSON.stringify(configData));
  }
}
