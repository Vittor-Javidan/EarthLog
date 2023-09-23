import { LanguageTag } from '@Types/AppTypes';

export type Translations_ProjectSettingsScreen = Record<LanguageTag, {
  'Edit project': string
  'Project info': string
  'ID': string
  'Name': string
  'Write the project name here...': string
  'Delete': string
  'Project name': string
  'Tip': string
  'Type project name perfectly to delete.': string
  'Click on the bottom right button to confirm.': string
}>

export const translations_ProjectSettingsScreen: Translations_ProjectSettingsScreen = {
	'en-US': {
    'Edit project': 'Edit project',
    'Project info': 'Project info',
    'ID': 'ID',
    'Name': 'Name',
    'Write the project name here...': 'Write the project name here...',
    'Delete': 'Delete',
    'Project name': 'Project name',
    'Tip': 'Tip',
    'Type project name perfectly to delete.': 'Type project name perfectly to delete.',
    'Click on the bottom right button to confirm.': 'Click on the bottom right button to confirm.',
  },
	'pt-BR': {
    'Edit project': 'Editar projeto',
    'Project info': 'Informações do projeto',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the project name here...': 'Escreva o nome do projeto aqui...',
    'Delete': 'Deletar',
    'Project name': 'Nome projeto',
    'Tip': 'Dica',
    'Type project name perfectly to delete.': 'Escreva o nome do projeto perfeitamente para deletar.',
    'Click on the bottom right button to confirm.': 'Clique no botão à direita abaixo para confirmar.',
  },
};
