import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project ID undefined': string
  'Sample ID undefined': string
}>

export const R_NavController: TranslationDTO = {
	'en-US': {
    'Project ID undefined': 'Project ID undefined',
    'Sample ID undefined': 'Sample ID undefined',
	},
	'pt-BR': {
    'Project ID undefined': 'ID do projeto indefinido',
    'Sample ID undefined': 'ID da amostra indefinido',
	},
};
