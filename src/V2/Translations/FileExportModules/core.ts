import { LanguageTag } from '@V2/Types/AppTypes';

type TranslationDTO = Record<LanguageTag, {
  'Adding file to zip: ${file.name}': (fileName: string) => string
}>

export const R_FileExportModules_core: TranslationDTO = {
  'en-US': {
    "Adding file to zip: ${file.name}": (fileName: string) => `Adding file to zip: ${fileName}`,
  },
  'pt-BR': {
    "Adding file to zip: ${file.name}": (fileName: string) => `Adicionando arquivo ao zip: ${fileName}`,
  },
};
