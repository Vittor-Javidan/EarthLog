import {Languages} from '../../Services/LanguageService';

export type ConfigScreenTranslations = Record<Languages, {
  'Settings': string
  'Main Screen': string
  'SAVE': string
}>

export const languages: ConfigScreenTranslations = {
  'en-US': {
    'Settings': 'Settings',
    'Main Screen': 'Main Screen',
    'SAVE': 'Save Settings',
  },
  'pt-BR': {
    'Settings': 'Configurações',
    'Main Screen': 'Tela Inicial',
    'SAVE': 'SALVAR',
  },
};
