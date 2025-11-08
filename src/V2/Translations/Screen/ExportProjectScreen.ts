import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'DOCX': string
  'CSV (GPS)': string
  'ZIP (IMAGES)': string
}>

export const R_Screen_ExportProject: TranslationDTO = {
  'en-US': {
    'DOCX': 'DOCX',
    'CSV (GPS)': 'CSV (GPS)',
    'ZIP (IMAGES)': 'ZIP (IMAGES)',
  },
  'pt-BR': {
    'DOCX': 'DOCX',
    'CSV (GPS)': 'CSV (GPS)',
    'ZIP (IMAGES)': 'ZIP (IMAGES)',
  },
};
