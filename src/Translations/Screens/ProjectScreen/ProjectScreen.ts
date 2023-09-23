import { LanguageTag } from '@Types/AppTypes';

export type Translations_ProjectScreen = Record<LanguageTag, {
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
