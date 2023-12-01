import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Credentials': string
}>

export const R_Scope_Credential: TranslationDTO = {
  'en-US': {
    'Credentials': 'Credentials',
  },
  'pt-BR': {
    'Credentials': 'Credenciais',
  },
};
