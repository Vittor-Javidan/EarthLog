import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project': string
}>

export const R_ProjectScope: TranslationDTO = {
  'en-US': {
    'Project': 'Project',
  },
  'pt-BR': {
    'Project': 'Projeto',
  },
};
