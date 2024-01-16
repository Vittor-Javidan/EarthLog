import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Camera permission denied': string
  'Please give camera access permission on your phone settings': string
  'Grant permission': string
}>

export const R_Component_Camera: TranslationDTO = {
  'en-US': {
    'Camera permission denied': 'Camera permission denied',
    'Please give camera access permission on your phone settings': 'Please give camera access permission on your phone settings',
    'Grant permission': 'Grant permission',
  },
  'pt-BR': {
    'Camera permission denied': 'Permissão da câmera negada',
    'Please give camera access permission on your phone settings': 'Dê permissão de acesso à câmera nas configurações do seu telefone',
    'Grant permission': 'Conceder permissão',
  },
};
