import { Languages } from '@Services/LanguageService';

export type Translations_SettingsScreen = Record<Languages, {
  'Settings': string
  'Language': string
  'Theme': string
  'Back': string
}>

export const translations_SettingsScreen: Translations_SettingsScreen = {
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
