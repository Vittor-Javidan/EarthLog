import {
  LanguageTag
} from '@V1/Types';

type TranslationDTO = Record<LanguageTag, {
  'Declination': string
  'Average': string
  'Heading': string,
  'Dip': string,
  'Horizontal!!!': string,
  'Max Dip!!!': string,
}>

export const R_Layer_Compass: TranslationDTO = {
  'en-US': {
    'Declination': 'Declination',
    'Average': 'Average',
    'Heading': 'Heading',
    'Dip': 'Dip',
    'Horizontal!!!': 'Horizontal!!!',
    'Max Dip!!!': 'Max Dip!!!',
  },
  'pt-BR': {
    'Declination': 'Declinação',
    'Average': 'Média',
    'Heading': 'Azimute',
    'Dip': 'Inclinação',
    'Horizontal!!!': 'Horizontal!!!',
    'Max Dip!!!': 'Inclinação Máxima!!!',
  },
};
