import { Languages } from '@Services/LanguageService';

export type MainScreenTranslations = Record<Languages, {
  'Settings': string
  'New Project': string
}>

export const languages: MainScreenTranslations = {
  'en-US': {
    'Settings': 'Settings',
    'New Project': 'New Project',
  },
  'pt-BR': {
    'Settings': 'Configurações',
    'New Project': 'Novo Projeto',
  },
};
