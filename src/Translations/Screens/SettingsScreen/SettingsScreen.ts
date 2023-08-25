import { Languages } from '@Types/index';

export type Translations_SettingsScreen = Record<Languages, {
  'Settings': string
  'Language': string
  'Theme': string
  'Whipe Database': string
  'Hold on!': string
  'Want to whipe database?': string
  'NO': string
  'YES': string
}>

export const translations_SettingsScreen: Translations_SettingsScreen = {
  'en-US': {
    'Settings': 'Settings',
    'Language': 'Language',
    'Theme': 'Theme',
    'Whipe Database': 'Whipe Database',
    'Hold on!': 'Hold on!',
    'Want to whipe database?': 'Want to whipe database?',
    'NO': 'NO',
    'YES': 'YES',
  },
  'pt-BR': {
    'Settings': 'Configurações',
    'Language': 'Idioma',
    'Theme': 'Tema',
    'Whipe Database': 'Deletar banco de dados',
    'Hold on!': 'Espere um pouco!',
    'Want to whipe database?': 'Deseja deletar o banco de dados?',
    'NO': 'NÃO',
    'YES': 'SIM',
  },
};
