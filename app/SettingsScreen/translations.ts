import { Languages } from '@Services/LanguageService';

export type ConfigScreenTranslations = Record<Languages, {
  'Settings': string
  'Language': string
  'Theme': string
  'Back': string
}>

export const languages: ConfigScreenTranslations = {
  'en-US': {
    'Settings': 'Settings',
    'Language': 'Language',
    'Theme': 'Theme',
    'Back': 'Back',
  },
  'pt-BR': {
    'Settings': 'Configurações',
    'Language': 'Idioma',
    'Theme': 'Tema',
    'Back': 'Voltar',
  },
};
