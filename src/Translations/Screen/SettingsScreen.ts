import { LanguageTag } from '@Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Language': string
  'Credentials': string
}>

export const R_SettingsScreen: TranslationDTO = {
  'en-US': {
    'Language': 'Language',
    'Credentials': 'Credentials',
  },
  'pt-BR': {
    'Language': 'Idioma',
    'Credentials': 'Credenciais',
  },
};
