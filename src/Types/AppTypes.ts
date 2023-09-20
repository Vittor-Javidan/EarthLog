export type Loading = 'Loaded' | 'Loading';

export const languageTags = ['en-US', 'pt-BR'] as const;
export const languageLabels = ['English', 'Português-Brasil'] as const;
export type Languages = (typeof languageTags)[number];
export type LanguageTags = (typeof languageTags)[number];

export type ThemeDTO = {
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

export type ConfigDTO = {
  language: Languages
  theme: ThemeDTO
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
