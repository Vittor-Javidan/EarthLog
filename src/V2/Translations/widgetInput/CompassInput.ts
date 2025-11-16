import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to delete this measurement': string;
  'H': string;
  'D': string;
}>

export const R_Input_Compass: TranslationDTO = {
  'en-US': {
    'Confirm to delete this measurement': 'Confirm to delete this measurement',
    'H': 'H',
    'D': 'D',
  },
  'pt-BR': {
    'Confirm to delete this measurement': 'Confirme para excluir esta medida',
    'H': 'A',
    'D': 'i',
  },
};
