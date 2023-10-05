import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Write something here...' : string
}>

export const R_StringInput: TranslationDTO = {
  'en-US': {
    'Write something here...': 'Write something here...',
  },
  'pt-BR': {
    'Write something here...': 'Escreva alguma coisa aqui...',
  },
};