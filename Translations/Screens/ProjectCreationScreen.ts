import { Languages } from '@Services/LanguageService';

export type Translations_ProjectCreationScreen = Record<Languages, {
  'Project creation': string
  'Cancel': string
  'Confirm': string
  'Project settings': string
  'Immutable': string
  'ID': string
  'Name': string
  'Write the project name here...': string
  'Project widgets': string
  'Point template': string
  'Add': string
  'Add Widget': string
  'Boolean': string
  'Text': string
  'Widget name': string
  'Write a name to the widget here...': string
}>

export const translations_ProjectCreationScreen: Translations_ProjectCreationScreen = {
  'en-US': {
    'Project creation': 'Project creation',
    'Cancel': 'Cancel',
    'Confirm': 'Confirm',
    'Project settings': 'Project settings',
    'Immutable': 'Immutable',
    'ID': 'ID',
    'Name': 'Name',
    'Write the project name here...': 'Write the project name here...',
    'Project widgets': 'Project widgets',
    'Point template': 'Point template',
    'Add': 'Add',
    'Add Widget': 'Add Widget',
    'Boolean': 'Boolean Widget',
    'Text': 'Text',
    'Widget name': 'Widget name',
    'Write a name to the widget here...': 'write a name to the widget here...',
  },
  'pt-BR': {
    'Project creation': 'Criação de projeto',
    'Cancel': 'Cancelar',
    'Confirm': 'Confirmar',
    'Project settings': 'Configurações do projeto',
    'Immutable': 'Imutável',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the project name here...': 'Escreva o nome do projeto aqui...',
    'Project widgets': 'Widgets do projeto',
    'Point template': 'Template de pontos',
    'Add': 'Adicionar',
    'Add Widget': 'Adicionar Widget',
    'Boolean': 'Booleano',
    'Text': 'Texto',
    'Widget name': 'Nome do Widget',
    'Write a name to the widget here...': 'Escreva um nome para o Widget aqui...',
  },
};
