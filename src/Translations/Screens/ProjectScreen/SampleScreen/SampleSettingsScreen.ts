import { Languages } from '@Types/index';

export type Translations_SampleSettingsScreen = Record<Languages, {
  'Sample Settings': string
  'Status:': string
  'Saved': string
  'Saving...': string
  'ID': string
  'Name': string
  'Write the sample name here...': string
  'Delete': string
  'Sample name': string
  'Tip': string
  'Type sample name perfectly to delete.': string
  'Click on the bottom right button to confirm.': string
}>

export const translations_SampleSettingsScreen: Translations_SampleSettingsScreen = {
	'en-US': {
    'Sample Settings': 'Sample Settings',
    'Status:': 'Status:',
    'Saved': 'Saved',
    'Saving...': 'Saving...',
    'ID': 'ID',
    'Name': 'Name',
    'Write the sample name here...': 'Write the sample name here...',
    'Delete': 'Delete',
    'Sample name': 'Sample name',
    'Tip': 'Tip',
    'Type sample name perfectly to delete.': 'Type sample name perfectly to delete.',
    'Click on the bottom right button to confirm.': 'Click on the bottom right button to confirm.',
  },
	'pt-BR': {
    'Sample Settings': 'Configurações da amostra',
    'Status:': 'Estado:',
    'Saved': 'Salvo',
    'Saving...': 'Salvando...',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the sample name here...': 'Escreva o nome do projeto aqui...',
    'Delete': 'Deletar',
    'Sample name': 'Nome amostra',
    'Tip': 'Dica',
    'Type sample name perfectly to delete.': 'Escreva o nome da amostra perfeitamente para deletar.',
    'Click on the bottom right button to confirm.': 'Clique no botão à direita abaixo para confirmar.',
  },
};
