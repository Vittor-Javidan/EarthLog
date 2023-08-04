import { Languages } from '@Types/index';

export type Translations_AddWidgetButton = Record<Languages, {
  'Add': string
  'Add Widget': string
  'Widget name': string
  'Write a name to the widget here...': string
  'Boolean': string
  'Text': string
}>

export const translations_AddWidgetButton: Translations_AddWidgetButton = {
  'en-US': {
    'Add': 'Add',
    'Add Widget': 'Add Widget',
    'Widget name': 'Widget name',
    'Write a name to the widget here...': 'write a name to the widget here...',
    'Boolean': 'Boolean Widget',
    'Text': 'Text',
  },
  'pt-BR': {
    'Add': 'Adicionar',
    'Add Widget': 'Adicionar Widget',
    'Widget name': 'Nome do Widget',
    'Write a name to the widget here...': 'Escreva um nome para o Widget aqui...',
    'Boolean': 'Booleano',
    'Text': 'Texto',
  },
};
