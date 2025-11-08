import { LanguageTag } from '@V2/Types/AppTypes';

export type TranslationDTO = Record<LanguageTag, {
  'Sample info': string
  'ID': string
  'Name': string
  'Write the sample name here...': string
}>

export const R_Screen_SampleInfo: TranslationDTO = {
  'en-US': {
    'Sample info': 'Sample info',
    'ID': 'ID',
    'Name': 'Name',
    'Write the sample name here...': 'Write the sample name here...',
  },
  'pt-BR': {
    'Sample info': 'Informações da amostra',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the sample name here...': 'Escreva o nome da amostra aqui...',
  },
};
