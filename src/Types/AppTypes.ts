export type Loading = 'Loaded' | 'Loading';

export const languageTags   = ['en-US', 'pt-BR'] as const;
export const languageLabels = ['English', 'Português-Brasil'] as const;
export type Languages    = (typeof languageTags)[number];
export type LanguageTags = (typeof languageTags)[number];

export const ThemeNamesArray_APP     = ['default'] as const;
export const ThemeNamesArray_Widgets = ['default'] as const;
export type ThemeNames_APP     = (typeof ThemeNamesArray_APP)[number];
export type ThemeNames_Widgets = (typeof ThemeNamesArray_Widgets)[number];

export type AppThemeDTO = {
  background: string
  onBackground: string
  onBackground_Placeholder: string

  primary: string
  onPrimary: string
  onPrimary_Placeholder: string

  secondary: string
  onSecondary: string
  onSecondary_PlaceHolder: string

  tertiary: string
  onTertiary: string
  onTertiary_Placeholder: string

  confirm: string
  onConfirm: string

  modified: string
  onModified: string

  wrong: string
  onWrong: string

  onPressColorPrimary: string
}

export type NewAppThemeDTO = {
  background: string
  primary: string
  secondary: string
  tertiary: string
  confirm: string
  wrong: string
  warning: string
}

export type ConfigDTO = {
  language: Languages
  appTheme: ThemeNames_APP
}

export type AlertModalConfig = {
  question: string
  type: 'warning' | 'exit app' | 'project creation' | 'sample creation'
  id_project?: string
  id_sample?: string
}

export type RegexRules = {
  'noSpaces': RegExp
  'noSpecialLetter': RegExp
  'id': RegExp
}
