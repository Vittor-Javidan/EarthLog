import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Settings': string
}>

export const R_Scope_Settings: TranslationDTO = {
  'en-US': {
    'Settings': 'Settings',
  },
  'pt-BR': {
    'Settings': 'Configurações',
  },
};
