import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Sample name': string
}>

export const R_Alert_CreateSample: TranslationDTO = {
  'en-US': {
    'Sample name': 'Sample name',
  },
  'pt-BR': {
    'Sample name': 'Nome da amostra',
  },
};
