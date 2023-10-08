import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Download new projects from?': string
  'Error': string
  'Connecting...': string
  'Projects available:': string
}>

export const R_Alert_DownloadProjects: TranslationDTO = {
  'en-US': {
    'Download new projects from?': 'Download new projects from?',
    'Error': 'Error',
    'Connecting...': 'Connecting...',
    'Projects available:': 'Projects available:',
  },
  'pt-BR': {
    'Download new projects from?': 'Escolha onde fazer donwload?',
    'Error': 'Erro',
    'Connecting...': 'Conectando...',
    'Projects available:': 'Projetos disponíveis:',
  },
};
