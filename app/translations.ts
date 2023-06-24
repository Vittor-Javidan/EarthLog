import { Languages } from '../Types/LanguageTypes';

export type AppInitializationScreenTranslations = Record<Languages, {
	'Loading...': string
}>

export const languages: AppInitializationScreenTranslations = {
	'en-US': {
		'Loading...': 'Loading...',
	},
	'pt-BR': {
		'Loading...': 'Carregando...',
	},
};
