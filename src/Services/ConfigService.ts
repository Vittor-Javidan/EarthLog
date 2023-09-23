import { ConfigDTO } from '@Types/AppTypes';
import LocalStorageService from './LocalStorageService';
import LanguageService from './LanguageService';
import ThemeService from './ThemeService';

export default class ConfigService {

  static LOCAL_STORAGE_KEY: string = 'config';
  static config: ConfigDTO = {
    language: LanguageService.getDeviceLanguage(),
    appTheme: 'default',
  };

  static async loadConfig(): Promise<void> {
    const data = await LocalStorageService.getData(ConfigService.LOCAL_STORAGE_KEY);
    if (data) {
      const verifiedData = this.verifyConfigDTOIntegrity(JSON.parse(data));
      this.config = verifiedData;
    }
  }

  static async saveConfig(): Promise<void> {
    await LocalStorageService.saveData(ConfigService.LOCAL_STORAGE_KEY, JSON.stringify(this.config));
  }

  /** Garantees migration when local storage config data is outdated */
  private static verifyConfigDTOIntegrity(dto: ConfigDTO): ConfigDTO {
    const verifiedConfigDTO: ConfigDTO = {
      language: dto.language ?? LanguageService.getDeviceLanguage(),
      appTheme: ThemeService.themeNamesArray.App.includes(dto.appTheme) ? dto.appTheme : 'default',
    };
    return verifiedConfigDTO;
  }
}
