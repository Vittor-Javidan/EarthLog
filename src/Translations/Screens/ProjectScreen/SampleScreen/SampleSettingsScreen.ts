import { Languages } from '@Types/index';

export type Translations_SampleSettingsScreen = Record<Languages, {
  'Edit sample': string
  'Sample info': string
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
    'Edit sample': 'Edit sample',
    'Sample info': 'Sample info',
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
    'Edit sample': 'Editar amostra',
    'Sample info': 'Informações da amostra',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the sample name here...': 'Escreva o nome da amostra aqui...',
    'Delete': 'Deletar',
    'Sample name': 'Nome amostra',
    'Tip': 'Dica',
    'Type sample name perfectly to delete.': 'Escreva o nome da amostra perfeitamente para deletar.',
    'Click on the bottom right button to confirm.': 'Clique no botão à direita abaixo para confirmar.',
  },
};
