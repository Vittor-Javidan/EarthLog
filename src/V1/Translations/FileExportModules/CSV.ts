import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
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
