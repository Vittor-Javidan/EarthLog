export type Loading = 'Loaded' | 'Loading';

export const languageTags   = ['en-US', 'pt-BR'] as const;
export type LanguageTag = (typeof languageTags)[number];

export const ThemeNamesArray_APP     = ['default'] as const;
export const ThemeNamesArray_Widgets = ['default'] as const;
export type ThemeNames_APP     = (typeof ThemeNamesArray_APP)[number];
export type ThemeNames_Widgets = (typeof ThemeNamesArray_Widgets)[number];

export type AppThemeDTO = {
  layout: {
    root: {
      background: string
    }
    loadingIcon: {
      font: string
    }
    statusBar: {
      background: string
    }
    navbar: {
      font: string
      background: string
      font_active: string
      background_active: string
    }
    navigationTree: {
      font: string
      background: string
      border: string
    }
    navigationTreeButton: {
      font: string
      font_active: string
      background: string
      background_active: string
    }
    drawer: {
      font: string
      background: string
      border: string
    }
    drawerButton: {
      font: string
      background: string
      font_active: string
      background_active: string
    }
    carousel: {
      background: string
      background_Screens: string
      border: string
    }
    carouselButton: {
      font: string
      background: string
      font_active: string
      background_active: string
    }
    screenButtons: {
      font: string
      confirm: string
      wrong: string
      backgroud: string
      background_active: string
    }
    modalPopUp: {
      font: string
      font_placeHolder: string
      background: string
      background_active: string
      background_Button: string
      confirm: string
      wrong: string
    }
  }
  component: {
    font: string
    font_Button: string
    background: string
    background_Button: string
    confirm: string
    wrong: string
    warning: string
  }
}

export type ConfigDTO = {
  language: LanguageTag
  appTheme: ThemeNames_APP
}

export type AlertModalConfig = {
  question: string
  type: 'warning' | 'exit app' | 'project creation' | 'sample creation'
  id_project?: string
  id_sample?: string
}

export type RegexRules = {
  'noSpaces':        RegExp
  'noSpecialLetter': RegExp
  'id':              RegExp
  'hexColor':        RegExp
}
