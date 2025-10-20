import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'File Explorer': string
}>

export const R_Scope_FileExplore: TranslationDTO = {
  'en-US': {
    'File Explorer': 'File Explorer',
  },
  'pt-BR': {
    'File Explorer': 'Explorador de Arquivos',
  },
};
