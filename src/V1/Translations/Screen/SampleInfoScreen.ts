import { LanguageTag } from '@V1/Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Sample info': string
  'ID': string
  'Name': string
  'Reference Coordinates': string
  'Write the sample name here...': string
}>

export const R_Screen_SampleInfo: TranslationDTO = {
  'en-US': {
    'Sample info': 'Sample info',
    'ID': 'ID',
    'Name': 'Name',
    'Reference Coordinates': 'Reference Coordinates',
    'Write the sample name here...': 'Write the sample name here...',
  },
  'pt-BR': {
    'Sample info': 'Informações da amostra',
    'ID': 'ID',
    'Name': 'Nome',
    'Reference Coordinates': 'Coordenadas de  referência',
    'Write the sample name here...': 'Escreva o nome da amostra aqui...',
  },
};
