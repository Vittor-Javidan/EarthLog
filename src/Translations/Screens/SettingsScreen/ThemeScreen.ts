import { ThemeDTO } from '@Types/AppTypes';
import { Languages } from '@Types/AppTypes';

export type Translations_ThemeScreen = Record<Languages, Record<keyof ThemeDTO, string> & {
  'Theme': string
  'Invalid Color': string
  'unlock': string
  'lock': string
}>

export const translations_ThemeScreen: Translations_ThemeScreen = {
  'en-US': {
    'Theme': 'Theme',
    'Invalid Color': 'Invalid Color',
    'unlock': 'unlock',
    'lock': 'lock',
    background: 'Background',
    onBackground: 'Background font',
    onBackground_Placeholder: 'Background font (hint)',
    primary: 'Primary',
    onPrimary: 'Primary font',
    onPrimary_Placeholder: 'Primary font (hint)',
    secondary: 'Secondary',
    onSecondary: 'Secondary font',
    onSecondary_PlaceHolder: 'Secondary font (hint)',
    tertiary: 'Tertiary',
    onTertiary: 'Tertiary font',
    onTertiary_Placeholder: 'Tertiary font (hint)',
    onPressColorPrimary: 'Button: press',
    confirm: 'Button: save / new',
    onConfirm: 'Button: save / new font',
    modified: 'Button: modified',
    onModified: 'Button: modified font',
    wrong: 'Button: warning',
    onWrong: 'Button: warning font',
  },
  'pt-BR': {
    'Theme': 'Tema',
    'Invalid Color': 'Cor inválida',
    'unlock': 'destravar',
    'lock': 'travar',
    background: 'Tela de fundo',
    onBackground: 'Fonte tela de fundo',
    onBackground_Placeholder: 'Fonte tela de fundo (dica)',
    primary: 'Primária',
    onPrimary: 'Fonte primária',
    onPrimary_Placeholder: 'Fonte primária (dica)',
    secondary: 'Secundária',
    onSecondary: 'Fonte secundária',
    onSecondary_PlaceHolder: 'Fonte secundária (dica)',
    tertiary: 'Terciária',
    onTertiary: 'Fonte terciária',
    onTertiary_Placeholder: 'Fonte terciária (dica)',
    onPressColorPrimary: 'Botão: pressionar',
    confirm: 'Botão: salvar / novo',
    onConfirm: 'Botão: fonte salvar / novo',
    modified: 'Botão: modificado',
    onModified: 'Botão: fonte modificado',
    wrong: 'Botão: aviso',
    onWrong: 'Botão: fonte aviso',
  },
};
