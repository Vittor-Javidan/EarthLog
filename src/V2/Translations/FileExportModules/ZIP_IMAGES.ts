import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'skipping image compression': string
  'compressing images': string
  'creating zip file': string
  'Preparing to share file': string
  'Try reducing export image quality. error: ': string
}>

export const R_FileExportModules_ZIP_IMAGES: TranslationDTO = {
  'en-US': {
    'skipping image compression': 'Skipping image compression',
    'compressing images': 'Compressing images',
    'creating zip file': 'Creating zip file',
    'Preparing to share file': 'Preparing to share file',
    'Try reducing export image quality. error: ': 'Try reducing export image quality. error: ',
  },
  'pt-BR': {
    'skipping image compression': 'Pulando compressão de imagens',
    'compressing images': 'Comprimindo imagens',
    'creating zip file': 'Criando arquivo zip',
    'Preparing to share file': 'Preparando para compartilhar o arquivo',
    'Try reducing export image quality. error: ': 'Tente reduzir a qualidade de exportação das imagens. erro: ',
  },
};
