import { Languages } from '../../../Types/LanguageTypes';

export type ProjectCreationScreenTranslations = Record<Languages, {
  'Project Creation': string
  'Cancel': string
  'Confirm': string
}>

export const languages: ProjectCreationScreenTranslations = {
  'en-US': {
    'Project Creation': 'Project Creation',
    'Cancel': 'Cancel',
    'Confirm': 'Confirm',
  },
  'pt-BR': {
    'Project Creation': 'Criação de projeto',
    'Cancel': 'Cancelar',
    'Confirm': 'Confirmar',
  },
};
