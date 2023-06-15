import {languageTags} from '../Types/languageTags';
import {getLocales} from 'expo-localization';

export default class LanguageService {

  getDeviceLanguage(): Languages {
    const languageTag = getLocales()[0].languageTag as Languages;
    if (languageTags.includes(languageTag)) {
      return languageTag;
    }
    return 'en-US';
  }
}

export type Languages = (typeof languageTags)[number];
