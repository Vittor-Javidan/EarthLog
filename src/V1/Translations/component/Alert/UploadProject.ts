import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Upload this project to?': string
  'Deleting project': string
  'Updating project locally': string
  'Updating cache': string
  'Updating sync data file': string
}>

export const R_Alert_UploadProject: TranslationDTO = {
  'en-US': {
    'Upload this project to?': 'Upload this project to?',
    'Deleting project': 'Deleting project',
    'Updating project locally': 'Updating project locally',
    'Updating cache': 'Updating cache',
    'Updating sync data file': 'Updating sync data file',
  },
  'pt-BR': {
    'Upload this project to?': 'Enviar este projeto para?',
    'Deleting project': 'Deletando projeto',
    'Updating project locally': 'Atualizando projeto localmente',
    'Updating cache': 'Atualizando cache',
    'Updating sync data file': 'Atualizando arquivo de syncronização',
  },
};
