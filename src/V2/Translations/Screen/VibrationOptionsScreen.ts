import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Default': string
  'Only warnings': string
}>

export const R_Screen_VibrationOptions: TranslationDTO = {
  'en-US': {
    'Default': 'Default',
    'Only warnings': 'Only warnings',
  },
  'pt-BR': {
    'Default': 'Padrão',
    'Only warnings': 'Apenas avisos',
  },
};
