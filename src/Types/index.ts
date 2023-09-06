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

export type ProjectSettings = {
  id_project: string
  name: string
  gps?: GPS_DTO
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
  gps?: GPS_DTO
  rules: {
    allowNameChange?: boolean,
    allowSampleErase?: boolean,
    allowWidgetCreation?: boolean,
  }
}

// ===============================================================================================
// WIDGET RELATED TYPES
// ===============================================================================================

export type WidgetData = TextWidgetData | BooleanWidgetData | GPSWidgetData

export type BooleanWidgetData = {
  id_widget: string
  name: string
  type: 'boolean'
  value: boolean
  gps?: GPS_DTO
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
  gps?: GPS_DTO
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
    noSpaces?: boolean
    noSpecialLetters?: boolean
  }
}
export type GPSWidgetData = {
  id_widget: string
  name: string
  type: 'gps'
  value: GPS_DTO
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
  }
}

export type WidgetTypes = 'boolean' | 'text' | 'gps'

/*
  The index.json file has the purpose to allow the app to know how organized is the elements, since
  just small blocks of project data is loaded on each screen.
*/
export type IDsArray = ID[]
export type ID = string

// ===============================================================================================
// GPS RELATED TYPES
// ===============================================================================================

export type GPS_DTO = {
  coordinates?: CoordinateDTO
  altitude?: AltitudeDTO
}

export type CoordinateDTO = {
  lat: number
  long: number
  accuracy: number
}

export type AltitudeDTO = {
  value: number
  accuracy: number
}

export type GPSAccuracyDTO = {
  coordinate: number | null,
  altitude: number | null
}

export type GPSFeaturesDTO = {
  editMode: boolean
  gpsON: boolean
  enableCoordinate: boolean
  enableAltitude: boolean
}
