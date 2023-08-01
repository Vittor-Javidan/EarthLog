import { Languages } from '@Types/index';

export type Translations_ProjectScreen = Record<Languages, {
	'Samples': string
  'New sample': string
	'Project settings': string
}>

export const translations_ProjectScreen: Translations_ProjectScreen = {
	'en-US': {
		'Samples': 'Samples',
    'New sample': 'New sample',
		'Project settings': 'Project settings',
	},
	'pt-BR': {
		'Samples': 'Amostras',
    'New sample': 'Nova amostra',
		'Project settings': 'Configurações do projeto',
	},
};
