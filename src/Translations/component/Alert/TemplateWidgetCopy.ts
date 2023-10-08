import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Your widgets:': string
  'No project/sample ID found': string
}>

export const R_Alert_TemplateWidgetCopy: TranslationDTO = {
  'en-US': {
    'Your widgets:': 'Your widgets:',
    'No project/sample ID found': 'No project/sample ID found',
  },
  'pt-BR': {
    'Your widgets:': 'Seus widgets:',
    'No project/sample ID found': 'ID do projeto/amostra não encontrado',
  },
};
