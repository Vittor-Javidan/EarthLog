import {
  LanguageTag
} from '@V1/Types';

type TranslationDTO = Record<LanguageTag, {
  'Error': string
  'Done!': string
  'Error!': string
  'Summary': string
  'Just a moment...': string
  'File name': string
  "Write File's name here": string
  'Inicializing project export': string
}>

export const R_Alert_Shared: TranslationDTO = {
  'en-US': {
    'Error': 'Error',
    'Done!': 'Done!',
    'Error!': 'Error!',
    'Summary': 'Summary',
    'Just a moment...': 'Just a moment...',
    'File name': 'File name',
    "Write File's name here": "Write File's name here",
    'Inicializing project export': 'Inicializing project export',
  },
  'pt-BR': {
    'Error': 'Erro',
    'Done!': 'Pronto!',
    'Error!': 'Erro!',
    'Summary': 'Sumário',
    'Just a moment...': 'Aguarde um pouco...',
    'File name': 'Nome do arquivo',
    "Write File's name here": 'Escreva o nome do arquivo aqui...',
    'Inicializing project export': 'Inicializando exportação de projeto',
  },
};
