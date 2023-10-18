import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'ERROR: Project does not exist on cache': string
  'ERROR: Sample does not exist on cache': string
  'ERROR: Project Widget does not exist on cache': string
  'ERROR: Template Widget does not exist on cache': string
  'ERROR: Sample Widget does not exist on cache': string
}>

export const R_Service_Cache: TranslationDTO = {
  'en-US': {
    'ERROR: Project does not exist on cache': 'ERROR: Project does not exist on cache',
    'ERROR: Sample does not exist on cache': 'ERROR: Sample does not exist on cache',
    'ERROR: Project Widget does not exist on cache': 'ERROR: Project Widget does not exist on cache',
    'ERROR: Template Widget does not exist on cache': 'ERROR: Template Widget does not exist on cache',
    'ERROR: Sample Widget does not exist on cache': 'ERROR: Sample Widget does not exist on cache',
  },
  'pt-BR': {
    'ERROR: Project does not exist on cache': 'ERRO: Projeto não existe em cache',
    'ERROR: Sample does not exist on cache': 'ERRO: Amostra não existe em cache',
    'ERROR: Project Widget does not exist on cache': 'ERRO: Widget de projeto não existe em cache',
    'ERROR: Template Widget does not exist on cache': 'ERRO: Widget de template não existe em cache',
    'ERROR: Sample Widget does not exist on cache': 'ERRO: Widget de amostra não existe em cache',
  },
};
