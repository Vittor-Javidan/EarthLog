import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Languages': string
}>

export const R_Scope_Language: TranslationDTO = {
  'en-US': {
    'Languages': 'Languages',
  },
  'pt-BR': {
    'Languages': 'Idiomas',
  },
};
