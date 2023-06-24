import { Languages } from '../Types/LanguageTypes';

export type InitializationScreenTranslations = Record<Languages, {
	'Loading...': string
}>

export const languages: InitializationScreenTranslations = {
	'en-US': {
		'Loading...': 'Loading...',
	},
	'pt-BR': {
		'Loading...': 'Carregando...',
	},
};
