// ===============================================================================================
// LANGUAGE RELATED TYPES
// ===============================================================================================

export const languageTags = ['en-US', 'pt-BR'] as const;
export const languageLabels = ['English', 'Português-Brasil'] as const;
export type Languages = (typeof languageTags)[number];
export type LanguageTags = (typeof languageTags)[number];

// ===============================================================================================
// THEME RELATED TYPES
// ===============================================================================================

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

// ===============================================================================================
// CONFIG RELATED TYPES
// ===============================================================================================

export type ConfigDTO = {
  language: Languages
  theme: ThemeDTO
}

// ===============================================================================================
// PROJECT RELATED TYPES
// ===============================================================================================

export type ProjectDTO = {
  projectSettings: ProjectSettings
  projectWidgets: WidgetData[]
  template: WidgetData[]
  samples: SampleDTO[]
}
export type SampleDTO = {
  sampleSettings: SampleSettings
  sampleWidgets: WidgetData[]
}

export type WidgetData = TextWidgetData | BooleanWidgetData

export type ProjectSettings = {
  id_project: string
  name: string
  rules: {
    allowNameChange?: boolean
    allowSampleCreation?: boolean
    allowWidgetCreation_Project?: boolean
    allowWidgetCreation_Template?: boolean
    allowWidgetCreation_Sample?: boolean
  }
}
export type SampleSettings = {
  id_sample: string
  name: string
  rules: {
    allowNameChange?: boolean,
    allowSampleErase?: boolean,
    allowWidgetCreation?: boolean,
  }
}

export type BooleanWidgetData = {
  id_widget: string
  name: string
  type: 'boolean'
  value: boolean
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
  }
}
export type TextWidgetData = {
  id_widget: string
  name: string
  type: 'text'
  value: string
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
    noSpaces?: boolean
    noSpecialLetters?: boolean
  }
}

export type WidgetTypes = 'boolean' | 'text'

/*
  The index.json file has the purpose to allow the app to know how organized is the elements, since
  just small blocks of project data is loaded on each screen.
*/
export type IDsArray = ID[]
export type ID = string
