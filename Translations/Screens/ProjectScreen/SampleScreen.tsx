import { Languages } from '@Types/index';

export type Translations_SampleScreen = Record<Languages, {
  'Sample settings': string
}>

export const translations_SampleScreen: Translations_SampleScreen = {
	'en-US': {
    'Sample settings': 'Sample settings',
	},
	'pt-BR': {
    'Sample settings': 'Configurações da amostra',
	},
};
