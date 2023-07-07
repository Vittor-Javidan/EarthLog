import { Languages } from '../../../Types/LanguageTypes';

export type AvailableLanguagesScreen_Translations = Record<Languages, {
  'Languages': string
  'Back': string
}>

export const languages: AvailableLanguagesScreen_Translations = {
  'en-US': {
    'Languages': 'Languages',
    'Back': 'Back',
  },
  'pt-BR': {
    'Languages': 'Idiomas',
    'Back': 'Voltar',
  },
};
