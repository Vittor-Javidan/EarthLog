import {
  LanguageTag
} from '@V2/Types';

type TranslationDTO = Record<LanguageTag, {
  'Looking into project:': string,
  'Looking into sample:': string,
  'You changed the GPS input location. Confirm to save the changes': string,
  'You changed the measurement location. Confirm to save the changes': string,

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
    'You changed the GPS input location. Confirm to save the changes': 'You changed the GPS input location. Confirm to save the changes',
    'You changed the measurement location. Confirm to save the changes': 'You changed the measurement location. Confirm to save the changes',

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
    'You changed the GPS input location. Confirm to save the changes': 'Você alterou a localização do GPS. Confirma para salvar as alterações',
    'You changed the measurement location. Confirm to save the changes': 'Você alterou a localização da medição. Confirme para salvar as alterações',

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
