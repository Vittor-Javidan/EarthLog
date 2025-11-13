import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Horizontal!!!': string,
  'Keep the device on horizontal': string,
  'Max Dip!!!': string,
  'Place the phone’s side on a surface at 90°, then rotate its base without losing contact': string,
}>

export const R_Layer_Compass: TranslationDTO = {
  'en-US': {
    'Horizontal!!!': 'Horizontal!!!',
    'Keep the device on horizontal': 'Keep the device on horizontal',
    'Max Dip!!!': 'Max Dip!!!',
    'Place the phone’s side on a surface at 90°, then rotate its base without losing contact': 'Place the phone’s side on a surface at 90°, then rotate its base without losing contact',
  },
  'pt-BR': {
    'Horizontal!!!': 'Horizontal!!!',
    'Keep the device on horizontal': 'Mantenha o dispositivo na horizontal.',
    'Max Dip!!!': 'Inclinação Máxima!!!',
    'Place the phone’s side on a surface at 90°, then rotate its base without losing contact': 'Coloque o telefone de lado em uma superfície a 90°, e gire sua base sem perder o contato',
  },
};
