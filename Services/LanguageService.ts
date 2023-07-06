import { Languages, languageTags } from '../Types/LanguageTypes';
import { getLocales } from 'expo-localization';

export default class LanguageService {

  static getDeviceLanguage(): Languages {
    const languageTag = getLocales()[0].languageTag as Languages;
    if (languageTags.includes(languageTag)) {
      return languageTag;
    }
    return 'en-US';
  }
}
