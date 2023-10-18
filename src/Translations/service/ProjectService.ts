import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Creating project folder': string
  'Saving project widgets': string
  'Saving template widgets': string
  'Saving samples of ID:': string
  'Saving sample widget of ID:': string
  'Saving project sync file': string
}>

export const R_Service_Project: TranslationDTO = {
  'en-US': {
    'Creating project folder': 'Creating project folder',
    'Saving project widgets': 'Saving project widgets',
    'Saving template widgets': 'Saving template widgets',
    'Saving samples of ID:': 'Saving samples of ID:',
    'Saving sample widget of ID:': 'Saving sample widget of ID:',
    'Saving project sync file': 'Saving project sync file',
  },
  'pt-BR': {
    'Creating project folder': 'Criando pasta do projeto',
    'Saving project widgets': 'Salvando widgets de projeto',
    'Saving template widgets': 'Salvando widgets de template',
    'Saving samples of ID:': 'Salvando amostra de ID',
    'Saving sample widget of ID:': 'Salvando widget de amostra de ID',
    'Saving project sync file': 'Salvando dados de sincronização do projeto',
  },
};
