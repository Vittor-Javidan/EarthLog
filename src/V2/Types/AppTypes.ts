export type Loading = 'Loaded' | 'Loading';

export const languageTags   = ['en-US', 'pt-BR'] as const;
export type LanguageTag = (typeof languageTags)[number];

export const DateFormatsArray = [
  'yyyy / mm / dd', 'yyyy / dd / mm', 'mm / yyyy / dd',
  'dd / yyyy / mm', 'mm / dd / yyyy', 'dd / mm / yyyy',
] as const;
export const TimeFormatsArray = [
  'HH : MM : SS', 'HH : SS : MM', 'MM : HH : SS', 'SS : HH : MM',
  'MM : SS : HH', 'SS : MM : HH', 'HH : MM', 'MM : HH',
] as const;
export type DateFormat = (typeof DateFormatsArray)[number];
export type TimeFormat = (typeof TimeFormatsArray)[number];

export const ThemeNamesArray_APP     = ['Light', 'Dark', 'Dark High Constrast'] as const;
export const ThemeNamesArray_Widgets = ['Light', 'Dark'] as const;
export type ThemeNames_APP     = (typeof ThemeNamesArray_APP)[number];
export type ThemeNames_Widgets = (typeof ThemeNamesArray_Widgets)[number];

export type AppTheme = {
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
      font_wrong: string
      background_wrong: string
      font_confirm: string
      background_confirm: string
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
      font_button: string
      font_active: string
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
    font_active: string
    background: string
    background_Button: string
    background_active: string
    confirm: string
    wrong: string
    warning: string
  }
}

export type ConfigDTO = {
  language: LanguageTag
  appTheme: ThemeNames_APP
  widgetTheme: ThemeNames_Widgets
  dateFormat: DateFormat
  timeFormat: TimeFormat
  onlyWarningVibrations: boolean
}

export type ModalConfig = {
  type: 'exit app' | 'project creation' | 'download projects'
} | {
  type: 'upload projects' | 'export project (DOCX)' | 'export project (CSV)' | 'export project (ZIP IMAGES)'
  id_project: string
} | {
  type: 'sample creation'
  id_project: string
  sampleNumber: number
  sampleAlias_Singular: string
} | {
  type: 'template widget copy'
  id_project: string
  id_sample: string
} | {
  type: 'warning'
  question: string
} | {
  type: 'download pictures'
  id_project: string
  picturesIDs: string[]
}

export type ImageQuality = 'no compress' | 'High' | 'Medium' | 'Low'
export type CameraLayerConfig = CameraPictureMode
export type CameraPictureMode = {
  id_project: string
  mode: 'photo'
  picturesAmount: number
  picturesLimit?: number
}

export type RegexRules = {
  'noSpaces':        RegExp
  'noSpecialLetter': RegExp
  'id':              RegExp
  'hexColor':        RegExp
  'fileName':        RegExp
}

export type CredentialDTO = {
  credential_id: string
  name: string
  user: string
  password: string
  rootURL: string
}
