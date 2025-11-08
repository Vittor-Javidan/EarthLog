import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Download new projects from?': string
  'Projects available:': string
  'Starting processing': string
}>

export const R_Alert_DownloadProjects: TranslationDTO = {
  'en-US': {
    'Download new projects from?': 'Download new projects from?',
    'Projects available:': 'Projects available:',
    'Starting processing': 'Starting processing',
  },
  'pt-BR': {
    'Download new projects from?': 'Escolha onde fazer donwload?',
    'Projects available:': 'Projetos disponíveis:',
    'Starting processing': 'Inciando processamento',
  },
};
