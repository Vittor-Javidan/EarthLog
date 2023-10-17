import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project': string
  'Samples': string
  'Export project': string
}>

export const R_ProjectScope: TranslationDTO = {
  'en-US': {
    'Project': 'Project',
    'Samples': 'Samples',
    'Export project': 'Export project',
  },
  'pt-BR': {
    'Project': 'Projeto',
    'Samples': 'Amostras',
    'Export project': 'Exportar projeto',
  },
};
