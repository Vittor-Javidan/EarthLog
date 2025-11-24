import {
  DateFormat,
  LanguageTag
} from '@V2/Types';

type TranslationDTO = Record<LanguageTag, Record<DateFormat, string>>

export const R_Screen_DateFormat: TranslationDTO = {
  'en-US': {
    'yyyy / mm / dd': 'Year / Month / Day',
    'yyyy / dd / mm': 'Year / Day / Month',
    'mm / yyyy / dd': 'Month / Year / Day',
    'dd / yyyy / mm': 'Day / Year / Month',
    'mm / dd / yyyy': 'Month / Day / Year',
    'dd / mm / yyyy': 'Day / Month / Year',
  },
  'pt-BR': {
    'yyyy / mm / dd': 'Ano / mês / dia',
    'yyyy / dd / mm': 'Ano / Dia / Mês',
    'mm / yyyy / dd': 'Mês / Ano / Dia',
    'dd / yyyy / mm': 'Dia / Ano / Mês',
    'mm / dd / yyyy': 'Mês / Dia / Ano',
    'dd / mm / yyyy': 'Dia / Mês / Ano',
  },
};
