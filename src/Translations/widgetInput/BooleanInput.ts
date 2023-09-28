import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'true': string
  'false': string
}>

export const R_BooleanInput: TranslationDTO = {
  'en-US': {
    'true': 'TRUE',
    'false': 'FALSE',
  },
  'pt-BR': {
    'true': 'VERDADEIRO',
    'false': 'FALSO',
  },
};
