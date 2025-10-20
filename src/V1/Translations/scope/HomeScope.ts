import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Home screen': string
	'Want to exit?': string
  'Settings': string
  'Credentials': string
  'Sponsor this app!': string
  'Privacy Policy': string
  'Change version': string
  'GitHub': string
  'File Explorer': string
}>

export const R_Scope_Home: TranslationDTO = {
  'en-US': {
    'Home screen': 'Main Screen',
		'Want to exit?': 'Want to exit?',
    'Settings': 'Settings',
    'Credentials': 'Credentials',
    'Sponsor this app!': 'Sponsor this app!',
    'Privacy Policy': 'Privacy Policy',
    'Change version': 'Change version',
    'GitHub': 'GitHub',
    'File Explorer': 'File Explorer',
  },
  'pt-BR': {
    'Home screen': 'Tela inicial',
		'Want to exit?': 'Deseja sair?',
    'Settings': 'Configurações',
    'Credentials': 'Credenciais',
    'Sponsor this app!': 'Patrocine o app!',
    'Privacy Policy': 'Política de Privacidade',
    'Change version': 'Mudar versão',
    'GitHub': 'GitHub',
    'File Explorer': 'Explorador de Arquivos',
  },
};
