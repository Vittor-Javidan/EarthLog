import { Languages } from '../../../Types/LanguageTypes';

export type AvailableLanguagesScreen_Translations = Record<Languages, {
  'Languages': string
  'Main Screen': string
  'Settings Screen': string
}>

export const languages: AvailableLanguagesScreen_Translations = {
  'en-US': {
    'Languages': 'Languages',
    'Main Screen': 'Main Screen',
    'Settings Screen': 'Settings Screen',
  },
  'pt-BR': {
    'Languages': 'Idiomas',
    'Main Screen': 'Tela Inicial',
    'Settings Screen': 'Tela de Configurações',
  },
};
