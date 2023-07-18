import { Languages } from '@Services/LanguageService';

export type DataTypeTranslations = Record<Languages, {
  'True': string
  'False': string
}>

export const languages: DataTypeTranslations = {
  'en-US': {
    'True': 'True',
    'False': 'False',
  },
  'pt-BR': {
    'True': 'Verdadeiro',
    'False': 'Falso',
  },
};

