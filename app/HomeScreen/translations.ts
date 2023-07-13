import { Languages } from '@Services/LanguageService';

export type HomeScreenTranslations = Record<Languages, {
	'Settings': string
  'New Project': string
}>

export const languages: HomeScreenTranslations = {
	'en-US': {
		'Settings': 'Settings',
    'New Project': 'New Project',
	},
	'pt-BR': {
		'Settings': 'Configurações',
    'New Project': 'Novo Projeto',
	},
};
