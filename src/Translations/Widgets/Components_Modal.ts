import { LanguageTag } from '@Types/AppTypes';

export type Translations_WidgetsComponents_Modal = Record<LanguageTag, {
  'Delete': string
  'Widget name': string
  'Tip': string
  'Type widget name perfectly to delete.': string
  'Click on the bottom right button to confirm.': string
}>

export const translations_WidgetsComponents_Modal: Translations_WidgetsComponents_Modal = {
	'en-US': {
    'Delete': 'Delete',
    'Widget name': 'Widget name',
    'Tip': 'Tip',
    'Type widget name perfectly to delete.': 'Type widget name perfectly to delete.',
    'Click on the bottom right button to confirm.': 'Click on the bottom right button to confirm.',
	},
	'pt-BR': {
    'Delete': 'Deletar',
    'Widget name': 'Nome widget',
    'Tip': 'Dica',
    'Type widget name perfectly to delete.': 'Escreva o nome do widget perfeitamente para deletar.',
    'Click on the bottom right button to confirm.': 'Clique no botão à direita abaixo para confirmar.',
	},
};
