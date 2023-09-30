import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Settings': string
}>

export const R_SettingsScope: TranslationDTO = {
  'en-US': {
    'Settings': 'Settings',
  },
  'pt-BR': {
    'Settings': 'Configurações',
  },
};
