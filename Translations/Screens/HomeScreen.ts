import { Languages } from '@Types/index';

export type Translations_HomeScreen = Record<Languages, {
	'Settings': string
  'New Project': string
}>

export const translations_HomeScreen: Translations_HomeScreen = {
	'en-US': {
		'Settings': 'Settings',
    'New Project': 'New Project',
	},
	'pt-BR': {
		'Settings': 'Configurações',
    'New Project': 'Novo Projeto',
	},
};
