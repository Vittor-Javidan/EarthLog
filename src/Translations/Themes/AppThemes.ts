import { LanguageTag, ThemeNames_APP } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, Record<ThemeNames_APP, string>>

export const R_AppThemes: TranslationDTO = {
  'en-US': {
    'Dark': 'Dark',
    'Light': 'Light',
  },
  'pt-BR': {
    'Dark': 'Escuro',
    'Light': 'Claro',
  },
};
