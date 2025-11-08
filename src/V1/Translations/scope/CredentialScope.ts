import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Credentials': string
  'Create a server': string
}>

export const R_Scope_Credential: TranslationDTO = {
  'en-US': {
    'Credentials': 'Credentials',
    'Create a server': 'Create a server',
  },
  'pt-BR': {
    'Credentials': 'Credenciais',
    'Create a server': 'Crie um servidor',
  },
};
