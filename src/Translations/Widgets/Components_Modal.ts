import { Languages } from '@Types/index';

export type Translations_WidgetsComponents_Modal = Record<Languages, {
  'Save': string
  'Delete': string
  'Type widget name perfectly to delete.': string
}>

export const translations_WidgetsComponents_Modal: Translations_WidgetsComponents_Modal = {
	'en-US': {
    'Save': 'Save',
    'Delete': 'Delete',
    'Type widget name perfectly to delete.': 'Type widget name perfectly to delete.',
	},
	'pt-BR': {
    'Save': 'Salvar',
    'Delete': 'Deletar',
    'Type widget name perfectly to delete.': 'Escreva o nome do widget perfeitamente para deletar.',
	},
};
