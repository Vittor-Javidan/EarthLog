import {getDeviceLanguage} from '../Scripts/getDeviceLanguage';
import {languageTags} from '../Types/languageTags';

export default class Settings {
  static language: Languages = getDeviceLanguage();
  static setLanguage(language: Languages): void {
    this.language = language;
  }
}

export type Languages = (typeof languageTags)[number];
