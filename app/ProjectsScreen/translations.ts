import { Languages } from '../../Types/LanguageTypes';

export type MainScreenTranslations = Record<Languages, {
  'Settings': string
}>

export const languages: MainScreenTranslations = {
  'en-US': {
    'Settings': 'Settings',
  },
  'pt-BR': {
    'Settings': 'Configurações',
  },
};
