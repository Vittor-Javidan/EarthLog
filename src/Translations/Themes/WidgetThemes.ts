import { LanguageTag, ThemeNames_Widgets } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, Record<ThemeNames_Widgets, string>>

export const R_WidgetThemes: TranslationDTO = {
  'en-US': {
    'Dark': 'Dark',
    'Light': 'Light',
  },
  'pt-BR': {
    'Dark': 'Escuro',
    'Light': 'Claro',
  },
};
