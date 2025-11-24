import {
  LanguageTag
} from '@V2/Types';

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
  'Release Notes': string
  'Exported Files': string
  'Subscriptions': string
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
    'Release Notes': 'Release Notes',
    'Exported Files': 'Exported Files',
    'Subscriptions': 'Subscriptions',
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
    'Release Notes': 'Notas de Lançamento',
    'Exported Files': 'Arquivos Exportados',
    'Subscriptions': 'Assinaturas',
  },
};
