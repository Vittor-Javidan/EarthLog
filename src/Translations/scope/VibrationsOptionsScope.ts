import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Vibration': string
}>

export const R_Scope_VibrationOptions: TranslationDTO = {
  'en-US': {
    'Vibration': 'Vibration',
  },
  'pt-BR': {
    'Vibration': 'Vibração',
  },
};
