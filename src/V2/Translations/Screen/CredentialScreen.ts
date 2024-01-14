import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'User': string
  'Write here your username...': string
  'Password': string
  'Write here your password...': string
  'URL': string
  'Write here the server root URL...': string
  'Confirm to delete this credential.': string
}>

export const R_Screen_Credential: TranslationDTO = {
  'en-US': {
    'User': 'User',
    'Write here your username...': 'Write here your username...',
    'Password': 'Password',
    'Write here your password...': 'Write here your username...',
    'URL': 'URL',
    'Write here the server root URL...': 'Write here the server root URL...',
    'Confirm to delete this credential.': 'Confirm to delete this credential.',
  },
  'pt-BR': {
    'User': 'Usuário',
    'Write here your username...': 'Escreva nome de usuário aqui...',
    'Password': 'Senha',
    'Write here your password...': 'Escreva aqui sua senha...',
    'URL': 'URL',
    'Write here the server root URL...': 'Escreva aqui a URL raiz do server',
    'Confirm to delete this credential.': 'Confirme para deletar esta credencial',
  },
};
