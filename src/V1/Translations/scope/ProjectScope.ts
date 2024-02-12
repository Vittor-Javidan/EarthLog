import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project': string
  'Samples': string
  'Sample': string
  'Export project': string
  'Download all pictures': string
}>

export const R_Scope_Project: TranslationDTO = {
  'en-US': {
    'Project': 'Project',
    'Samples': 'Samples',
    'Sample': 'Sample',
    'Export project': 'Export project',
    'Download all pictures': 'Download all pictures',
  },
  'pt-BR': {
    'Project': 'Projeto',
    'Samples': 'Amostras',
    'Sample': 'Amostra',
    'Export project': 'Exportar projeto',
    'Download all pictures': 'Baixar todas imagens',
  },
};
