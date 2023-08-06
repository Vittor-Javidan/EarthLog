import { Languages } from '@Types/index';

export type Translations_SampleCreationScreen = Record<Languages, {
  'New sample': string
  'ID cannot be empty': string
  'Name cannot be empty': string
  'ID': string
  'Only numbers, letters and "-"': string
  'Name': string
  'Write the sample name here...': string
}>

export const translations_SampleCreationScreen: Translations_SampleCreationScreen = {
	'en-US': {
    'New sample': 'New sample',
    'ID cannot be empty': 'ID cannot be empty',
    'Name cannot be empty': 'Name cannot be empty',
    'ID': 'ID',
    'Only numbers, letters and "-"': 'Only numbers, letters and "-"',
    'Name': 'Name',
    'Write the sample name here...': 'Write the sample name here...',
	},
	'pt-BR': {
    'New sample': 'Nova amostra',
    'ID cannot be empty': 'ID não pode estar vazio',
    'Name cannot be empty': 'Nome não pode estar vazio',
    'ID': 'ID',
    'Only numbers, letters and "-"': 'Apenas numeros, letras e "-"',
    'Name': 'Nome',
    'Write the sample name here...': 'Escreva o nome da amostra aqui',
	},
};
