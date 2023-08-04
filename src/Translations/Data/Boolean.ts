import { Languages } from '@Types/index';

export type Translations_BooleanData = Record<Languages, {
  'True': string
  'False': string
}>

export const translations_BooleanData: Translations_BooleanData = {
  'en-US': {
    'True': 'True',
    'False': 'False',
  },
  'pt-BR': {
    'True': 'Verdadeiro',
    'False': 'Falso',
  },
};

