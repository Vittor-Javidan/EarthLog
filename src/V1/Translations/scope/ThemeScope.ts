import {
  LanguageTag
} from '@V1/Types';

export type TranslationDTO = Record<LanguageTag, {
  'Themes': string
  'App': string
  'Widget': string
  'Preview': string
}>

export const R_Scope_Theme: TranslationDTO = {
  'en-US': {
    'Themes': 'Themes',
    'App': 'App',
    'Widget': 'Widget',
    'Preview': 'Preview',
  },
  'pt-BR': {
    'Themes': 'Temas',
    'App': 'Aplicativo',
    'Widget': 'Widget',
    'Preview': 'Prévia',
  },
};
