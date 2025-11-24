import {
  LanguageTag
} from '@V1/Types';

export type TranslationDTO = Record<LanguageTag, {
  'Auto Sample GPS Acquisition': string
  'Language': string
  'Date and time': string
  'Themes': string
  'Vibration': string
  'Tutorial Mode': string
  'By enabling this, every single coordinate will be masked randomly. Use this if you are recording a video, streaming, or sharing your screen.': string
  'Whipe ALL DATA': string
  'Want to whipe all your data? This is irreversible.': string
  'Reset All Tutorials': string
  'Do you want to reset all tutorials? They will be shown again as if you were using the app for the first time.': string
}>

export const R_Screen_Settings: TranslationDTO = {
  'en-US': {
    'Auto Sample GPS Acquisition': 'Auto Sample GPS Acquisition',
    'Language': 'Language',
    'Date and time': 'Date and time',
    'Themes': 'Themes',
    'Vibration': 'Vibration',
    'Tutorial Mode': 'Tutorial Mode',
    'By enabling this, every single coordinate will be masked randomly. Use this if you are recording a video, streaming, or sharing your screen.': 'By enabling this, every single coordinate will be masked randomly. Use this if you are recording a video, streaming, or sharing your screen.',
    'Whipe ALL DATA': 'Whipe ALL DATA',
    'Want to whipe all your data? This is irreversible.': 'Want to whipe all your data? This is irreversible.',
    'Reset All Tutorials': 'Reset All Tutorials',
    'Do you want to reset all tutorials? They will be shown again as if you were using the app for the first time.': 'Do you want to reset all tutorials? They will be shown again as if you were using the app for the first time.',
  },
  'pt-BR': {
    'Auto Sample GPS Acquisition': 'Aquisição Automática de GPS em amostras',
    'Language': 'Idioma',
    'Date and time': 'Data e hora',
    'Themes': 'Temas',
    'Vibration': 'Vibração',
    'Tutorial Mode': 'Modo Tutorial',
    'By enabling this, every single coordinate will be masked randomly. Use this if you are recording a video, streaming, or sharing your screen.': 'Ao ativar isso, todas as coordenadas serão mascaradas aleatoriamente. Use isso se você estiver gravando um vídeo, transmitindo ou compartilhando sua tela.',
    'Whipe ALL DATA': 'Limpar TODOS OS DADOS',
    'Want to whipe all your data? This is irreversible.': 'Deseja limpar todos os seus dados? Isso é irreversível.',
    'Reset All Tutorials': 'Reativar Todos os Tutoriais',
    'Do you want to reset all tutorials? They will be shown again as if you were using the app for the first time.': 'Você deseja redefinir todos os tutoriais? Eles serão exibidos novamente como se você estivesse usando o aplicativo pela primeira vez.',
  },
};
