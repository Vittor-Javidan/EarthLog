import { Languages } from '../../Types/LanguageTypes';

export type ConfigScreenTranslations = Record<Languages, {
  'Settings': string
  'Main Screen': string
  'SAVE': string
  'Language': string
  'Theme': string
}>

export const languages: ConfigScreenTranslations = {
  'en-US': {
    'Settings': 'Settings',
    'Main Screen': 'Main Screen',
    'SAVE': 'Save Settings',
    'Language': 'Language',
    'Theme': 'Theme',
  },
  'pt-BR': {
    'Settings': 'Configurações',
    'Main Screen': 'Tela Inicial',
    'SAVE': 'SALVAR',
    'Language': 'Idioma',
    'Theme': 'Tema',
  },
};
