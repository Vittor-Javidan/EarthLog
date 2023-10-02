import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Credentials': string
}>

export const R_CredentialScope: TranslationDTO = {
  'en-US': {
    'Credentials': 'Credentials',
  },
  'pt-BR': {
    'Credentials': 'Credenciais',
  },
};
