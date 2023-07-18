import { Languages } from '@Services/LanguageService';

export type ProjectCreationScreenTranslations = Record<Languages, {

  // <index />
  'Project creation': string
  'Cancel': string
  'Confirm': string

  // <Inputs_ProjectSettings />
  'Project settings': string
  'Immutable': string
  'ID': string
  'Name': string
  'Write the project name here...': string

  // <Widgets_Project />
  'Project widgets': string

  // <Widgets_PointTemplate />
  'Point template': string

  // <AddWidgetButton />
  'Add': string
  'Add Widget': string
  'Boolean': string
  'Text': string
  'Widget name': string
  'Write a name to the widget here...': string
}>

export const languages: ProjectCreationScreenTranslations = {
  'en-US': {

    // <index />
    'Project creation': 'Project creation',
    'Cancel': 'Cancel',
    'Confirm': 'Confirm',

    // <Inputs_ProjectSettings />
    'Project settings': 'Project settings',
    'Immutable': 'Immutable',
    'ID': 'ID',
    'Name': 'Name',
    'Write the project name here...': 'Write the project name here...',

    // <Widgets_Project />
    'Project widgets': 'Project widgets',

    // <Widgets_PointTemplate />
    'Point template': 'Point template',

    // <AddWidgetButton />
    'Add': 'Add',
    'Add Widget': 'Add Widget',
    'Boolean': 'Boolean Widget',
    'Text': 'Text',
    'Widget name': 'Widget name',
    'Write a name to the widget here...': 'write a name to the widget here...',
  },
  'pt-BR': {

    // <index />
    'Project creation': 'Criação de projeto',
    'Cancel': 'Cancelar',
    'Confirm': 'Confirmar',

    // <Inputs_ProjectSettings />
    'Project settings': 'Configurações do projeto',
    'Immutable': 'Imutável',
    'ID': 'ID',
    'Name': 'Nome',
    'Write the project name here...': 'Escreva o nome do projeto aqui...',

    // <Widgets_Project />
    'Project widgets': 'Widgets do projeto',

    // <Widgets_PointTemplate />
    'Point template': 'Template de pontos',

    // <AddWidgetButton />
    'Add': 'Adicionar',
    'Add Widget': 'Adicionar Widget',
    'Boolean': 'Booleano',
    'Text': 'Texto',
    'Widget name': 'Nome do Widget',
    'Write a name to the widget here...': 'Escreva um nome para o Widget aqui...',
  },
};
