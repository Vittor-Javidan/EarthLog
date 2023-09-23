import { LanguageTag } from '@Types/AppTypes';


export type Translations_LanguagesScreen = Record<LanguageTag, {
  'Languages': string
  'Back': string
}>

export const translations_LanguagesScreen: Translations_LanguagesScreen = {
  'en-US': {
    'Languages': 'Languages',
    'Back': 'Back',
  },
  'pt-BR': {
    'Languages': 'Idiomas',
    'Back': 'Voltar',
  },
};
