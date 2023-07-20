import { Languages } from '@Services/LanguageService';

export type Translations_LoadingScreen = Record<Languages, {
	'Loading...': string
}>

export const translations_LoadingScreen: Translations_LoadingScreen = {
	'en-US': {
		'Loading...': 'Loading...',
	},
	'pt-BR': {
		'Loading...': 'Carregando...',
	},
};