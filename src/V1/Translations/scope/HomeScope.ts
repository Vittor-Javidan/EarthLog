import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Home screen': string
	'Want to exit?': string
  'Settings': string
  'Credentials': string
  'Premium': string
  'Premium subscription': string
  'Google Play subscriptions': string
  'Privacy Policy': string
  'Change version': string
  'GitHub': string
}>

export const R_Scope_Home: TranslationDTO = {
  'en-US': {
    'Home screen': 'Main Screen',
		'Want to exit?': 'Want to exit?',
    'Settings': 'Settings',
    'Credentials': 'Credentials',
    'Premium': 'Premium',
    'Premium subscription': 'Subcribe to premium',
    'Google Play subscriptions': 'Google Play subscriptions',
    'Privacy Policy': 'Privacy Policy',
    'Change version': 'Change version',
    'GitHub': 'GitHub',
  },
  'pt-BR': {
    'Home screen': 'Tela inicial',
		'Want to exit?': 'Deseja sair?',
    'Settings': 'Configurações',
    'Credentials': 'Credenciais',
    'Premium': 'Premium',
    'Premium subscription': 'Assine o plano premium',
    'Google Play subscriptions': 'Assinaturas Google Play',
    'Privacy Policy': 'Política de Privacidade',
    'Change version': 'Mudar versão',
    'GitHub': 'GitHub',
  },
};
