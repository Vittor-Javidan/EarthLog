import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to delete this option': string
  'Option name': string
}>

export const R_Input_Selection: TranslationDTO = {
  'en-US': {
    'Confirm to delete this option': 'Confirm to delete this option',
    'Option name': 'Option name',
  },
  'pt-BR': {
    'Confirm to delete this option': 'Confirme para deletar esta opção',
    'Option name': 'Nome da opção',
  },
};
