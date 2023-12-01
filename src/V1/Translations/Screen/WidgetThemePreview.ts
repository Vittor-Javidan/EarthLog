import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Widget preview': string
  'Text': string
  'Write Something here': string
  'True/False': string
  'GPS': string
  'Options': string
  'Option 1': string
  'Option 2': string
  'Selection': string
}>

export const R_Screen_WidgetThemePreview: TranslationDTO = {
  'en-US': {
    'Widget preview': 'Widget Preview',
    'Text': 'Text',
    'Write Something here': 'Write Something here',
    'True/False': 'True/False',
    'GPS': 'GPS',
    'Options': 'Options',
    'Option 1': 'Option 1',
    'Option 2': 'Option 2',
    'Selection': 'Selection',
  },
  'pt-BR': {
    'Widget preview': 'Prévia do widget',
    'Text': 'Texto',
    'Write Something here': 'Escreva alguma coisa aqui',
    'True/False': 'Verdadeiro/Falso',
    'GPS': 'GPS',
    'Options': 'Opções',
    'Option 1': 'Opção 1',
    'Option 2': 'Opção 2',
    'Selection': 'Seleção',
  },
};
