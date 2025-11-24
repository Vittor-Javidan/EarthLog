import {
  LanguageTag
} from '@V2/Types';

type TranslationDTO = Record<LanguageTag, {

  "Don't show this tutorial again.": string;
  'Next': string;
  'Back': string;
  'Finish': string;
  'Important': string;

  // Map Tutorial
  'Every time the app starts fresh, it assumes no subscription is active. The subscription status is then retrieved directly from the Play Store when an internet connection is available.': string
  'So, to access the map offline, please open the app at least once before starting your work, while you have an internet connection.': string;
  'PS: You can minimize the app afterward, but avoid killing its background process to ensure the map remains available offline.': string;

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
    'Important': 'Important',

    // Map Tutorial
    'Every time the app starts fresh, it assumes no subscription is active. The subscription status is then retrieved directly from the Play Store when an internet connection is available.': 'Every time the app starts fresh, it assumes no subscription is active. The subscription status is then retrieved directly from the Play Store when an internet connection is available.',
    'So, to access the map offline, please open the app at least once before starting your work, while you have an internet connection.': 'So, to access the map offline, please open the app at least once before starting your work, while you have an internet connection.',
    'PS: You can minimize the app afterward, but avoid killing its background process to ensure the map remains available offline.': 'PS: You can minimize the app afterward, but avoid killing its background process to ensure the map remains available offline.',

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
    'Important': 'Importante',

    // Map Tutorial
    'Every time the app starts fresh, it assumes no subscription is active. The subscription status is then retrieved directly from the Play Store when an internet connection is available.': 'Toda vez que o aplicativo inicia do zero, ele assume que nenhuma assinatura está ativa. O status da assinatura é então recuperado diretamente da Play Store quando a conexão com a internet está disponível.',
    'So, to access the map offline, please open the app at least once before starting your work, while you have an internet connection.': 'Portanto, para acessar o mapa offline, abra o aplicativo pelo menos uma vez antes de iniciar seu trabalho, enquanto você tiver uma conexão com a internet.',
    'PS: You can minimize the app afterward, but avoid killing its background process to ensure the map remains available offline.': 'PS: Você pode minimizar o aplicativo depois, mas evite encerrar seu processo de background para garantir que o mapa permaneça disponível offline.',

    // Bubble Level Tutorial
    '1. Place the side of your device on a surface, at 90° angle.': '1. Coloque o lado do seu dispositivo em uma superfície, em um ângulo de 90°.',
    '2. Rotate only the base or top of your device, until you see a green circle indicator.': '2. Gire apenas a base ou o topo do seu dispositivo, até aparece um circulo verde.',
    'PS: If you use this often, consider buying your phone a case to protect it while using this feature.': 'Obs: Se você usar isso com frequência, considere comprar uma capa para proteger seu telefone e evitar desgaste.',

  },
};
