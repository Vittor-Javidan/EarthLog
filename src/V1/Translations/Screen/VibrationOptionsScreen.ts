import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Only warnings': string
  'All Clicks': string
}>

export const R_Screen_VibrationOptions: TranslationDTO = {
  'en-US': {
    'Only warnings': 'Only warnings',
    'All Clicks': 'All Clicks',
  },
  'pt-BR': {
    'Only warnings': 'Apenas avisos',
    'All Clicks': 'Todos os cliques',
  },
};
