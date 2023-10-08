import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project ID undefined': string
  'Upload this project to?': string
  'Error': string
  'Connecting...': string
}>

export const R_Alert_UploadProject: TranslationDTO = {
  'en-US': {
    'Project ID undefined': 'Project ID undefined',
    'Upload this project to?': 'Upload this project to?',
    'Error': 'Error',
    'Connecting...': 'Connecting...',
  },
  'pt-BR': {
    'Project ID undefined': 'ID do projeto indefinido',
    'Upload this project to?': 'Enviar este projeto para?',
    'Error': 'Erro',
    'Connecting...': 'Conectando...',
  },
};
