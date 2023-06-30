import { useEffect } from 'react';
import LocalStorageService from './LocalStorageService';
import LanguageService from './LanguageService';
import { Languages } from '../Types/LanguageTypes';
import ThemeService, { ThemeDTO } from './ThemeService';

export type ConfigDTO = {
  language: Languages
  theme: ThemeDTO
}

export default class ConfigService {

  static LOCAL_STORAGE_KEY: string = 'config';
  static DEFAULT_CONFIG: ConfigDTO = {
    language: LanguageService.getDeviceLanguage(),
    theme: ThemeService.default,
  };

  // Used as actual Config in the App.
  static config: ConfigDTO = {
    language: this.DEFAULT_CONFIG.language,
    theme: { ...this.DEFAULT_CONFIG.theme },
  };

  static async loadConfig(onFinish: () => void): Promise<void> {
    const data = await LocalStorageService.getData(ConfigService.LOCAL_STORAGE_KEY);
    if (data) {
      const verifiedData = this.verifyConfigDTOIntegrity(JSON.parse(data));
      this.config = verifiedData;
    }
    onFinish();
  }

  static async saveConfig(): Promise<void> {
    await LocalStorageService.saveData(ConfigService.LOCAL_STORAGE_KEY, JSON.stringify(this.config));
  }

  /** Garantees migration when local storage config data is outdated */
  private static verifyConfigDTOIntegrity(dto: ConfigDTO): ConfigDTO {

    const defaultLanguage = ConfigService.DEFAULT_CONFIG.language;
    const verifiedLanguage = dto.language ?? defaultLanguage;

    const defaultTheme = ConfigService.DEFAULT_CONFIG.theme;
    const dtoTheme = dto.theme ?? defaultTheme;
    const verifiedTheme: ThemeDTO = {
      background: dtoTheme.background ?? defaultTheme.background,
      onBackground: dtoTheme.onBackground ?? defaultTheme.onBackground,
      primary: dtoTheme.primary ?? defaultTheme.primary,
      onPrimary: dtoTheme.onPrimary ?? defaultTheme.onPrimary,
      secondary: dtoTheme.secondary ?? defaultTheme.secondary,
      onSecondary: dtoTheme.onSecondary ?? defaultTheme.onSecondary,
      tertiary: dtoTheme.tertiary ?? defaultTheme.tertiary,
      onTertiary: dtoTheme.onTertiary ?? defaultTheme.onTertiary,
      onPressColorPrimary: dtoTheme.onPressColorPrimary ?? defaultTheme.onPressColorPrimary,
      confirm: dtoTheme.confirm ?? defaultTheme.confirm,
      onConfirm: dtoTheme.onConfirm ?? defaultTheme.onConfirm,
      modified: dtoTheme.modified ?? defaultTheme.modified,
      onModified: dtoTheme.onModified ?? defaultTheme.onModified,
      wrong: dtoTheme.wrong ?? defaultTheme.wrong,
      onWrong: dtoTheme.onWrong ?? defaultTheme.onWrong,
    };

    const verifiedConfigDTO: ConfigDTO = {
      language: verifiedLanguage,
      theme: verifiedTheme,
    };

    return verifiedConfigDTO;
  }

  useLoadConfig(onFinish: () => void) {
    useEffect(() => {
      ConfigService.loadConfig(() => { onFinish(); });
    }, []);
  }
}
