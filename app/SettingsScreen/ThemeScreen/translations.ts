import { ThemeDTO } from '../../../Services/ThemeService';
import { Languages } from '../../../Types/LanguageTypes';

export type ThemeScreenTranslations_InputLabels = Record<Languages, Record<keyof ThemeDTO, string>>
export type ThemeScreenTranslations = Record<Languages, {
  'Theme': string
  'Main Screen': string
  'Save and Return': string
  'Reset Theme': string
  'Discart and Return': string
  'Invalid Color': string
  'unlock': string
  'lock': string
}>

export const languages: ThemeScreenTranslations = {
  'en-US': {
    'Theme': 'Theme',
    'Main Screen': 'Main Screen',
    'Save and Return': 'Save and Return',
    'Reset Theme': 'Reset Theme',
    'Discart and Return': 'Discart and Return',
    'Invalid Color': 'Invalid Color',
    'unlock': 'unlock',
    'lock': 'lock',
  },
  'pt-BR': {
    'Theme': 'Tema',
    'Main Screen': 'Tela Inicial',
    'Save and Return': 'Salvar e Voltar',
    'Reset Theme': 'Resetar tema',
    'Discart and Return': 'Descartar e voltar',
    'Invalid Color': 'Cor inválida',
    'unlock': 'destravar',
    'lock': 'travar',
  },
};

export const inputLabels: ThemeScreenTranslations_InputLabels = {
  'en-US': {
    background: 'Background',
    onBackground: 'Background font',
    primary: 'Primary',
    onPrimary: 'Primary font',
    secondary: 'Secondary',
    onSecondary: 'Secondary font',
    tertiary: 'Tertiary',
    onTertiary: 'Tertiary font',
    onPressColorPrimary: 'Button: press',
    confirm: 'Button: confirm',
    onConfirm: 'Button: confirm font',
    modified: 'Button: modified',
    onModified: 'Button: modified font',
    wrong: 'Button: warning',
    onWrong: 'Button: warning font',
  },
  'pt-BR': {
    background: 'Tela de fundo',
    onBackground: 'Fonte tela de fundo',
    primary: 'Primária',
    onPrimary: 'Fonte primária',
    secondary: 'Secundária',
    onSecondary: 'Fonte secundária',
    tertiary: 'Terciária',
    onTertiary: 'Fonte terciária',
    onPressColorPrimary: 'Botão: pressionar',
    confirm: 'Botão: confirmar',
    onConfirm: 'Botão: fonte confirmar',
    modified: 'Botão: modificado',
    onModified: 'Botão: fonte modificado',
    wrong: 'Botão: aviso',
    onWrong: 'Botão: fonte aviso',
  },
};
