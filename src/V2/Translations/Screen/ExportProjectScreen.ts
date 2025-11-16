import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'DOCX': string
  'CSV (GPS)': string
  'ZIP (Picture)': string
  'CSV (Compass Measurements)': string
}>

export const R_Screen_ExportProject: TranslationDTO = {
  'en-US': {
    'DOCX': 'DOCX',
    'CSV (GPS)': 'CSV (GPS)',
    'ZIP (Picture)': 'ZIP (Picture)',
    'CSV (Compass Measurements)': 'CSV (Compass Measurements)',
  },
  'pt-BR': {
    'DOCX': 'DOCX',
    'CSV (GPS)': 'CSV (GPS)',
    'ZIP (Picture)': 'ZIP (Fotos)',
    'CSV (Compass Measurements)': 'CSV (Medições de Bússola)',
  },
};
