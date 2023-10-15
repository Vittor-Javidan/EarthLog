import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Processing project:': string
  'Changing all IDs': string
  'Defining project as "new"': string,
  'Defining project as "uploaded"': string
  'Attaching new sync data': string
  'Attaching upload date and time': string
  'Loading project settings': string
  'Loading project widgets': string
  'Loading project template': string
  'Loading all sample settings': string
  'Loading sample widgets of': string
  'Loading project sync data': string
}>

export const R_DataProcessService: TranslationDTO = {
  'en-US': {
    'Processing project:': 'Processing project:',
    'Changing all IDs': 'Changing all IDs',
    'Defining project as "new"': 'Defining project as "new"',
    'Defining project as "uploaded"': 'Defining project as "uploaded"',
    'Attaching new sync data': 'Attaching new sync data',
    'Attaching upload date and time': 'Attaching upload date and time',
    'Loading project settings': 'Loading project settings',
    'Loading project widgets': 'Loading project widgets',
    'Loading project template': 'Loading project template',
    'Loading all sample settings': 'Loading all sample settings',
    'Loading sample widgets of': 'Loading sample widgets of',
    'Loading project sync data': 'Loading project sync data',
  },
  'pt-BR': {
    'Processing project:': 'Processando projeto',
    'Changing all IDs': 'Alterando todos IDs',
    'Defining project as "new"': 'Definindo projeto como "new"',
    'Defining project as "uploaded"': 'Definindo projeto como "uploaded"',
    'Attaching new sync data': 'Anexando dados de sincronização',
    'Attaching upload date and time': 'Anexando data e hora do upload',
    'Loading project settings': 'Carregando configurações do projeto',
    'Loading project widgets': 'Carregando widgets do projeto',
    'Loading project template': 'Carregando template do projeto',
    'Loading all sample settings': 'Carregando todas configurações das amostras',
    'Loading sample widgets of': 'Carregando widgets da amostra',
    'Loading project sync data': 'Carregando dados de syncronização do projeto',
  },
};
