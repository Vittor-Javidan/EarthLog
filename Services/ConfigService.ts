import LocalStorageService from './LocalStorageService';
import LanguageService, { Languages } from './LanguageService';

export type ConfigDTO = {
  language: Languages
}

export default class ConfigService {

  private static LOCAL_STORAGE_KEY: string = 'config';
  private static DEFAULT_CONFIG: ConfigDTO = {
    language: LanguageService.getDeviceLanguage(),
  };

  async getConfig(): Promise<ConfigDTO> {
    const data = await new LocalStorageService().getData(ConfigService.LOCAL_STORAGE_KEY);
    if (data) {
      const verifiedData = this.verifyConfigDTOIntegrity(JSON.parse(data));
      return verifiedData;
    }
    return ConfigService.DEFAULT_CONFIG;
  }

  async saveConfig(configData: ConfigDTO): Promise<void> {
    await new LocalStorageService().saveData(ConfigService.LOCAL_STORAGE_KEY, JSON.stringify(configData));
  }

  /** Garantees migration when local storage config data is outdated */
  private verifyConfigDTOIntegrity(dto: ConfigDTO): ConfigDTO {
    const verifiedConfigDTO: ConfigDTO = {
      language: dto.language ? dto.language : ConfigService.DEFAULT_CONFIG.language,
    };
    return verifiedConfigDTO;
  }
}
