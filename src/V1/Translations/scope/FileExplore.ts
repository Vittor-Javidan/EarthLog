import {
  LanguageTag
} from '@V1/Types';

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
