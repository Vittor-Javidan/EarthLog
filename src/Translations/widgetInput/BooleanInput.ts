import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'true': string
  'false': string
  'N/A:': string
}>

export const R_BooleanInput: TranslationDTO = {
  'en-US': {
    'true': 'TRUE',
    'false': 'FALSE',
    'N/A:': 'N/A:',
  },
  'pt-BR': {
    'true': 'VERDADEIRO',
    'false': 'FALSO',
    'N/A:': 'N/A:',
  },
};