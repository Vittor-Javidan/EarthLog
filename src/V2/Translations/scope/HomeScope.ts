import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Home screen': string
	'Want to exit?': string
  'Settings': string
  'Credentials': string
  'Premium': string
  'Premium subscription': string
  'Privacy Policy': string
  'Change version': string
}>

export const R_Scope_Home: TranslationDTO = {
  'en-US': {
    'Home screen': 'Main Screen',
		'Want to exit?': 'Want to exit?',
    'Settings': 'Settings',
    'Credentials': 'Credentials',
    'Premium': 'Premium',
    'Premium subscription': 'Subcribe to premium',
    'Privacy Policy': 'Privacy Policy',
    'Change version': 'Change version',
  },
  'pt-BR': {
    'Home screen': 'Tela inicial',
		'Want to exit?': 'Deseja sair?',
    'Settings': 'Configurações',
    'Credentials': 'Credenciais',
    'Premium': 'Premium',
    'Premium subscription': 'Assine o plano premium',
    'Privacy Policy': 'Política de Privacidade',
    'Change version': 'Mudar versão',
  },
};
