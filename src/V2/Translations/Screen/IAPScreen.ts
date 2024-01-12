import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Subscriptions Under Testing': string
  'Subscriptions are currently being tested and not fully implemented. All app features are currently fully unlocked. Purchasing a subscription at this time will not change app usage and will not persist once testing is complete. Please check back later once subscription integration is complete.': string
  'Subscribing will allow you to:': string
  '- Download projects with more than 5 samples': string
  '- Create unlimited samples within a single project': string
}>

export const R_Screen_IAP: TranslationDTO = {
  'en-US': {
    'Subscriptions Under Testing': 'Subscriptions Under Testing',
    'Subscriptions are currently being tested and not fully implemented. All app features are currently fully unlocked. Purchasing a subscription at this time will not change app usage and will not persist once testing is complete. Please check back later once subscription integration is complete.': 'Subscriptions are currently being tested and not fully implemented. All app features are currently fully unlocked. Purchasing a subscription at this time will not change app usage and will not persist once testing is complete. Please check back later once subscription integration is complete.',
    'Subscribing will allow you to:': 'Subscribing will allow you to:',
    '- Download projects with more than 5 samples': '- Download projects with more than 5 samples',
    '- Create unlimited samples within a single project': '- Create unlimited samples within a single project',
  },
  'pt-BR': {
    'Subscriptions Under Testing': 'Subscrições Sob Testes',
    'Subscriptions are currently being tested and not fully implemented. All app features are currently fully unlocked. Purchasing a subscription at this time will not change app usage and will not persist once testing is complete. Please check back later once subscription integration is complete.': 'As assinaturas estão atualmente em fase de teste e ainda não foram totalmente implementadas. Todas as funcionalidades do aplicativo estão completamente desbloqueadas no momento. Adquirir uma assinatura neste momento não alterará o uso do aplicativo e não será mantido após a conclusão dos testes. Por favor, verifique novamente mais tarde, quando a integração das assinaturas estiver completa.',
    'Subscribing will allow you to:': 'Assinando, você poderá:',
    '- Download projects with more than 5 samples': '- Baixar projetos com mais de 5 amostras',
    '- Create unlimited samples within a single project': '- Criar amostras em quantidades ilimitadas dentro de um único projeto',
  },
};
