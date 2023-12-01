import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to delete this option': string
}>

export const R_Input_Options: TranslationDTO = {
  'en-US': {
    'Confirm to delete this option': 'Confirm to delete this option',
  },
  'pt-BR': {
    'Confirm to delete this option': 'Confirme para deletar esta opção',
  },
};
