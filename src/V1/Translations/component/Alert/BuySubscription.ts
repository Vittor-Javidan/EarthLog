import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Openning store...': string
  'Closing...': string
  'Loading price...': string
  'Buy': string
  'Incentivize the development of new features and improvements!': string
  '- Not being a sponsor does not affect your app usage in any way, and you can cancel at any time.': string
  'Price': string
  'Restarting the app...': string
  'Month': string
}>

export const R_Alert_BuySubscription: TranslationDTO = {
  'en-US': {
    'Openning store...': 'Openning store...',
    'Closing...': 'Closing...',
    'Loading price...': 'Loading price...',
    'Buy': 'Buy',
    'Incentivize the development of new features and improvements!': 'Incentivize the development of new features and improvements!',
    '- Not being a sponsor does not affect your app usage in any way, and you can cancel at any time.': '- Not being a sponsor does not affect your app usage in any way, and you can cancel at any time.',
    'Price': 'Price',
    'Restarting the app...': 'Restarting the app...',
    'Month': 'Month',
  },
  'pt-BR': {
    'Openning store...': 'Abrindo a loja...',
    'Closing...': 'Fechando...',
    'Loading price...': 'Carregando preço...',
    'Buy': 'Comprar',
    'Incentivize the development of new features and improvements!': 'Incentive o desenvolvimento de novas funcionalidades e melhorias!',
    '- Not being a sponsor does not affect your app usage in any way, and you can cancel at any time.': '- Não ser um patrocinador não afeta em nada o uso do seu aplicativo, e você pode cancelar a qualquer momento.',
    'Price': 'Preço',
    'Restarting the app...': 'Reiniciando o aplicativo...',
    'Month': 'Mês',
  },
};
