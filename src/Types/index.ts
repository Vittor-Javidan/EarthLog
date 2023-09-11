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
  id_project: string                                                                                // Project ID. Its the folder name inside user app. Valid IDs are only valid when respects the following regex: "/[^a-zA-Z0-9-]/g".
  name: string                                                                                      // Project name.
  gps?: GPS_DTO                                                                                     // If "undefined", gpsInput will start hidden.
  rules: {
    allowNameChange?: boolean                                                                       // If "true", allow sample name to be modified.
    allowSampleCreation?: boolean                                                                   // If "true", allow new samples to be created inside the project. Will render a create sample button on Project Screen.
    allowWidgetCreation_Project?: boolean                                                           // If "true", allow new widgets to be created inside the project. Will render a create widget button on Project Settings Screen.
    allowWidgetCreation_Template?: boolean                                                          // If "true", allow new widgets to be created inside the template. Will render a create widget button on Template Screen.
  }
}
export type SampleSettings = {
  id_sample: string                                                                                 // Sample ID. Its the folder name inside user app. Valid IDs are only valid when respects the following regex: "/[^a-zA-Z0-9-]/g".
  name: string                                                                                      // Sample name.
  gps?: GPS_DTO                                                                                     // If "undefined", gpsInput will start hidden.
  rules: {
    allowNameChange?: boolean,                                                                      // If "true", allow sample name to be modified.
    allowSampleErase?: boolean,                                                                     // If "true", allow sample to be deleted. Will render a delete button on sample settings screen.
    allowWidgetCreation?: boolean,                                                                  // If "true", allow new widgets to be created inside the sample. Will render a create widget button on Sample Screen.
  }
}

// ===============================================================================================
// WIDGET RELATED TYPES
// ===============================================================================================

export type WidgetData = TextWidgetData | BooleanWidgetData | GPSWidgetData

export type BooleanWidgetData = {
  id_widget: string                                                                                 // Widget ID. Its the folder name inside user app. Valid IDs are only valid when respects the following regex: "/[^a-zA-Z0-9-]/g".
  name: string                                                                                      // Widget label name.
  type: 'boolean'                                                                                   // Widget type (use this to identify the Widget dataType on your custom server)
  value: boolean                                                                                    // Widget main value or DTO.
  notApplicable?: boolean                                                                           // If "undefined", "N/A" checkbox will be hidden. use this when just True or False is not enough, so if "N/A === true", it means you can ignore the boolean value from this widget on your own code logic.
  gps?: GPS_DTO                                                                                     // If "undefined", gpsInput will start hidden.
  rules: {
    allowLabelChange?: boolean                                                                      // If "true", allow Label to be modified on Widget Edit modal.
    allowValueChange?: boolean                                                                      // If "true", allow widget to be modified
    allowWidgetErase?: boolean                                                                      // If "true", allow widget to be delete. Will render a delete buttons on Widget Edit modal.
  }
}
export type TextWidgetData = {
  id_widget: string                                                                                 // Widget ID. Its the folder name inside user app. Valid IDs are only valid when respects the following regex: "/[^a-zA-Z0-9-]/g".
  name: string                                                                                      // Widget label name.
  type: 'text'                                                                                      // Widget type (use this to identify the Widget dataType on your custom server)
  value: string                                                                                     // Widget main value or DTO.
  gps?: GPS_DTO                                                                                     // If "undefined", gpsInput will start hidden.
  rules: {
    allowLabelChange?: boolean                                                                      // If "true", allow Label to be modified on Widget Edit modal.
    allowValueChange?: boolean                                                                      // If "true", allow widget to be modified
    allowWidgetErase?: boolean                                                                      // If "true", will render a delete buttons on Widget Edit modal, allowing widget deletion.
    noSpaces?: boolean                                                                              // If "true", Widget value input will not accept empty space.
    noSpecialLetters?: boolean                                                                      // If "true", Widget value input will not accept special characteres just number from 0 to 9 and letter from A to Z. lower and upper case included.
  }
}
export type GPSWidgetData = {
  id_widget: string                                                                                 // Widget ID. Its the folder name inside user app. Valid IDs are only valid when respects the following regex: "/[^a-zA-Z0-9-]/g".
  name: string                                                                                      // Widget label name.
  type: 'gps'                                                                                       // Widget type (use this to identify the Widget dataType on your custom server)
  gps: GPS_DTO                                                                                      // GPS widget is special. It has no value, but gps value is always a GPS_DTO.
  rules: {
    allowLabelChange?: boolean                                                                      // If "true", allow Label to be modified on Widget Edit modal.
    allowValueChange?: boolean                                                                      // If "true", allow widget to be modified
    allowWidgetErase?: boolean                                                                      // If "true", will render a delete buttons on Widget Edit modal, allowing widget deletion.
  }
}

export type WidgetTypes = 'boolean' | 'text' | 'gps'

export type WidgetAlertMessage = {
  gpsDistanceAlertMessage?: string
}

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

// ===============================================================================================
// Rules related TYPES
// ===============================================================================================

export type RegexRules = {
  'noSpaces': RegExp
  'noSpecialLetter': RegExp
  'id': RegExp
}
