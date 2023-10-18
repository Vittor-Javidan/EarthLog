import { LanguageTag } from '@Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Language': string
  'Date and time': string
  'Themes': string
  'Credentials': string
}>

export const R_Screen_Settings: TranslationDTO = {
  'en-US': {
    'Language': 'Language',
    'Date and time': 'Date and time',
    'Themes': 'Themes',
    'Credentials': 'Credentials',
  },
  'pt-BR': {
    'Language': 'Idioma',
    'Date and time': 'Data e hora',
    'Themes': 'Temas',
    'Credentials': 'Credenciais',
  },
};
