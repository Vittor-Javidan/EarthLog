import { LanguageTag } from '@V2/Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Language': string
  'Date and time': string
  'Themes': string
  'Vibration': string
  'Whipe ALL DATA': string
}>

export const R_Screen_Settings: TranslationDTO = {
  'en-US': {
    'Language': 'Language',
    'Date and time': 'Date and time',
    'Themes': 'Themes',
    'Vibration': 'Vibration',
    'Whipe ALL DATA': 'Whipe ALL DATA',
  },
  'pt-BR': {
    'Language': 'Idioma',
    'Date and time': 'Data e hora',
    'Themes': 'Temas',
    'Vibration': 'Vibração',
    'Whipe ALL DATA': 'Limpar TODOS OS DADOS',
  },
};
