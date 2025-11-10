import { LanguageTag, ThemeNames_Widgets } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, Record<ThemeNames_Widgets, string>>

export const R_Themes_Widget: TranslationDTO = {
  'en-US': {
    'Dark': 'Dark',
    'Light': 'Light',
  },
  'pt-BR': {
    'Dark': 'Escuro',
    'Light': 'Claro',
  },
};
