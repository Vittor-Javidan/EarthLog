import { ErrorCodes } from '@V2/Globals/ErrorsCodes';
import { LanguageTag } from '@V2/Types/AppTypes';

type InnerTranslationDTO = Record<LanguageTag, Record<typeof ErrorCodes[keyof typeof ErrorCodes], string>>;

const r_ErrorCodes: InnerTranslationDTO = {
  'en-US': {
    'EL_ERROR: Network not available': 'Network request failed. Did your phone or server go offline?',
    'EL_ERROR: Server did not return access token': 'No access token was returned by the server.',
    'EL_ERROR: Attempt to upload a not available picture': 'The picture you are trying to upload is not available on your device.',
  },
  'pt-BR': {
    'EL_ERROR: Network not available': 'Falha na requisição de rede. O seu celular ou servidor está offline?',
    'EL_ERROR: Server did not return access token': 'Nenhum token de acesso foi retornado pelo servidor.',
    'EL_ERROR: Attempt to upload a not available picture': 'Tentativa de envio de uma foto que não está disponível no seu dispositivo.',
  },
} as const;

function enUS(message: string) {
  const erroCodesObject = r_ErrorCodes['en-US'];
  switch (true) {
    case (Object.keys(erroCodesObject)).includes(message): return erroCodesObject[message as typeof ErrorCodes[keyof typeof ErrorCodes]];
    default: return message;
  }
}

function ptBR(message: string) {
  const erroCodesObject = r_ErrorCodes['pt-BR'];
  switch (true) {
    case (Object.keys(erroCodesObject)).includes(message): return erroCodesObject[message as typeof ErrorCodes[keyof typeof ErrorCodes]];
    default: return message;
  }
}

type TranslationDTO = Record<LanguageTag, (message: string) => string>

export const R_ErrorCodes: TranslationDTO = {
  'en-US': enUS,
  'pt-BR': ptBR,
};
