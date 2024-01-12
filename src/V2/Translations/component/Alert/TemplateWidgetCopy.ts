import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Your widgets:': string
}>

export const R_Alert_TemplateWidgetCopy: TranslationDTO = {
  'en-US': {
    'Your widgets:': 'Your widgets:',
  },
  'pt-BR': {
    'Your widgets:': 'Seus widgets:',
  },
};
