import { LanguageTag } from '@V2/Types/AppTypes';
import { InputTypes } from '@V2/Types/ProjectTypes';

type TranslationDTO = Record<LanguageTag, {
  'This will delete any info or media related to this wiget. This action is permanent and cannot be undone.': string,
  'This will delete any info or media related to this field. This action is permanent and cannot be undone.': string,
  'Add automatically': string
  'Saved': string
  'Saving...': string
  'Select a theme:': string
  'Add a new field:': string
  'Widget name': string
} & Record<InputTypes, string>>

export const R_Widget_Root: TranslationDTO = {
  'en-US': {
    'This will delete any info or media related to this wiget. This action is permanent and cannot be undone.': 'This will delete any info or media related to this wiget. This action is permanent and cannot be undone.',
    'This will delete any info or media related to this field. This action is permanent and cannot be undone.': 'This will delete any info or media related to this field. This action is permanent and cannot be undone.',
    'Add automatically': 'Add automatically',
    'Saved': 'Saved',
    'Saving...': 'Saving...',
    'Select a theme:': 'Select a theme:',
    'Add a new field:': 'Add a new field:',
    'Widget name': 'Widget name',

    // INPUT TYPES
    'boolean': 'True/False',
    'string': 'Text',
    'options': 'Options',
    'selection': 'Selection',
    'gps': 'GPS',
    'picture': 'Picture',
  },
  'pt-BR': {
    'This will delete any info or media related to this wiget. This action is permanent and cannot be undone.': 'Isso irá apagar qualquer informação ou mídia relacionada a esse widget. Essa ação é permanente e não pode ser desfeita.',
    'This will delete any info or media related to this field. This action is permanent and cannot be undone.': 'Isso irá apagar qualquer informação ou mídia relacionada a esse campo. Essa ação é permanente e não pode ser desfeita.',
    'Add automatically': 'Adicionar automaticamente',
    'Saved': 'Salvo',
    'Saving...': 'Salvando...',
    'Select a theme:': 'Selecione um tema:',
    'Add a new field:': 'Adicione um novo campo',
    'Widget name': 'Nome do widget',

    // INPUT TYPES
    'boolean': 'Verdadeiro/Falso',
    'string': 'Texto',
    'options': 'Opções',
    'selection': 'Seleção',
    'gps': 'GPS',
    'picture': 'Foto',
  },
};
