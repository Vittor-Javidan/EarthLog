import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'The server did not recognize your credentials. Failed to authenticate.': string
  '\nMethod: POST': string
  '\nEndpoint: /auth': string
  '\nStatus: ': string
  'Credentials accepted, but no AccessToken was found. Contact the developer of this server.': string
  'It was not possible to download projects. The endpoint request failed. Contact the developer of this server.': string
  '\nMethod: GET': string
  '\nEndpoint: /project': string,
  'Projects download request was successful, but no projects were found.': string
  'Network request failed. Did your phone or server lose internet connection?': string
  'It was not possible to upload this project. The endpoint request failed. Contact the developer of this server.': string
  'Connecting to server:': string
  'Authenticated': string
  'Downloading projects': string
  'Opening projects': string
  'Sending to server:': string
}>

export const R_Service_FetchAPI: TranslationDTO = {
  'en-US': {
    'The server did not recognize your credentials. Failed to authenticate.': 'The server did not recognize your credentials. Failed to authenticate.',
    '\nMethod: POST': '\nMethod: POST',
    '\nEndpoint: /auth': '\nEndpoint: /auth',
    '\nStatus: ': '\nStatus: ',
    'Credentials accepted, but no AccessToken was found. Contact the developer of this server.': 'Credentials accepted, but no AccessToken was found. Contact the developer of this server.',
    'It was not possible to download projects. The endpoint request failed. Contact the developer of this server.': 'It was not possible to download projects. The endpoint request failed. Contact the developer of this server.',
    '\nMethod: GET': '\nMethod: GET',
    '\nEndpoint: /project': '\nEndpoint: /project',
    'Projects download request was successful, but no projects were found.': 'Projects download request was successful, but no projects were found.',
    'Network request failed. Did your phone or server lose internet connection?': 'Network request failed. Did your phone or server lose internet connection?',
    'It was not possible to upload this project. The endpoint request failed. Contact the developer of this server.': 'It was not possible to upload this project. The endpoint request failed. Contact the developer of this server.',
    'Connecting to server:': 'Connecting to server:',
    'Authenticated': 'Authenticated',
    'Downloading projects': 'Downloading projects',
    'Opening projects': 'Opening projects',
    'Sending to server:': 'Sending to server:',
  },
  'pt-BR': {
    'The server did not recognize your credentials. Failed to authenticate.': 'O servidor não reconheceu suas credenciais. Falha de autenticação.',
    '\nMethod: POST': '\nMétodo: POST',
    '\nEndpoint: /auth': '\nEndpoint: /auth',
    '\nStatus: ': '\nStatus: ',
    'Credentials accepted, but no AccessToken was found. Contact the developer of this server.': 'Credenciais aceitas, mas o token de acesso não foi encontrado. Contate o desenvolvedor desse servidor.',
    'It was not possible to download projects. The endpoint request failed. Contact the developer of this server.': 'Não foi possível fazer download de projetos. A requesição do endpoint falhou. Contate o desenvolvedor desse servidor.',
    '\nMethod: GET': '\nMétodo: GET',
    '\nEndpoint: /project': '\nEndpoint: /project',
    'Projects download request was successful, but no projects were found.': 'A requisição de donwload foi bem sucedida, mas nenhum projeto foi encontrado.',
    'Network request failed. Did your phone or server lose internet connection?': 'Requisição de rede falhou. Seu dispositivo ou servidor perdeu conexão com a internet?',
    'It was not possible to upload this project. The endpoint request failed. Contact the developer of this server.': 'Não foi possível fazer o upload desse projeto. A requisição do endpoint falhou. Contate o desenvolvedor desse servidor.',
    'Connecting to server:': 'Conectando ao servidor:',
    'Authenticated': 'Autenticado',
    'Downloading projects': 'Baixando projetos',
    'Opening projects': 'Abrindo projetos',
    'Sending to server:': 'Enviando para o servidor:',
  },
};
