import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'true': string
  'false': string
  'N/A:': string
}>

export const R_Input_Boolean: TranslationDTO = {
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
