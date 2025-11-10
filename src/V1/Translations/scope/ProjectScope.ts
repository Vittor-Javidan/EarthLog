import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project': string
  'Samples': string
  'Sample': string
  'Export project': string
  'Download all pictures': string
  'Reset sync data': string
  'Are you sure you want to reset all sync data? The process is irreversible. Only reset this in case you want to re-upload the entire project again to a new server.': string
}>

export const R_Scope_Project: TranslationDTO = {
  'en-US': {
    'Project': 'Project',
    'Samples': 'Samples',
    'Sample': 'Sample',
    'Export project': 'Export project',
    'Download all pictures': 'Download all pictures',
    'Reset sync data': 'Reset sync data',
    'Are you sure you want to reset all sync data? The process is irreversible. Only reset this in case you want to re-upload the entire project again to a new server.': 'Are you sure you want to reset all sync data? The process is irreversible. Only reset this in case you want to re-upload the entire project again to a new server.',
  },
  'pt-BR': {
    'Project': 'Projeto',
    'Samples': 'Amostras',
    'Sample': 'Amostra',
    'Export project': 'Exportar projeto',
    'Download all pictures': 'Baixar todas imagens',
    'Reset sync data': 'Redefinir dados de sincronização',
    'Are you sure you want to reset all sync data? The process is irreversible. Only reset this in case you want to re-upload the entire project again to a new server.': 'Tem certeza de que deseja redefinir todos os dados de sincronização? O processo é irreversível. Redefina isso apenas se desejar reenviar o projeto inteiro para um novo servidor.',
  },
};
