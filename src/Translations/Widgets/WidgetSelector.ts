import { Languages } from '@Types/AppTypes';

export type Translations_WidgetSelector = Record<Languages, {
  '* Reference distance: ': string
}>

export const translations_WidgetSelector: Translations_WidgetSelector = {
  'en-US': {
    '* Reference distance: ': '* Reference distance: ',
  },
  'pt-BR': {
    '* Reference distance: ': '* Distância da referência: ',
  },
};
