import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Free Premium befenefits for you until we hit 1000 users! If you wish to support the app development financially, you can still buy the premium plan.': string
  'Premium plan': string
}>

export const R_Layout_Root: TranslationDTO = {
  'en-US': {
    'Free Premium befenefits for you until we hit 1000 users! If you wish to support the app development financially, you can still buy the premium plan.': 'Free Premium befenefits for you until we hit 1000 users!\n\nIf you wish to support the app development financially, you can still buy the premium plan.',
    'Premium plan': 'Premium plan',
  },
  'pt-BR': {
    'Free Premium befenefits for you until we hit 1000 users! If you wish to support the app development financially, you can still buy the premium plan.': 'Benefícios Premium gratuitos para você até atingirmos 1000 usuários!\n\nSe você deseja apoiar o desenvolvimento do aplicativo financeiramente, você ainda pode comprar o plano premium.',
    'Premium plan': 'Plano Premium',
  },
};
