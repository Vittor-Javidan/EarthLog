import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {

  "Don't show this tutorial again.": string;
  'Next': string;
  'Back': string;
  'Finish': string;

  // Bubble Level Tutorial
  '1. Place the side of your device on a surface, at 90° angle.': string,
  '2. Rotate only the base or top of your device, until you see a green circle indicator.': string,
  'PS: If you use this often, consider buying your phone a case to protect it while using this feature.': string,
}>

export const R_Layer_Tutorial: TranslationDTO = {
  'en-US': {

    "Don't show this tutorial again.": "Don't show this tutorial again.",
    'Next': 'Next',
    'Back': 'Back',
    'Finish': 'Finish',

    // Bubble Level Tutorial
    '1. Place the side of your device on a surface, at 90° angle.': '1. Place the side of your device on a surface, at 90° angle.',
    '2. Rotate only the base or top of your device, until you see a green circle indicator.': '2. Rotate only the base or top of your device, until you see a green circle indicator.',
    'PS: If you use this often, consider buying your phone a case to protect it while using this feature.': 'PS: If you use this often, consider buying your phone a case to protect it while using this feature.',

  },
  'pt-BR': {

    "Don't show this tutorial again.": "Não mostrar este tutorial novamente.",
    'Next': 'Próximo',
    'Back': 'Voltar',
    'Finish': 'Finalizar',

    // Bubble Level Tutorial
    '1. Place the side of your device on a surface, at 90° angle.': '1. Coloque o lado do seu dispositivo em uma superfície, em um ângulo de 90°.',
    '2. Rotate only the base or top of your device, until you see a green circle indicator.': '2. Gire apenas a base ou o topo do seu dispositivo, até aparece um circulo verde.',
    'PS: If you use this often, consider buying your phone a case to protect it while using this feature.': 'Obs: Se você usar isso com frequência, considere comprar uma capa para proteger seu telefone e evitar desgaste.',

  },
};
