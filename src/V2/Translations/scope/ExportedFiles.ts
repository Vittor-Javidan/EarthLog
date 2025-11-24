import {
  LanguageTag
} from '@V2/Types';

type TranslationDTO = Record<LanguageTag, {
  'Exported Files': string
}>

export const R_Scope_ExportedFiles: TranslationDTO = {
  'en-US': {
    'Exported Files': 'File Explorer',
  },
  'pt-BR': {
    'Exported Files': 'Arquivos Exportados',
  },
};
