import { Languages } from '@Types/index';

export type Translations_BooleanWidget = Record<Languages, {
  'Widget name': string
  'Write widget name here...': string
  'Value': string
}>

export const translations_BooleanWidget: Translations_BooleanWidget = {
  'en-US': {
    'Widget name': 'Widget name',
    'Write widget name here...': 'Write widget name here...',
    'Value': 'Value',
  },
  'pt-BR': {
    'Widget name': 'Nome do Widget',
    'Write widget name here...': 'Escreva o nome do widget aqui...',
    'Value': 'Valor',
  },
};
