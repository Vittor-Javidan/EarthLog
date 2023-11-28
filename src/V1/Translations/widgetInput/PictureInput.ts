import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to permanently delete this picture. This action cannot be undone.': string
}>

export const R_Input_Picture: TranslationDTO = {
  'en-US': {
    'Confirm to permanently delete this picture. This action cannot be undone.': 'Confirm to permanently delete this picture. This action cannot be undone.',
  },
  'pt-BR': {
    'Confirm to permanently delete this picture. This action cannot be undone.': 'Isso irá apagar essa foto permanentemente. Essa ação não pode ser desfeita.',
  },
};
