import {
  LanguageTag
} from '@V1/Types';

type TranslationDTO = Record<LanguageTag, {
  'Project info': string
  'ID': string
  'Name': string
  'Reference Coordinates': string
  'Write the project name here...': string
  'Sample Alias': string
  'Write your sample alias here': string
}>

export const R_Screen_ProjectInfo: TranslationDTO = {
  'en-US': {
    'Project info': 'Project info',
    'ID': 'ID',
    'Name': 'Name',
    'Reference Coordinates': 'Reference Coordinates',
    'Write the project name here...': 'Write the project name here...',
    'Sample Alias': 'Sample Alias',
    'Write your sample alias here': 'Write your sample alias here',
  },
  'pt-BR': {
    'Project info': 'Informações do projeto',
    'ID': 'ID',
    'Name': 'Nome',
    'Reference Coordinates': 'Coordenadas de  referência',
    'Write the project name here...': 'Escreva o nome do projeto aqui...',
    'Sample Alias': 'Nomeação de amostra',
    'Write your sample alias here': 'Dê um apelido para sua amostra aqui...',
  },
};
