import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Looking into project:': string,
  'Looking into sample:': string,
}>

export const R_Layer_Map: TranslationDTO = {
  'en-US': {
    'Looking into project:': 'Looking into project:',
    'Looking into sample:': 'Looking into sample:',
  },
  'pt-BR': {
    'Looking into project:': 'Olhando o projeto:',
    'Looking into sample:': 'Olhando a amostra:',
  },
};
