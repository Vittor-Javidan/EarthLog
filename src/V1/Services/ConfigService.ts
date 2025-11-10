import { ConfigDTO } from '@V1/Types/AppTypes';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { LanguageService } from '@V1/Services_Core/LanguageService';
import { FOLDER_Config } from '@V1/Services_Files/AppFolders';
import { DateTimeService } from '@V1/Services_Core/DateTimeService';

export class ConfigService {

  static deviceLanguage = LanguageService.getDeviceLanguage();
  static config: ConfigDTO = {
    language:     this.deviceLanguage,
    dateFormat:   DateTimeService.DateFormatByTag(this.deviceLanguage),
    timeFormat:   DateTimeService.TimeFormatByTag(this.deviceLanguage),
    appTheme:     'Dark',
    widgetTheme:  'Light',
    onlyWarningVibrations: true,
    automaticSampleGPSReference: true,
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
    
    const verifiedConfigDTO: ConfigDTO = {
      language:                    config.language                     ?? this.config.language,
      dateFormat:                  config.dateFormat                   ?? this.config.dateFormat,
      timeFormat:                  config.timeFormat                   ?? this.config.timeFormat,
      appTheme:                    !App.includes(config.appTheme)       ? this.config.appTheme              : config.appTheme,
      widgetTheme:                 !Widget.includes(config.widgetTheme) ? this.config.widgetTheme           : config.widgetTheme,
      onlyWarningVibrations:       config.onlyWarningVibrations        ?? this.config.onlyWarningVibrations,
      automaticSampleGPSReference: config.automaticSampleGPSReference  ?? this.config.automaticSampleGPSReference,
    };
    return verifiedConfigDTO;
  }
}
