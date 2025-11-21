import DevTools from '@DevTools';
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
    compassDeclination: 0,
    compassAverageMeasurements: 1,
    tutorialMode: false,
    tutorial_bubbleLevel: true,
    tutorial_map: true,
  };

  static async loadConfig(): Promise<void> {
    const config = await FOLDER_Config.get();
    if (config) {
      const verifiedConfig = this.verifyConfigDTOIntegrity({ config });
      this.config = verifiedConfig;
      DevTools.TUTORIAL_MODE = this.config.tutorialMode;
    }
  }

  static async saveConfig(): Promise<void> {
    await FOLDER_Config.update({ config: this.config });
  }

  static resetTutorials(): void {
    this.config.tutorial_bubbleLevel = true;
    this.config.tutorial_map = true;
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
      compassDeclination:          config.compassDeclination           ?? this.config.compassDeclination,
      compassAverageMeasurements:  config.compassAverageMeasurements   ?? this.config.compassAverageMeasurements,
      tutorialMode:                config.tutorialMode                 ?? this.config.tutorialMode,
      tutorial_bubbleLevel:        config.tutorial_bubbleLevel         ?? this.config.tutorial_bubbleLevel,
      tutorial_map:                config.tutorial_map                 ?? this.config.tutorial_map,
    };
    return verifiedConfigDTO;
  }
}
