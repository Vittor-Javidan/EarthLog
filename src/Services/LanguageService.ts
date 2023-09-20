import { getLocales } from 'expo-localization';

import { Languages, languageTags } from '@Types/AppTypes';

export default class LanguageService {

  static getDeviceLanguage(): Languages {
    const languageTag = getLocales()[0].languageTag as Languages;
    if (languageTags.includes(languageTag)) {
      return languageTag;
    }
    return 'en-US';
  }
}
