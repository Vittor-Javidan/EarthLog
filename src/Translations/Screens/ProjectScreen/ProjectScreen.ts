import { Languages } from '@Types/index';

export type Translations_ProjectScreen = Record<Languages, {
	'Edit project': string
	'Edit template': string
}>

export const translations_ProjectScreen: Translations_ProjectScreen = {
	'en-US': {
		'Edit project': 'Edit project',
		'Edit template': 'Edit template',
	},
	'pt-BR': {
		'Edit project': 'Editar projeto',
		'Edit template': 'Editar template',
	},
};
