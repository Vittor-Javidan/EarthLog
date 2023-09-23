import { LanguageTag } from '@Types/AppTypes';

export type Translations_BooleanWidget = Record<LanguageTag, {
  'T/F': string
  'Widget name': string
  'Write widget name here...': string
  'Value': string
  'true': string
  'false': string
}>

export const translations_BooleanWidget: Translations_BooleanWidget = {
  'en-US': {
    'T/F': 'True/False',
    'Widget name': 'Widget name',
    'Write widget name here...': 'Write widget name here...',
    'Value': 'Value',
    'true': 'TRUE',
    'false': 'FALSE',
  },
  'pt-BR': {
    'T/F': 'Verdadeiro/Falso',
    'Widget name': 'Nome do Widget',
    'Write widget name here...': 'Escreva o nome do widget aqui...',
    'Value': 'Valor',
    'true': 'VERDADEIRO',
    'false': 'FALSO',
  },
};
