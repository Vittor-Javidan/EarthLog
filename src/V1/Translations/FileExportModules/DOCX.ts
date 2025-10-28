import { LanguageTag } from '@V1/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Project info': string
  'Samples': string
  'Reference coordinate': string
  'Not applicable': string
  'Empty': string
  'Latitude:': string
  'Longitude:': string
  'Altitude:': string
  'Picture': string
  'Description': string
  'Picture not available on device. Try download from cloud.': string
  'Try reducing export image quality. error: ': string
  'Quality selected: ': string
  'Resetting temporary directory': string
  'Creating Word folder': string
  'Creating content types file': string
  'Creating relationship folder': string
  'Creating web settings file': string
  'Creating relationship file': string
  'Copying image files': string
  'Creating document content': string
  'Creating DOCX file': string
  'Preparing to share document': string
}>

export const R_FileExportModules_DOCX: TranslationDTO = {
  'en-US': {
    'Project info': 'Project info',
    'Samples': 'Samples',
    'Reference coordinate': 'Reference coordinate',
    'Not applicable': 'Not applicable',
    'Empty': 'Empty',
    'Latitude:': 'Latitude:',
    'Longitude:': 'Longitude:',
    'Altitude:': 'Altitude:',
    'Picture': 'Picture',
    'Description': 'Description',
    'Picture not available on device. Try download from cloud.': 'Picture not available on device. Try download from cloud.',
    'Try reducing export image quality. error: ': 'Try reducing export image quality. error: ',
    'Quality selected: ': 'Quality selected: ',
    'Resetting temporary directory': 'Resetting temporary directory',
    'Creating Word folder': 'Creating Word folder',
    'Creating content types file': 'Creating content types file',
    'Creating relationship folder': 'Creating relationship folder',
    'Creating web settings file': 'Creating web settings file',
    'Creating relationship file': 'Creating relationship file',
    'Copying image files': 'Copying image files',
    'Creating document content': 'Creating document content',
    'Creating DOCX file': 'Creating DOCX file',
    'Preparing to share document': 'Preparing to share document',
  },
  'pt-BR': {
    'Project info': 'Informações do projeto',
    'Samples': 'Amostras',
    'Reference coordinate': 'Coordenada de referência',
    'Not applicable': 'Não aplicável',
    'Empty': 'Vazio',
    'Latitude:': 'Latitude:',
    'Longitude:':'Longitude:',
    'Altitude:': 'Altitude:',
    'Picture': 'Foto',
    'Description': 'Descrição',
    'Picture not available on device. Try download from cloud.': 'Foto não disponível no dispositivo. Tente baixar da nuvem.',
    'Try reducing export image quality. error: ': 'Tente reduzir a qualidade da imagem de exportação. erro: ',
    'Quality selected: ': 'Qualidade selecionada: ',
    'Resetting temporary directory': 'Redefinindo diretório temporário',
    'Creating Word folder': 'Criando pasta do Word',
    'Creating content types file': 'Criando arquivo de tipos de conteúdo',
    'Creating relationship folder': 'Criando pasta de relações',
    'Creating web settings file': 'Criando arquivo de configurações da web',
    'Creating relationship file': 'Criando arquivo de relações',
    'Copying image files': 'Copiando arquivos de imagem',
    'Creating document content': 'Criando conteúdo do documento',
    'Creating DOCX file': 'Criando arquivo DOCX',
    'Preparing to share document': 'Preparando para compartilhar o documento',
  },
};
