import { Languages } from '@Types/index';

export type Translations_ProjectCreationScreen = Record<Languages, {
  'Project creation': string
  'Immutable': string
  'ID': string
  'Name': string
  'Write the project name here...': string
  'Point template': string
  'Only numbers, letters and "-".': string
}>

export const translations_ProjectCreationScreen: Translations_ProjectCreationScreen = {
  'en-US': {
    'Project creation': 'Project creation',
    'Immutable': 'Immutable',
    'ID': 'ID',
    'Name': 'Name',
    'Write the project name here...': 'Write the project name here...',
    'Point template': 'Point template',
    'Only numbers, letters and "-".': 'Only numbers, letters and "-".',
  },
  'pt-BR': {
    'Project creation': 'Criação de projeto',
    'Immutable': 'Imutável',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the project name here...': 'Escreva o nome do projeto aqui...',
    'Point template': 'Template de pontos',
    'Only numbers, letters and "-".': 'Apenas números, letras e o símbolo "-".',
  },
};
