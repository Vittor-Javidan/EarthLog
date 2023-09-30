import { LanguageTag } from '@Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Language': string
}>

export const R_SettingsScreen: TranslationDTO = {
  'en-US': {
    'Language': 'Language',
  },
  'pt-BR': {
    'Language': 'Idioma',
  },
};
