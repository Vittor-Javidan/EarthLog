import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project': string
  'Samples': string
  'Export project': string
  'Download all pictures': string
}>

export const R_Scope_Project: TranslationDTO = {
  'en-US': {
    'Project': 'Project',
    'Samples': 'Samples',
    'Export project': 'Export project',
    'Download all pictures': 'Download all pictures',
  },
  'pt-BR': {
    'Project': 'Projeto',
    'Samples': 'Amostras',
    'Export project': 'Exportar projeto',
    'Download all pictures': 'Baixar todas imagens',
  },
};
