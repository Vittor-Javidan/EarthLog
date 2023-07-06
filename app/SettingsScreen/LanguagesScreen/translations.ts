import { Languages } from '../../../Types/LanguageTypes';

export type AvailableLanguagesScreen_Translations = Record<Languages, {
  'Languages': string
}>

export const languages: AvailableLanguagesScreen_Translations = {
  'en-US': {
    'Languages': 'Languages',
  },
  'pt-BR': {
    'Languages': 'Idiomas',
  },
};
