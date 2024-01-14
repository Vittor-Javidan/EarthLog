import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Sample name': string
  "Write sample's name here": string
}>

export const R_Alert_CreateSample: TranslationDTO = {
  'en-US': {
    'Sample name': 'Sample name',
    "Write sample's name here": "Write sample's name here",
  },
  'pt-BR': {
    'Sample name': 'Nome da amostra',
    "Write sample's name here": 'Escreva o nome da amostra aqui...',
  },
};
