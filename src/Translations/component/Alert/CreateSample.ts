import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Sample name': string
  "Write sample's name here": string
  'No project ID found': string
}>

export const R_Alert_CreateSample: TranslationDTO = {
  'en-US': {
    'Sample name': 'Sample name',
    "Write sample's name here": "Write sample's name here",
    'No project ID found': 'No project ID found',
  },
  'pt-BR': {
    'Sample name': 'Nome da amostra',
    "Write sample's name here": 'Escreva o nome da amostra aqui...',
    'No project ID found': 'ID do projeto não encontrado',
  },
};
