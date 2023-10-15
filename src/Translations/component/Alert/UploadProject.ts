import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Upload this project to?': string
  'Deleting project': string
  'Updating sync data file': string
}>

export const R_Alert_UploadProject: TranslationDTO = {
  'en-US': {
    'Upload this project to?': 'Upload this project to?',
    'Deleting project': 'Deleting project',
    'Updating sync data file': 'Updating sync data file',
  },
  'pt-BR': {
    'Upload this project to?': 'Enviar este projeto para?',
    'Deleting project': 'Deletando projeto',
    'Updating sync data file': 'Atualizando arquivo de syncronização',
  },
};
