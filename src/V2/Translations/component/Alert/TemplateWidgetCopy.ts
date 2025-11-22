import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Your Forms:': string
}>

export const R_Alert_TemplateWidgetCopy: TranslationDTO = {
  'en-US': {
    'Your Forms:': 'Your Forms:',
  },
  'pt-BR': {
    'Your Forms:': 'Seus Formulários:',
  },
};
