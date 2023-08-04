import { Languages } from '@Types/index';

export type Translations_HomeScreen = Record<Languages, {
	'Settings': string
  'New Project': string
	'Hold on!': string,
	'Want to exit?': string
	'NO': string
	'YES': string
	'Last Open': string
	'Projects': string
}>

export const translations_HomeScreen: Translations_HomeScreen = {
	'en-US': {
		'Settings': 'Settings',
    'New Project': 'New Project',
		'Hold on!': 'Hold on!',
		'Want to exit?': 'Want to exit?',
		'NO': 'NO',
		'YES': 'YES',
		'Last Open': 'Last Open',
		'Projects': 'Projects',
	},
	'pt-BR': {
		'Settings': 'Configurações',
    'New Project': 'Novo Projeto',
		'Hold on!': 'Espere um pouco!',
		'Want to exit?': 'Deseja sair?',
		'NO': 'NÃO',
		'YES': 'SIM',
		'Last Open': 'Aberto recentemente',
		'Projects': 'Projetos',
	},
};
