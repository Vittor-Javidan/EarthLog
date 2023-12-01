import { LanguageTag, TimeFormat } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, Record<TimeFormat, string>>

export const R_Screen_TimeFormat: TranslationDTO = {
  'en-US': {
    'HH : MM : SS': 'Hours : Minutes : Seconds',
    'HH : SS : MM': 'Hours : Seconds : Minutes',
    'MM : HH : SS': 'Minutes : Hours : Seconds',
    'SS : HH : MM': 'Seconds : Hours : Minutes',
    'MM : SS : HH': 'Minutes : Seconds : Hours',
    'SS : MM : HH': 'Seconds : Minutes : Hours',
    'HH : MM':      'Hours : Minutes',
    'MM : HH':      'Minutes : Hours',
  },
  'pt-BR': {
    'HH : MM : SS': 'Horas : Minutos : Segundos',
    'HH : SS : MM': 'Horas : Segundos : Minutos',
    'MM : HH : SS': 'Minutos : Horas : Segundos',
    'SS : HH : MM': 'Segundos : Horas : Minutos',
    'MM : SS : HH': 'Minutos : Segundos : Horas',
    'SS : MM : HH': 'Segundos : Minutos : Horas',
    'HH : MM':      'Horas : Minutos',
    'MM : HH':      'Minutos : Horas',
  },
};
