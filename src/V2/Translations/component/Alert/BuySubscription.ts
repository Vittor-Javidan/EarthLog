import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Openning store...': string
  'Closing...': string
  'Loading price...': string
  'Buy': string
  'A premium subscription will allow you to:': string
  '- Download projects with more than 10 samples': string
  '- Create more than 10 samples within a single project': string
  'Subscriptions are not required to use the app and can be canceled at any time.': string
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
    'A premium subscription will allow you to:': 'A premium subscription will allow you to:',
    '- Download projects with more than 10 samples': '- Download projects with more than 10 samples',
    '- Create more than 10 samples within a single project': '- Create more than 10 samples within a single project',
    'Subscriptions are not required to use the app and can be canceled at any time.': 'Subscriptions are not required to use the app and can be canceled at any time.',
    'Price': 'Price',
    'Restarting the app...': 'Restarting the app...',
    'Month': 'Month',
  },
  'pt-BR': {
    'Openning store...': 'Abrindo a loja...',
    'Closing...': 'Fechando...',
    'Loading price...': 'Carregando preço...',
    'Buy': 'Comprar',
    'A premium subscription will allow you to:': 'Com a subscrição premium, você poderá:',
    '- Download projects with more than 10 samples': '- Baixar projetos com mais de 10 amostras',
    '- Create more than 10 samples within a single project': '- Criar mais de 10 amostras em um único projeto',
    'Subscriptions are not required to use the app and can be canceled at any time.': 'A subscrição não é obrigatória para a utilização do aplicativo, e pode ser cancelada a qualquer momento.',
    'Price': 'Preço',
    'Restarting the app...': 'Reiniciando o aplicativo...',
    'Month': 'Mês',
  },
};
