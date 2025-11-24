import {
  LanguageTag
} from '@V1/Types';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to delete this measurement': string;
}>

export const R_Input_Compass: TranslationDTO = {
  'en-US': {
    'Confirm to delete this measurement': 'Confirm to delete this measurement',
  },
  'pt-BR': {
    'Confirm to delete this measurement': 'Confirme para excluir esta medida',
  },
};
