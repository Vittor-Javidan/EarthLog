import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to permanently delete this picture. This action cannot be undone.': string
  'Write here the picture caption': string
  '* Templates are not allowed to take pictures': string
  'Picture': string
}>

export const R_Input_Picture: TranslationDTO = {
  'en-US': {
    'Confirm to permanently delete this picture. This action cannot be undone.': 'Confirm to permanently delete this picture. This action cannot be undone.',
    'Write here the picture caption': 'Write here the picture caption',
    '* Templates are not allowed to take pictures': '* Templates are not allowed to take pictures',
    'Picture': 'Picture',
  },
  'pt-BR': {
    'Confirm to permanently delete this picture. This action cannot be undone.': 'Isso irá apagar essa foto permanentemente. Essa ação não pode ser desfeita.',
    'Write here the picture caption': 'Escreva aqui a legenda da foto',
    '* Templates are not allowed to take pictures': '* Templates não podem tirar foto',
    'Picture': 'Foto',
  },
};
