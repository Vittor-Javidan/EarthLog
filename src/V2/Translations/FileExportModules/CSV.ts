import {
  LanguageTag
} from '@V2/Types';

type TranslationDTO = Record<LanguageTag, {
  'Building project data': string
  'Mounting header': string
  'Mounting project coordinates': string
  'Mounting samples coordinates': string
  'Mounting project measurements': string
  'Mounting samples measurements': string
  'Creating CSV file': string
  'Sharing document': string
  'Source': string
  'Widget name': string
  'Label': string
  'Latitude (DD)': string
  'Longitude (DD)': string
  'Coordinates Accuracry (m)': string
  'Altitude (m)': string
  'Altitude Accuracry (m)': string
  'Project settings': string
  'Project info': string
  'Sample info': string
  'GPS': string
}>

export const R_FileExportModules_CSV: TranslationDTO = {
  'en-US': {
    'Building project data': 'Building project data',
    'Mounting header': 'Mounting header',
    'Mounting project coordinates': 'Mounting project coordinates',
    'Mounting samples coordinates': 'Mounting samples coordinates',
    'Mounting project measurements': 'Mounting project measurements',
    'Mounting samples measurements': 'Mounting samples measurements',
    'Creating CSV file': 'Creating CSV file',
    'Sharing document': 'Sharing document',
    'Source': 'From',
    'Widget name': 'Widget name',
    'Label': 'Label',
    'Latitude (DD)': 'Latitude (DD)',
    'Longitude (DD)': 'Longitude (DD)',
    'Coordinates Accuracry (m)': 'Coordinates Accuracry (m)',
    'Altitude (m)': 'Altitude (m)',
    'Altitude Accuracry (m)': 'Altitude Accuracry (m)',
    'Project settings': 'Project settings',
    'Project info': 'Project info',
    'Sample info': 'Sample info',
    'GPS': 'GPS',
  },
  'pt-BR': {
    'Building project data': 'Montando dados do projeto',
    'Mounting header': 'Montando cabeçalho',
    'Mounting project coordinates': 'Montando coordenadas do projeto',
    'Mounting samples coordinates': 'Montando coordenadas das amostras',
    'Mounting project measurements': 'Montando medições do projeto',
    'Mounting samples measurements': 'Montando medições das amostras',
    'Creating CSV file': 'Criando arquivo CSV',
    'Sharing document': 'Compartilhando documento',
    'Source': 'Fonte',
    'Widget name': 'Nome do widget',
    'Label': 'Etiqueta',
    'Latitude (DD)': 'Latitude (DD)',
    'Longitude (DD)': 'Longitude (DD)',
    'Coordinates Accuracry (m)': 'Acurária das coordenadas (m)',
    'Altitude (m)': 'Altitude (m)',
    'Altitude Accuracry (m)': 'Altitude Accuracry (m)',
    'Project settings': 'Configurações de projeto',
    'Project info': 'Informações do projeto',
    'Sample info': 'Informações da amostar',
    'GPS': 'GPS',
  },
};
