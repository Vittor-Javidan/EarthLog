import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Home screen': string
	'Want to exit?': string
  'Settings': string
}>

export const R_HomeScope: TranslationDTO = {
  'en-US': {
    'Home screen': 'Main Screen',
		'Want to exit?': 'Want to exit?',
    'Settings': 'Settings',
  },
  'pt-BR': {
    'Home screen': 'Tela inicial',
		'Want to exit?': 'Deseja sair?',
    'Settings': 'Configurações',
  },
};
