import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Upload this project to?': string
  'Error': string
  'Connecting...': string
}>

export const R_Alert_UploadProject: TranslationDTO = {
  'en-US': {
    'Upload this project to?': 'Upload this project to?',
    'Error': 'Error',
    'Connecting...': 'Connecting...',
  },
  'pt-BR': {
    'Upload this project to?': 'Enviar este projeto para?',
    'Error': 'Erro',
    'Connecting...': 'Conectando...',
  },
};
