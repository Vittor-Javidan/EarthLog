import { ConfigDTO } from '@Types/AppTypes';
import FileSystemService, { AppPath } from './FileSystemService';
import DateTimeService from './DateTimeService';
import LanguageService from './LanguageService';
import ThemeService from './ThemeService';

export default class ConfigService {

  private static CONFIG_FILE_PATH = `${AppPath.CONFIG}/index.json`;

  static deviceLanguage = LanguageService.getDeviceLanguage();
  static config: ConfigDTO = {
    language:     this.deviceLanguage,
    dateFormat:   DateTimeService.DateFormatByTag(this.deviceLanguage),
    timeFormat:   DateTimeService.TimeFormatByTag(this.deviceLanguage),
    appTheme:     'Dark',
    widgetTheme:  'Light',
    onlyWarningVibrations: false,
  };

  static async loadConfig(): Promise<void> {
    const data = await FileSystemService.readFile(this.CONFIG_FILE_PATH);
    if (data) {
      const verifiedData = this.verifyConfigDTOIntegrity(JSON.parse(data));
      this.config = verifiedData;
    }
  }

  static async saveConfig(): Promise<void> {
    await FileSystemService.writeFile(this.CONFIG_FILE_PATH, JSON.stringify(this.config));
  }

  /** Garantees migration when local storage config data is outdated */
  private static verifyConfigDTOIntegrity(dto: ConfigDTO): ConfigDTO {

    const { App, Widget } = ThemeService.themeNamesArray;
    const deviceLanguage = LanguageService.getDeviceLanguage();

    const verifiedConfigDTO: ConfigDTO = {
      appTheme:              App.includes(dto.appTheme) ? dto.appTheme : 'Dark',
      widgetTheme:           Widget.includes(dto.widgetTheme) ? dto.widgetTheme : 'Light',
      language:              dto.language   ?? deviceLanguage,
      dateFormat:            dto.dateFormat ?? DateTimeService.DateFormatByTag(deviceLanguage),
      timeFormat:            dto.timeFormat ?? DateTimeService.TimeFormatByTag(deviceLanguage),
      onlyWarningVibrations: dto.onlyWarningVibrations ?? false,
    };
    return verifiedConfigDTO;
  }
}
