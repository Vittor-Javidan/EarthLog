import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project info': string
  'Samples': string
  'Reference coordinate': string
  'Not applicable': string
  'Empty': string
  'Latitude:': string
  'Longitude:': string
  'Altitude:': string
  'Picture': string
  'Description': string
  'Picture not available on device. Try download from cloud.': string
}>

export const R_FileExportModules_DOCX: TranslationDTO = {
  'en-US': {
    'Project info': 'Project info',
    'Samples': 'Samples',
    'Reference coordinate': 'Reference coordinate',
    'Not applicable': 'Not applicable',
    'Empty': 'Empty',
    'Latitude:': 'Latitude:',
    'Longitude:': 'Longitude:',
    'Altitude:': 'Altitude:',
    'Picture': 'Picture',
    'Description': 'Description',
    'Picture not available on device. Try download from cloud.': 'Picture not available on device. Try download from cloud.'
  },
  'pt-BR': {
    'Project info': 'Informações do projeto',
    'Samples': 'Amostras',
    'Reference coordinate': 'Coordenada de referência',
    'Not applicable': 'Não aplicável',
    'Empty': 'Vazio',
    'Latitude:': 'Latitude:',
    'Longitude:':'Longitude:',
    'Altitude:': 'Altitude:',
    'Picture': 'Foto',
    'Description': 'Descrição',
    'Picture not available on device. Try download from cloud.': 'Foto não disponível no dispositivo. Tente baixar da nuvem.'
  },
};
