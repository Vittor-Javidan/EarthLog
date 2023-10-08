import { LanguageTag } from '@Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Language': string
  'Credentials': string
  'Themes': string
}>

export const R_SettingsScreen: TranslationDTO = {
  'en-US': {
    'Language': 'Language',
    'Credentials': 'Credentials',
    'Themes': 'Themes',
  },
  'pt-BR': {
    'Language': 'Idioma',
    'Credentials': 'Credenciais',
    'Themes': 'Temas',
  },
};
