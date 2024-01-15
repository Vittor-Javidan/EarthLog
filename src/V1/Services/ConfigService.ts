import { ConfigDTO } from '@V1/Types/AppTypes';
import { FOLDER_Config } from './FileSystemService';
import DateTimeService from './DateTimeService';
import LanguageService from './LanguageService';
import ThemeService from './ThemeService';

export default class ConfigService {

  static deviceLanguage = LanguageService.getDeviceLanguage();
  static config: ConfigDTO = {
    language:     this.deviceLanguage,
    dateFormat:   DateTimeService.DateFormatByTag(this.deviceLanguage),
    timeFormat:   DateTimeService.TimeFormatByTag(this.deviceLanguage),
    appTheme:     'Dark',
    widgetTheme:  'Light',
    onlyWarningVibrations: true,
  };

  static async loadConfig(): Promise<void> {
    const config = await FOLDER_Config.get();
    if (config) {
      const verifiedConfig = this.verifyConfigDTOIntegrity({ config });
      this.config = verifiedConfig;
    }
  }

  static async saveConfig(): Promise<void> {
    await FOLDER_Config.update({ config: this.config });
  }

  /** Garantees migration when local storage config data is outdated */
  private static verifyConfigDTOIntegrity(o: {
    config: ConfigDTO
  }): ConfigDTO {

    const { config } = o;
    const { App, Widget } = ThemeService.themeNamesArray;
    const deviceLanguage = LanguageService.getDeviceLanguage();

    const verifiedConfigDTO: ConfigDTO = {
      appTheme:              App.includes(config.appTheme) ? config.appTheme : 'Dark',
      widgetTheme:           Widget.includes(config.widgetTheme) ? config.widgetTheme : 'Light',
      language:              config.language   ?? deviceLanguage,
      dateFormat:            config.dateFormat ?? DateTimeService.DateFormatByTag(deviceLanguage),
      timeFormat:            config.timeFormat ?? DateTimeService.TimeFormatByTag(deviceLanguage),
      onlyWarningVibrations: config.onlyWarningVibrations ?? true,
    };
    return verifiedConfigDTO;
  }
}
