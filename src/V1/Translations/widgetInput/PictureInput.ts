import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to permanently delete this picture. This action cannot be undone.': string
  '* Templates are not allowed to take pictures': string
}>

export const R_Input_Picture: TranslationDTO = {
  'en-US': {
    'Confirm to permanently delete this picture. This action cannot be undone.': 'Confirm to permanently delete this picture. This action cannot be undone.',
    '* Templates are not allowed to take pictures': '* Templates are not allowed to take pictures',
  },
  'pt-BR': {
    'Confirm to permanently delete this picture. This action cannot be undone.': 'Isso irá apagar essa foto permanentemente. Essa ação não pode ser desfeita.',
    '* Templates are not allowed to take pictures': '* Templates não podem tirar foto',
  },
};
