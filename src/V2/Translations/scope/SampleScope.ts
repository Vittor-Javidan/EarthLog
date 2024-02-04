import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Sample': string
}>

export const R_Scope_Sample: TranslationDTO = {
  'en-US': {
    'Sample': 'Sample',
  },
  'pt-BR': {
    'Sample': 'Amostra',
  },
};
