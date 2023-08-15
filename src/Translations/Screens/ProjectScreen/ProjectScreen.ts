import { Languages } from '@Types/index';

export type Translations_ProjectScreen = Record<Languages, {
	'Edit project': string
	'Template': string
}>

export const translations_ProjectScreen: Translations_ProjectScreen = {
	'en-US': {
		'Edit project': 'Edit project',
		'Template': 'Template',
	},
	'pt-BR': {
		'Edit project': 'Editar projeto',
		'Template': 'Template',
	},
};
