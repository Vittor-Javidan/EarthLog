import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Recently Open': string
  'Projects': string
  'Tutorials': string
  'ROADMAP': string
  'Community': string
  'New data': string
}>

export const R_Screen_Home: TranslationDTO = {
  'en-US': {
    'Recently Open': 'Recently Open',
    'Projects': 'Projects',
    'Tutorials': 'Tutorials',
    'ROADMAP': 'ROADMAP',
    'Community': 'Community',
    'New data': 'New data',
  },
  'pt-BR': {
		'Recently Open': 'Aberto Recentemente',
    'Projects': 'Projetos',
    'Tutorials': 'Tutoriais',
    'ROADMAP': 'ROADMAP',
    'Community': 'Comunidade',
    'New data': 'Novos dados',
  },
};
