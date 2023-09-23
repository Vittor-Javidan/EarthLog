import { LanguageTag } from '@Types/AppTypes';

export type Translations_BooleanData = Record<LanguageTag, {
  'true': string
  'false': string
}>

export const translations_BooleanData: Translations_BooleanData = {
  'en-US': {
    'true': 'TRUE',
    'false': 'FALSE',
  },
  'pt-BR': {
    'true': 'VERDADEIRO',
    'false': 'FALSO',
  },
};

