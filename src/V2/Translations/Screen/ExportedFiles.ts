import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Are you sure you want to delete "${fileName}"? This action cannot be undone.': (filename: string) => string,
}>

export const R_Screen_ExportedFiles: TranslationDTO = {
  'en-US': {
    'Are you sure you want to delete "${fileName}"? This action cannot be undone.': (filename: string) => `Are you sure you want to delete "${filename}"? This action cannot be undone.`,
  },
  'pt-BR': {
    'Are you sure you want to delete "${fileName}"? This action cannot be undone.': (filename: string) => `Você tem certeza de que deseja excluir "${filename}"? Esta ação não pode ser desfeita.`,
  },
};
