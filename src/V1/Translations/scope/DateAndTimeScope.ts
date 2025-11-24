import {
  LanguageTag
} from '@V1/Types';

type TranslationDTO = Record<LanguageTag, {
  'Date and time': string
  'Date': string
  'Time': string
}>

export const R_Scope_DateAndTime: TranslationDTO = {
  'en-US': {
    'Date and time': 'Date and time',
    'Date': 'Date',
    'Time': 'Time',
  },
  'pt-BR': {
    'Date and time': 'Data e hora',
    'Date': 'Data',
    'Time': 'Hora',
  },
};
