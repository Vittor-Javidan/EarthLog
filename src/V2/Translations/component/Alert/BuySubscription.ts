import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Openning store...': string
  'Buy': string
  'Subscribing will allow you to:': string
  '- Download projects with more than 5 samples': string
  '- Create unlimited samples within a single project': string
  'Price': string
  'Restarting the app...': string
}>

export const R_Alert_BuySubscription: TranslationDTO = {
  'en-US': {
    'Openning store...': 'Openning store...',
    'Buy': 'Buy',
    'Subscribing will allow you to:': 'Subscribing will allow you to:',
    '- Download projects with more than 5 samples': '- Download projects with more than 5 samples',
    '- Create unlimited samples within a single project': '- Create unlimited samples within a single project',
    'Price': 'Price',
    'Restarting the app...': 'Restarting the app...',
  },
  'pt-BR': {
    'Openning store...': 'Abrindo a loja...',
    'Buy': 'Comprar',
    'Subscribing will allow you to:': 'Assinando, você poderá:',
    '- Download projects with more than 5 samples': '- Baixar projetos com mais de 5 amostras',
    '- Create unlimited samples within a single project': '- Criar amostras em quantidades ilimitadas dentro de um único projeto',
    'Price': 'Preço',
    'Restarting the app...': 'Reiniciando o aplicativo...',
  },
};
