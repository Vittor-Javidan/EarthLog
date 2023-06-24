import {languageTags} from '../Types/languageTags';
import {getLocales} from 'expo-localization';

export type Languages = (typeof languageTags)[number];

export default class LanguageService {

  static getDeviceLanguage(): Languages {
    const languageTag = getLocales()[0].languageTag as Languages;
    if (languageTags.includes(languageTag)) {
      return languageTag;
    }
    return 'en-US';
  }
}
