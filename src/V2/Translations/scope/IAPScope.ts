import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Premium subscription': string
  'Restore subscription': string
}>

export const R_Scope_IAP: TranslationDTO = {
  'en-US': {
    'Premium subscription': 'Premium subscription',
    'Restore subscription': 'Restore subscription',
  },
  'pt-BR': {
    'Premium subscription': 'Subscrição premium',
    'Restore subscription': 'Restaurar subscrição',
  },
};
