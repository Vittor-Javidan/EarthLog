import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Widget preview': string
  'Text': string
  'Write Something here': string
  'True/False': string
  'GPS': string
}>

export const R_WidgetThemePreview: TranslationDTO = {
  'en-US': {
    'Widget preview': 'Widget Preview',
    'Text': 'Text',
    'Write Something here': 'Write Something here',
    'True/False': 'True/False',
    'GPS': 'GPS',
  },
  'pt-BR': {
    'Widget preview': 'Prévia do widget',
    'Text': 'Texto',
    'Write Something here': 'Escreva alguma coisa aqui',
    'True/False': 'Verdadeiro/Falso',
    'GPS': 'GPS',
  },
};
