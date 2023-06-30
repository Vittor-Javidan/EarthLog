import { useEffect } from 'react';
import LocalStorageService from './LocalStorageService';
import LanguageService from './LanguageService';
import { Languages } from '../Types/LanguageTypes';

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

  static async saveConfig(): Promise<void> {
    await LocalStorageService.saveData(ConfigService.LOCAL_STORAGE_KEY, JSON.stringify(this.config));
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
      ConfigService.loadConfig(() => { onFinish(); });
    }, []);
  }
}
