import { LanguageTag } from '@Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Recently Open': string
  'Projects': string
  'Tutorials': string
  'ROADMAP': string
  'Community': string
}>

export const R_HomeScreen: TranslationDTO = {
  'en-US': {
    'Recently Open': 'Recently Open',
    'Projects': 'Projects',
    'Tutorials': 'Tutorials',
    'ROADMAP': 'ROADMAP',
    'Community': 'Community',
  },
  'pt-BR': {
		'Recently Open': 'Aberto Recentemente',
    'Projects': 'Projetos',
    'Tutorials': 'Tutoriais',
    'ROADMAP': 'ROADMAP',
    'Community': 'Comunidade',
  },
};
