import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Docx': string
}>

export const R_Screen_ExportProject: TranslationDTO = {
  'en-US': {
    'Docx': 'Docx',
  },
  'pt-BR': {
    'Docx': 'Docx',
  },
};
