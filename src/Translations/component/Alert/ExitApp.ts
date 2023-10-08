import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Want to exit?': string
}>

export const R_Alert_ExitApp: TranslationDTO = {
  'en-US': {
    'Want to exit?': 'Want to exit?',
  },
  'pt-BR': {
    'Want to exit?': 'Deseja sair?',
  },
};
