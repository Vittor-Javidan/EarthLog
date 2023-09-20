import { Languages } from '@Types/AppTypes';

export type Translations_SampleScreen = Record<Languages, {
  'Edit sample': string
}>

export const translations_SampleScreen: Translations_SampleScreen = {
	'en-US': {
    'Edit sample': 'Edit sample',
	},
	'pt-BR': {
    'Edit sample': 'Editar amostra',
	},
};
