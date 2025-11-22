import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Looking into project:': string,
  'Looking into sample:': string,

  // Filter
  'Filter': string,
  'Project Info': string,
  'Sample Info': string,
  'GPS': string,
  'Compass Measurements': string,

  // Markers
  'No label': string,
  'Heading: ${heading}° / Dip: ${dip}°': (heading: number, dip: number) => string,
  'Your last location': string,
}>

export const R_Layer_Map: TranslationDTO = {
  'en-US': {
    'Looking into project:': 'Looking into project:',
    'Looking into sample:': 'Looking into sample:',

    // Filter
    'Filter': 'Filter',
    'Project Info': 'Project Info',
    'Sample Info': 'Sample Info',
    'GPS': 'GPS',
    'Compass Measurements': 'Compass Measurements',
  
    // Markers
    'No label': 'No label',
    'Heading: ${heading}° / Dip: ${dip}°': (heading: number, dip: number) => `Heading: ${heading}° / Dip: ${dip}°`,
    'Your last location': 'Your last location',
  },
  'pt-BR': {
    'Looking into project:': 'Olhando o projeto:',
    'Looking into sample:': 'Olhando a amostra:',

    // Filter
    'Filter': 'Filtro',
    'Project Info': 'Informações do Projeto',
    'Sample Info': 'Informações das Amostras',
    'GPS': 'GPS',
    'Compass Measurements': 'Medições da Bússola',

    // Markers
    'No label': 'Sem nome',
    'Heading: ${heading}° / Dip: ${dip}°': (heading: number, dip: number) => `Direção: ${heading}° / Inclinação: ${dip}°`,
    'Your last location': 'Sua última localização',
  },
};
