import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Error': string
  'Done!': string
  'Error!': string
  'Summary': string
  'Just a moment...': string
}>

export const R_Alert_Shared: TranslationDTO = {
  'en-US': {
    'Error': 'Error',
    'Done!': 'Done!',
    'Error!': 'Error!',
    'Summary': 'Summary',
    'Just a moment...': 'Just a moment...',
  },
  'pt-BR': {
    'Error': 'Erro',
    'Done!': 'Pronto!',
    'Error!': 'Erro!',
    'Summary': 'Sumário',
    'Just a moment...': 'Aguarde um pouco...',
  },
};
