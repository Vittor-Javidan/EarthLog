import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'ERROR: Not possible to create 2 projects with same ID': string
  'ERROR: Not possible to create 2 samples with same ID': string
  'ERROR: Not possible to create 2 widgets with same ID': string
  'ERROR: index.json file do not exist. Path: ': string
}>

export const R_DatabaseService: TranslationDTO = {
  'en-US': {
    'ERROR: Not possible to create 2 projects with same ID': 'ERROR: Not possible to create 2 projects with same ID',
    'ERROR: Not possible to create 2 samples with same ID': 'ERROR: Not possible to create 2 samples with same ID',
    'ERROR: Not possible to create 2 widgets with same ID': 'ERROR: Not possible to create 2 widgets with same ID',
    'ERROR: index.json file do not exist. Path: ': 'ERROR: index.json file do not exist. Path: ',
  },
  'pt-BR': {
    'ERROR: Not possible to create 2 projects with same ID': 'ERRO: Não é possível criar dois projetos com mesmo ID',
    'ERROR: Not possible to create 2 samples with same ID': 'ERRO: Não é possível criar duas amostras com mesmo ID',
    'ERROR: Not possible to create 2 widgets with same ID': 'ERRO: Não é possível criar dois widgets com mesmo ID',
    'ERROR: index.json file do not exist. Path: ': 'ERRO: o arquivo index.json não existe. Local: ',
  },
};
