import { Languages } from '@Types/index';

export type Translations_SettingsScreen = Record<Languages, {
  'Settings': string
  'Language': string
  'Theme': string
}>

export const translations_SettingsScreen: Translations_SettingsScreen = {
  'en-US': {
    'Settings': 'Settings',
    'Language': 'Language',
    'Theme': 'Theme',
  },
  'pt-BR': {
    'Settings': 'Configurações',
    'Language': 'Idioma',
    'Theme': 'Tema',
  },
};
