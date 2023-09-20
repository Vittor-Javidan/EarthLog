import { Languages } from '@Types/AppTypes';

export type Translations_ErrorMessages = Record<Languages, {
  'Project ID undefined': string
  'Sample ID undefined': string
}>

export const translations_ErrorMessages: Translations_ErrorMessages = {
	'en-US': {
    'Project ID undefined': 'Project ID undefined',
    'Sample ID undefined': 'Sample ID undefined',
	},
	'pt-BR': {
    'Project ID undefined': 'ID do projeto indefinido',
    'Sample ID undefined': 'ID da amostra indefinido',
	},
};
