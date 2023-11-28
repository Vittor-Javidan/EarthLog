import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Saved': string
  'Saving...': string
}>

export const R_Layout_PseudoWidget: TranslationDTO = {
  'en-US': {
    'Saved': 'Saved',
    'Saving...': 'Saving...',
  },
  'pt-BR': {
    'Saved': 'Salvo',
    'Saving...': 'Salvando...',
  },
};
