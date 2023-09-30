import ThemeService from '@Services/ThemeService';
import { LanguageTag } from '@Types/AppTypes';
import { InputTypes } from '@Types/ProjectTypes';

type widgetThemNames = (typeof ThemeService.themeNamesArray.Widget)[number];

type TranslationDTO = Record<LanguageTag, {
  'Confirm to delete this widget.': string,
  'Confirm to delete this field.': string,
  'Add automatically': string
  'Saved': string
  'Saving...': string
  'Select a theme:': string
  'Add a new field:': string
} & Record<widgetThemNames, string> & Record<InputTypes, string>>

export const R_Widget: TranslationDTO = {
  'en-US': {
    'Confirm to delete this widget.': 'Confirm to delete this widget.',
    'Confirm to delete this field.': 'Confirm to delete this field.',
    'Add automatically': 'Add automatically',
    'Saved': 'Saved',
    'Saving...': 'Saving...',
    'Select a theme:': 'Select a theme:',
    'Add a new field:': 'Add a new field:',

    // WIDGET THEMES
    'dark': 'Dark',
    'light': 'Light',

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

    // WIDGET THEMES
    'dark': 'Escuro',
    'light': 'Claro',

    // INPUT TYPES
    'boolean': 'Verdadeiro/Falso',
    'string': 'Texto',
    'gps': 'GPS',
  },
};
