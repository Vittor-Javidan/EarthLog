import { getLocales } from 'expo-localization';

export const languageTags = ['en-US', 'pt-BR'] as const;
export const languageLabels = ['English', 'Português-Brasil'] as const;
export type Languages = (typeof languageTags)[number];
export type LanguageTags = (typeof languageTags)[number];

export default class LanguageService {

  static getDeviceLanguage(): Languages {
    const languageTag = getLocales()[0].languageTag as Languages;
    if (languageTags.includes(languageTag)) {
      return languageTag;
    }
    return 'en-US';
  }
}
