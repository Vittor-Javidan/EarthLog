import { LanguageTag } from '@Types/AppTypes';
import { InputTypes } from '@Types/ProjectTypes';

type TranslationDTO = Record<LanguageTag, {
  'Confirm to delete this widget.': string,
  'Confirm to delete this field.': string,
  'Add automatically': string
  'Saved': string
  'Saving...': string
  'Select a theme:': string
  'Add a new field:': string
} & Record<InputTypes, string>>

export const R_Widget_Root: TranslationDTO = {
  'en-US': {
    'Confirm to delete this widget.': 'Confirm to delete this widget.',
    'Confirm to delete this field.': 'Confirm to delete this field.',
    'Add automatically': 'Add automatically',
    'Saved': 'Saved',
    'Saving...': 'Saving...',
    'Select a theme:': 'Select a theme:',
    'Add a new field:': 'Add a new field:',

    // INPUT TYPES
    'boolean': 'True/False',
    'string': 'Text',
    'gps': 'GPS',
  },
  'pt-BR': {
    'Confirm to delete this widget.': 'Confirme para deletar este widget.',
    'Confirm to delete this field.': 'Confirme para deletar este campo.',
    'Add automatically': 'Adicionar automaticamente',
    'Saved': 'Salvo',
    'Saving...': 'Salvando...',
    'Select a theme:': 'Selecione um tema:',
    'Add a new field:': 'Adicione um novo campo',

    // INPUT TYPES
    'boolean': 'Verdadeiro/Falso',
    'string': 'Texto',
    'gps': 'GPS',
  },
};
