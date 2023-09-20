import { Languages } from '@Types/AppTypes';

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
  'This Will delete current GPS data. Confirm to proceed.': string
  'This will overwrite current gps data. Confirm to proceed.': string
  'This will delete current saved coordinate. Confirm to proceed.': string
  'This will delete current saved altitude. Confirm to proceed.': string
  'NO': string
	'YES': string
  '* Reference distance: ': string
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
    'This Will delete current GPS data. Confirm to proceed.': 'This Will delete current GPS data. Confirm to proceed.',
    'This will overwrite current gps data. Confirm to proceed.': 'This will overwrite current gps data. Confirm to proceed.',
    'This will delete current saved coordinate. Confirm to proceed.': 'This will delete current saved coordinate. Confirm to proceed.',
    'This will delete current saved altitude. Confirm to proceed.': 'This will delete current saved altitude. Confirm to proceed.',
    'NO': 'NO',
		'YES': 'YES',
    '* Reference distance: ': '* Reference distance: ',
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
    'This Will delete current GPS data. Confirm to proceed.': 'Isso irá deletar os dados de GPS atuais. Confirme para continuar.',
    'This will overwrite current gps data. Confirm to proceed.': 'Isso irá substituir os dados de GPS atuais. Confirme para continuar.',
    'This will delete current saved coordinate. Confirm to proceed.': 'Isso irá deletar os dados atuais de coordenadas. Confirme para continuar.',
    'This will delete current saved altitude. Confirm to proceed.': 'Isso irá deletar os dados atuais de altitude. Confirme para continuar.',
    'NO': 'NÃO',
		'YES': 'SIM',
    '* Reference distance: ': '* Distância da referência: ',
  },
};

