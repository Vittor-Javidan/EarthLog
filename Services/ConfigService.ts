import { useEffect } from 'react';
import LocalStorageService from './LocalStorageService';
import LanguageService, { Languages } from './LanguageService';
import LogService from './LogService';

export type ConfigDTO = {
  language: Languages
}

export default class ConfigService {

  private static LOCAL_STORAGE_KEY: string = 'config';
  private static DEFAULT_CONFIG: ConfigDTO = {
    language: LanguageService.getDeviceLanguage(),
  };

  static config: ConfigDTO = this.DEFAULT_CONFIG;

  static async loadConfig(onFinish: () => void): Promise<void> {
    const data = await LocalStorageService.getData(ConfigService.LOCAL_STORAGE_KEY);
    if (data) {
      const verifiedData = this.verifyConfigDTOIntegrity(JSON.parse(data));
      this.config = verifiedData;
    }
    onFinish();
  }

  static async saveConfig(configData: ConfigDTO): Promise<void> {
    await LocalStorageService.saveData(ConfigService.LOCAL_STORAGE_KEY, JSON.stringify(configData));
  }

  /** Garantees migration when local storage config data is outdated */
  private static verifyConfigDTOIntegrity(dto: ConfigDTO): ConfigDTO {
    const verifiedConfigDTO: ConfigDTO = {
      language: dto.language ? dto.language : ConfigService.DEFAULT_CONFIG.language,
    };
    return verifiedConfigDTO;
  }

  useLoadConfig(onFinish: () => void) {
    useEffect(() => {
      LogService.useLog('Config Loading...');
      ConfigService.loadConfig(() => {
        onFinish();
        LogService.useLog('Config Loaded!');
      });
    }, []);
  }
}
