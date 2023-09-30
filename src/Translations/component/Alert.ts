import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project name': string
  "Write project's name here...": string
  'Sample name': string
  "Write sample's name here": string
  'Want to exit?': string
  'Your widgets:': string
  'No project ID found': string
  'No project/sample ID found': string
}>

export const R_Alert: TranslationDTO = {
  'en-US': {
    'Project name': 'Project name',
    "Write project's name here...": "Write project's name here...",
    'Sample name': 'Sample name',
    "Write sample's name here": "Write sample's name here",
    'Want to exit?': 'Want to exit?',
    'Your widgets:': 'Your widgets:',
    'No project ID found': 'No project ID found',
    'No project/sample ID found': 'No project/sample ID found',
  },
  'pt-BR': {
    'Project name': 'Nome do projeto',
    "Write project's name here...": 'Escreva o nome do projeto aqui...',
    'Sample name': 'Nome da amostra',
    "Write sample's name here": 'Escreva o nome da amostra aqui...',
    'Want to exit?': 'Deseja sair?',
    'Your widgets:': 'Seus widgets:',
    'No project ID found': 'ID do projeto não encontrado',
    'No project/sample ID found': 'ID do projeto/amostra não encontrado',
  },
};
