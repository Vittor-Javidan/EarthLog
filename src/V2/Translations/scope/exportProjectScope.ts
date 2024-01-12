import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Export project': string
}>

export const R_Scope_ExportProject: TranslationDTO = {
  'en-US': {
    'Export project': 'Export project',
  },
  'pt-BR': {
    'Export project': 'Exportar projeto',
  },
};
