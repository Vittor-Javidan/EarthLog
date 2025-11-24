import {
  LanguageTag
} from '@V1/Types';

export type TranslationDTO = Record<LanguageTag, {
  'Play Store Subscriptions': string
  'Map Access': string
  '${price}/month': (price: string) => string
  'Auto-renews monthly': string
  'Enable the map inside the app': string
  'This app does not display ads or sell essential features. However, accessing the interactive map uses paid map services. This small subscription simply covers the map usage costs, keeping the app sustainable.': string
  'You can still view your coordinates on Google Maps for free — each GPS entry includes a button to open it on google maps.': string
  'Map Access Granted': string
  'Sponsor the App': string
  'A simple subscription to support the development of the app. Map access is included. After buying this, remember to cancel your map subscription if you had one!': string
  'Tier 1': string
  'Tier 2': string
  'Tier 3': string
  'You aready sponsoring the app. Thank you for your support!': string
}>

export const R_Screen_Subscriptions: TranslationDTO = {
  'en-US': {
    'Play Store Subscriptions': 'Play Store Subscriptions',
    'Map Access': 'Map Access',
    '${price}/month': (price: string) => `${price}/month`,
    'Auto-renews monthly': 'Auto-renews monthly',
    'Enable the map inside the app': 'Enable the map inside the app',
    'This app does not display ads or sell essential features. However, accessing the interactive map uses paid map services. This small subscription simply covers the map usage costs, keeping the app sustainable.': 'This app does not display ads or sell essential features. However, accessing the interactive map uses paid map services. This small subscription simply covers the map usage costs, keeping the app sustainable.',
    'You can still view your coordinates on Google Maps for free — each GPS entry includes a button to open it on google maps.': 'You can still view your coordinates on Google Maps for free — each GPS entry includes a button to open it on google maps.',
    'Map Access Granted': 'Map Access Granted',
    'Sponsor the App': 'Sponsor the App',
    'A simple subscription to support the development of the app. Map access is included. After buying this, remember to cancel your map subscription if you had one!': 'A simple subscription to support the development of the app. Map access is included. After buying this, remember to cancel your map subscription if you had one!',
    'Tier 1': 'Tier 1',
    'Tier 2': 'Tier 2',
    'Tier 3': 'Tier 3',
    'You aready sponsoring the app. Thank you for your support!': 'You aready sponsoring the app. Thank you for your support!',
  },
  'pt-BR': {
    'Play Store Subscriptions': 'Assinaturas da Play Store',
    'Map Access': 'Acesso ao Mapa',
    '${price}/month': (price: string) => `${price}/mês`,
    'Auto-renews monthly': 'Renova automaticamente mensalmente',
    'Enable the map inside the app': 'Ativa o mapa dentro do aplicativo',
    'This app does not display ads or sell essential features. However, accessing the interactive map uses paid map services. This small subscription simply covers the map usage costs, keeping the app sustainable.': 'Este aplicativo não exibe anúncios nem vende recursos essenciais. No entanto, acessar o mapa interativo usa serviços de mapa pagos. Esta pequena assinatura simplesmente cobre os custos de uso do mapa, mantendo o aplicativo sustentável.',
    'You can still view your coordinates on Google Maps for free — each GPS entry includes a button to open it on google maps.': 'Você ainda pode ver suas coordenadas no Google Maps gratuitamente — cada entrada de GPS inclui um botão para abri-la no Google Maps.',
    'Map Access Granted': 'Acesso ao Mapa Concedido',
    'Sponsor the App': 'Apoie o Aplicativo',
    'A simple subscription to support the development of the app. Map access is included. After buying this, remember to cancel your map subscription if you had one!': 'Uma assinatura simples para apoiar o desenvolvimento do aplicativo. O acesso ao mapa está incluído. Após a compra, lembre-se de cancelar sua assinatura de mapa, se você tiver uma!',
    'Tier 1': 'Nível 1',
    'Tier 2': 'Nível 2',
    'Tier 3': 'Nível 3',
    'You aready sponsoring the app. Thank you for your support!': 'Você já está apoiando o aplicativo. Obrigado pelo seu apoio!',
  },
};
