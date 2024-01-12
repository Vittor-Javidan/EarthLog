import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Release to confirm': string
  'Cancel': string
}>

export const R_Button: TranslationDTO = {
  'en-US': {
    'Release to confirm': 'Release to confirm',
    'Cancel': 'Cancel',
  },
  'pt-BR': {
    'Release to confirm': 'Solte para confirmar',
    'Cancel': 'Cancelar',
  },
};
