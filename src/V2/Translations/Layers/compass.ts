import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Declination': string
  'Horizontal!!!': string,
  'Max Dip!!!': string,
}>

export const R_Layer_Compass: TranslationDTO = {
  'en-US': {
    'Declination': 'Declination',
    'Horizontal!!!': 'Horizontal!!!',
    'Max Dip!!!': 'Max Dip!!!',
  },
  'pt-BR': {
    'Declination': 'Declinação',
    'Horizontal!!!': 'Horizontal!!!',
    'Max Dip!!!': 'Inclinação Máxima!!!',
  },
};
