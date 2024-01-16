import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Openning store...': string
  'Buy': string
  'A premium subscription will allow you to:': string
  '- Download projects with more than 5 samples': string
  '- Create unlimited samples within a single project': string
  'Subscriptions are not required to use the app and can be canceled at any time.': string
  'Price': string
  'Restarting the app...': string
  'Month': string
}>

export const R_Alert_BuySubscription: TranslationDTO = {
  'en-US': {
    'Openning store...': 'Openning store...',
    'Buy': 'Buy',
    'A premium subscription will allow you to:': 'A premium subscription will allow you to:',
    '- Download projects with more than 5 samples': '- Download projects with more than 5 samples',
    '- Create unlimited samples within a single project': '- Create unlimited samples within a single project',
    'Subscriptions are not required to use the app and can be canceled at any time.': 'Subscriptions are not required to use the app and can be canceled at any time.',
    'Price': 'Price',
    'Restarting the app...': 'Restarting the app...',
    'Month': 'Month',
  },
  'pt-BR': {
    'Openning store...': 'Abrindo a loja...',
    'Buy': 'Comprar',
    'A premium subscription will allow you to:': 'Com a subscrição premium, você poderá:',
    '- Download projects with more than 5 samples': '- Baixar projetos com mais de 5 amostras',
    '- Create unlimited samples within a single project': '- Criar amostras em quantidades ilimitadas dentro de um único projeto',
    'Subscriptions are not required to use the app and can be canceled at any time.': 'A subscrição não é obrigatória para a utilização do aplicativo, e pode ser cancelada a qualquer momento.',
    'Price': 'Preço',
    'Restarting the app...': 'Reiniciando o aplicativo...',
    'Month': 'Mês',
  },
};
