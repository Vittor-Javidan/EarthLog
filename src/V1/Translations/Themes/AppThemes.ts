import { LanguageTag, ThemeNames_APP } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, Record<ThemeNames_APP, string>>

export const R_Themes_App: TranslationDTO = {
  'en-US': {
    'Dark': 'Dark',
    'Light': 'Light',
  },
  'pt-BR': {
    'Dark': 'Escuro',
    'Light': 'Claro',
  },
};
