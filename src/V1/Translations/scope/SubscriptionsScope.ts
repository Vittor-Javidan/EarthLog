import {
  LanguageTag
} from '@V1/Types';

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
