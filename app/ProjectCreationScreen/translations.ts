import { Languages } from '@Services/LanguageService';

export type ProjectCreationScreenTranslations = Record<Languages, {
  'Project creation': string
  'Cancel': string
  'Confirm': string
  'Project settings': string
  'Project widgets': string
  'Point template': string
  'Immutable': string
  'ID': string
  'Name': string
}>

export const languages: ProjectCreationScreenTranslations = {
  'en-US': {
    'Project creation': 'Project creation',
    'Cancel': 'Cancel',
    'Confirm': 'Confirm',
    'Project settings': 'Project settings',
    'Project widgets': 'Project widgets',
    'Point template': 'Point template',
    'Immutable': 'Immutable',
    'ID': 'ID',
    'Name': 'Name',
  },
  'pt-BR': {
    'Project creation': 'Criação de projeto',
    'Cancel': 'Cancelar',
    'Confirm': 'Confirmar',
    'Project settings': 'Configurações do projeto',
    'Project widgets': 'Widgets do projeto',
    'Point template': 'Template de pontos',
    'Immutable': 'Imutável',
    'ID': 'ID',
    'Name': 'Nome',
  },
};
