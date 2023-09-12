import { Languages } from '@Types/index';

export type Translations_Input_GPSInput = Record<Languages, {
  'Coordinates': string
  'Latitude': string
  'Longitude': string
  'Altitude': string
  'Accuracy': string
  'Real time accuracy:': string
  'Latitude (DD)': string
  'Longitude (DD)': string
  'Altitude (m)': string
  'Accuracy (m)': string
  'Nothing selected': string
  'Collecting the best data. Updates can take a few seconds...': string
  'Manual': string
  '* All fields must be fulfill': string
  'Hold on!': string
  'current saved data will be erased. Are you sure?': string
  'current saved data will be replaced. Are you sure?': string
  'NO': string
	'YES': string
}>

export const translations_Input_GPSInput: Translations_Input_GPSInput = {
  'en-US': {
    'Coordinates': 'Coordinate',
    'Latitude': 'Latitude',
    'Longitude': 'Longitude',
    'Altitude': 'Altitude',
    'Accuracy': 'Accuracy',
    'Real time accuracy:': 'Real time accuracy:',
    'Latitude (DD)': 'Latitude (DD)',
    'Longitude (DD)': 'Longitude (DD)',
    'Altitude (m)': 'Altitude (m)',
    'Accuracy (m)': 'Accuracy (m)',
    'Nothing selected': 'Nothing selected',
    'Collecting the best data. Updates can take a few seconds...': 'Collecting the best data. Updates can take a few seconds...',
    'Manual': 'Manual',
    '* All fields must be fulfill': '* All coordinate fields must be fulfill',
    'Hold on!': 'Hold on!',
    'current saved data will be erased. Are you sure?': 'current saved data will be erased. Are you sure?',
    'current saved data will be replaced. Are you sure?': 'current saved data will be replaced. Are you sure?',
    'NO': 'NO',
		'YES': 'YES',
  },
  'pt-BR': {
    'Coordinates': 'Coordenadas',
    'Latitude': 'Latitude',
    'Longitude': 'Longitude',
    'Altitude': 'Altitude',
    'Accuracy': 'Acurácia',
    'Real time accuracy:': 'Acurácia em tempo real:',
    'Latitude (DD)': 'Latitude (DD)',
    'Longitude (DD)': 'Longitude (DD)',
    'Altitude (m)': 'Altitude (m)',
    'Accuracy (m)': 'Acurácia (m)',
    'Nothing selected': 'Nada selecionado',
    'Collecting the best data. Updates can take a few seconds...': 'Coletando o melhor dado. Atualizações podem demorar alguns segundos...',
    'Manual': 'Manual',
    '* All fields must be fulfill': '* todos campos precisam ser preenchidos',
    'Hold on!': 'Espere um pouco!',
    'current saved data will be erased. Are you sure?': 'Dados atuais serão deletados. Tem certeza?',
    'current saved data will be replaced. Are you sure?': 'Dados atuais serão substituídos. Tem certeza?',
    'NO': 'NÃO',
		'YES': 'SIM',
  },
};

