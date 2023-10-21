import { ConfigDTO } from '@Types/AppTypes';
import LocalStorageService from './LocalStorageService';
import LanguageService from './LanguageService';
import ThemeService from './ThemeService';
import DateTimeService from './DateTimeService';

export default class ConfigService {

  static LOCAL_STORAGE_KEY: string = 'config';
  static deviceLangauge = LanguageService.getDeviceLanguage();
  static config: ConfigDTO = {
    language:     this.deviceLangauge,
    dateFormat:   DateTimeService.DateFormatByTag(this.deviceLangauge),
    timeFormat:   DateTimeService.TimeFormatByTag(this.deviceLangauge),
    appTheme:     'Dark',
    widgetTheme:  'Light',
    onlyWarningVibrations: false,
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
    const deviceLanguage = LanguageService.getDeviceLanguage();

    const verifiedConfigDTO: ConfigDTO = {
      appTheme:              App.includes(dto.appTheme) ? dto.appTheme : 'Dark',
      widgetTheme:           Widget.includes(dto.widgetTheme) ? dto.widgetTheme : 'Light',
      language:              dto.language ?? deviceLanguage,
      dateFormat:            dto.dateFormat ?? DateTimeService.DateFormatByTag(deviceLanguage),
      timeFormat:            dto.timeFormat ?? DateTimeService.TimeFormatByTag(deviceLanguage),
      onlyWarningVibrations: dto.onlyWarningVibrations ?? false,
    };
    return verifiedConfigDTO;
  }
}
