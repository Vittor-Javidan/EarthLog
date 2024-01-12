import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
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
  'This will overwrite current gps data. Confirm to proceed.': string
  'This will delete current saved coordinate. Confirm to proceed.': string
  'This will delete current saved altitude. Confirm to proceed.': string
  '* Reference distance: ': string
}>

export const R_Input_GPS: TranslationDTO = {
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
    'This will overwrite current gps data. Confirm to proceed.': 'This will overwrite current gps data. Confirm to proceed.',
    'This will delete current saved coordinate. Confirm to proceed.': 'This will delete current saved coordinate. Confirm to proceed.',
    'This will delete current saved altitude. Confirm to proceed.': 'This will delete current saved altitude. Confirm to proceed.',
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
    'This will overwrite current gps data. Confirm to proceed.': 'Isso irá substituir os dados de GPS atuais. Confirme para continuar.',
    'This will delete current saved coordinate. Confirm to proceed.': 'Isso irá deletar os dados atuais de coordenadas. Confirme para continuar.',
    'This will delete current saved altitude. Confirm to proceed.': 'Isso irá deletar os dados atuais de altitude. Confirme para continuar.',
    '* Reference distance: ': '* Distância da referência: ',
  },
};
