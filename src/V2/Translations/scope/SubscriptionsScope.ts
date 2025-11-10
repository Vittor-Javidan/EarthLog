import { LanguageTag } from '@V2/Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Subscriptions': string
}>

export const R_Scope_Subscriptions: TranslationDTO = {
  'en-US': {
    'Subscriptions': 'Subscriptions'
  },
  'pt-BR': {
    'Subscriptions': 'Assinaturas'
  },
};
