import {
  LanguageTag
} from '@V2/Types';

type TranslationDTO = Record<LanguageTag, {
  'Write something here...' : string
}>

export const R_Input_String: TranslationDTO = {
  'en-US': {
    'Write something here...': 'Write something here...',
  },
  'pt-BR': {
    'Write something here...': 'Escreva alguma coisa aqui...',
  },
};
