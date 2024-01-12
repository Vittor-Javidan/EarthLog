import { getLocales } from 'expo-localization';

import { LanguageTag, languageTags } from '@V2/Types/AppTypes';

export default class LanguageService {

  static getDeviceLanguage(): LanguageTag {
    const languageTag = getLocales()[0].languageTag as LanguageTag;
    if (languageTags.includes(languageTag)) {
      return languageTag;
    }
    return 'en-US';
  }
}
