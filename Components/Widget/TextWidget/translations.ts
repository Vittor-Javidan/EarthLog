import { Languages } from '@Services/LanguageService';

export type TextWidgetTranslations = Record<Languages, {

  // <TextWidget />
  'Not possible to have 2 Widgets with the same name.': string
  'Widget name cannot be empty.': string
  'Value cannot have empty spaces.': string
  'only numbers, and letter from "a" to "z" or "A" to "Z" is allow.': string

  // <DataDisplay />
  'Empty text': string

  // <Modal />
  'Widget Name': string
  'Write widget name here...': string
  'Text': string,
  'Write anything here...': string
}>

export const languages: TextWidgetTranslations = {
  'en-US': {

    // <TextWidget />
    'Not possible to have 2 Widgets with the same name.': 'Not possible to have 2 Widgets with the same name.',
    'Widget name cannot be empty.': 'Widget name cannot be empty.',
    'Value cannot have empty spaces.': 'Value cannot have empty spaces.',
    'only numbers, and letter from "a" to "z" or "A" to "Z" is allow.': 'only numbers, and letter from "a" to "z" or "A" to "Z" is allow.',

    // <DataDisplay />
    'Empty text': 'Empty text',

    // <Modal />
    'Widget Name': 'Widget Name',
    'Write widget name here...': 'Write widget name here...',
    'Text': 'Text',
    'Write anything here...': 'Write anything here...',
  },
  'pt-BR': {

    // <TextWidget />
    'Not possible to have 2 Widgets with the same name.': 'Não pode haver dois Widgets com mesmo nome.',
    'Widget name cannot be empty.': 'O nome do Widget não pode estar vazio',
    'Value cannot have empty spaces.': 'O valor não pode estar vazio',
    'only numbers, and letter from "a" to "z" or "A" to "Z" is allow.': 'Apenas numeros, e letras de "a" a "z" ou "A" a "Z" é permitido',

    // <DataDisplay />
    'Empty text': 'Texto vazio',

    // <Modal />
    'Widget Name': 'Nome do Widget',
    'Write widget name here...': 'Escreva um nome aqui...',
    'Text': 'Texto',
    'Write anything here...': 'Escreva qualquer coisa aqui...',
  },
};
