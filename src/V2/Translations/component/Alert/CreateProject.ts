import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project name': string
  "Write project's name here...": string
}>

export const R_Alert_CreateProject: TranslationDTO = {
  'en-US': {
    'Project name': 'Project name',
    "Write project's name here...": "Write project's name here...",
  },
  'pt-BR': {
    'Project name': 'Nome do projeto',
    "Write project's name here...": 'Escreva o nome do projeto aqui...',
  },
};
