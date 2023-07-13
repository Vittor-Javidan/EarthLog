import { Languages } from '@Services/LanguageService';

export type LoadingScreenTranslations = Record<Languages, {
	'Loading...': string
}>

export const languages: LoadingScreenTranslations = {
	'en-US': {
		'Loading...': 'Loading...',
	},
	'pt-BR': {
		'Loading...': 'Carregando...',
	},
};
