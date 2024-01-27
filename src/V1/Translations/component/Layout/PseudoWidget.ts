import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Saved': string
  'Saving...': string
  'Server name': string
}>

export const R_Layout_PseudoWidget: TranslationDTO = {
  'en-US': {
    'Saved': 'Saved',
    'Saving...': 'Saving...',
    'Server name': 'Server name',
  },
  'pt-BR': {
    'Saved': 'Salvo',
    'Saving...': 'Salvando...',
    'Server name': 'Nome do servidor',
  },
};
