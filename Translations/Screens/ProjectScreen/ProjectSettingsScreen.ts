import { Languages } from '@Types/index';

export type Translations_ProjectSettingsScreen = Record<Languages, {
  'Project Settings': string
  'Status:': string
  'Saved': string
  'Saving...': string
  'ID': string
  'Name': string
  'Write the project name here...': string
  'Immutable': string
  'Delete': string
  'Type project name perfectly to delete.': string
}>

export const translations_ProjectSettingsScreen: Translations_ProjectSettingsScreen = {
	'en-US': {
    'Project Settings': 'Project Settings',
    'Status:': 'Status:',
    'Saved': 'Saved',
    'Saving...': 'Saving...',
    'ID': 'ID',
    'Name': 'Name',
    'Write the project name here...': 'Write the project name here...',
    'Immutable': 'Immutable',
    'Delete': 'Delete',
    'Type project name perfectly to delete.': 'Type project name perfectly to delete.',
  },
	'pt-BR': {
    'Project Settings': 'Configurações do projeto',
    'Status:': 'Estado:',
    'Saved': 'Salvo',
    'Saving...': 'Salvando...',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the project name here...': 'Escreva o nome do projeto aqui...',
    'Immutable': 'Imutável',
    'Delete': 'Deletar',
    'Type project name perfectly to delete.': 'Escreva o nome do projeto perfeitamente para deletar.',
  },
};
