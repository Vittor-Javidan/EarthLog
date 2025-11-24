import {
  LanguageTag,
  ThemeNames_APP
} from '@V1/Types';

type TranslationDTO = Record<LanguageTag, Record<ThemeNames_APP, string>>

export const R_Themes_App: TranslationDTO = {
  'en-US': {
    'Dark': 'Dark',
    'Dark High Constrast': 'Dark High Constrast',
    'Light': 'Light',
  },
  'pt-BR': {
    'Dark': 'Escuro',
    'Dark High Constrast': 'Escuro Alto Contraste',
    'Light': 'Claro',
  },
};
