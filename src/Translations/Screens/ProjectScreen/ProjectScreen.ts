import { Languages } from '@Types/index';

export type Translations_ProjectScreen = Record<Languages, {
	'Project settings': string
	'Template': string
}>

export const translations_ProjectScreen: Translations_ProjectScreen = {
	'en-US': {
		'Project settings': 'Project settings',
		'Template': 'Template',
	},
	'pt-BR': {
		'Project settings': 'Configurações do projeto',
		'Template': 'Template',
	},
};
