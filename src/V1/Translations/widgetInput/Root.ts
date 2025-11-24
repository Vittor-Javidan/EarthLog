import {
  LanguageTag
} from '@V1/Types';

type TranslationDTO = Record<LanguageTag, {
  'Input name': string
}>

export const R_Input_Root: TranslationDTO = {
  'en-US': {
    'Input name': 'Input name',
  },
  'pt-BR': {
    'Input name': 'Nome do input',
  },
};
