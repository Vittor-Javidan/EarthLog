import {
  LanguageTag
} from '@V2/Types';

type TranslationDTO = Record<LanguageTag, {
  'Available versions': string
}>

export const R_Scope_VersionChange: TranslationDTO = {
  'en-US': {
    'Available versions': 'Available versions',
  },
  'pt-BR': {
    'Available versions': 'Versões disponíveis',
  },
};
