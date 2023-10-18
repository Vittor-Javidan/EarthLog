import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'File name': string
  "Write File's name here": string
  'Inicializing project export': string
}>

export const R_Alert_ExportProject_DOCX: TranslationDTO = {
  'en-US': {
    'File name': 'File name',
    "Write File's name here": "Write File's name here",
    'Inicializing project export': 'Inicializing project export',
  },
  'pt-BR': {
    'File name': 'Nome do arquivo',
    "Write File's name here": 'Escreva o nome do arquivo aqui...',
    'Inicializing project export': 'Inicializando exportação de projeto',
  },
};
