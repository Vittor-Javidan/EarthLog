import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Export project': string
}>

export const R_ExportProjectScope: TranslationDTO = {
  'en-US': {
    'Export project': 'Export project',
  },
  'pt-BR': {
    'Export project': 'Exportar projeto',
  },
};
