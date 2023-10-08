import { ConfigDTO } from '@Types/AppTypes';
import LocalStorageService from './LocalStorageService';
import LanguageService from './LanguageService';
import ThemeService from './ThemeService';

export default class ConfigService {

  static LOCAL_STORAGE_KEY: string = 'config';
  static config: ConfigDTO = {
    language: LanguageService.getDeviceLanguage(),
    appTheme: 'Dark',
    widgetTheme: 'Light',
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

    const { App, Widget } = ThemeService.themeNamesArray;

    const verifiedConfigDTO: ConfigDTO = {
      language:    dto.language ?? LanguageService.getDeviceLanguage(),
      appTheme:    App.includes(dto.appTheme)       ? dto.appTheme    : 'Dark',
      widgetTheme: Widget.includes(dto.widgetTheme) ? dto.widgetTheme : 'Light',
    };
    return verifiedConfigDTO;
  }
}
