import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Date and time': string
  'Date': string
  'Time': string
}>

export const R_DateAndTimeScope: TranslationDTO = {
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
