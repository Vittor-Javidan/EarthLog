import { Languages } from '@Types/index';

export type Translations_ProjectCreationScreen = Record<Languages, {
  'Project creation': string
  'Cancel': string
  'Create': string
  'Project settings': string
  'Immutable': string
  'ID': string
  'Name': string
  'Write the project name here...': string
  'Project widgets': string
  'Point template': string
  'Only numbers, letters and "-".': string
}>

export const translations_ProjectCreationScreen: Translations_ProjectCreationScreen = {
  'en-US': {
    'Project creation': 'Project creation',
    'Cancel': 'Cancel',
    'Create': 'Create',
    'Project settings': 'Project settings',
    'Immutable': 'Immutable',
    'ID': 'ID',
    'Name': 'Name',
    'Write the project name here...': 'Write the project name here...',
    'Project widgets': 'Project widgets',
    'Point template': 'Point template',
    'Only numbers, letters and "-".': 'Only numbers, letters and "-".',
  },
  'pt-BR': {
    'Project creation': 'Criação de projeto',
    'Cancel': 'Cancelar',
    'Create': 'Criar',
    'Project settings': 'Configurações do projeto',
    'Immutable': 'Imutável',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the project name here...': 'Escreva o nome do projeto aqui...',
    'Project widgets': 'Widgets do projeto',
    'Point template': 'Template de pontos',
    'Only numbers, letters and "-".': 'Apenas números, letras e o símbolo "-".',
  },
};
