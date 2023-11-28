import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Mounting document': string
  'Sharing document': string
}>

export const R_FileExportModules_Shared: TranslationDTO = {
  'en-US': {
    'Mounting document': 'Mounting document',
    'Sharing document': 'Sharing document',
  },
  'pt-BR': {
    'Mounting document': 'Montando documento',
    'Sharing document': 'Compartilhando documento',
  },
};
