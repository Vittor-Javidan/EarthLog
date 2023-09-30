import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project': string
  'Samples': string
}>

export const R_ProjectScope: TranslationDTO = {
  'en-US': {
    'Project': 'Project',
    'Samples': 'Samples',
  },
  'pt-BR': {
    'Project': 'Projeto',
    'Samples': 'Amostras',
  },
};
