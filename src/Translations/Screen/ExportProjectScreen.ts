import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'DOCX': string
  'CSV': string
}>

export const R_Screen_ExportProject: TranslationDTO = {
  'en-US': {
    'DOCX': 'DOCX',
    'CSV': 'CSV',
  },
  'pt-BR': {
    'DOCX': 'DOCX',
    'CSV': 'CSV',
  },
};
