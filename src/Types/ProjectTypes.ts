// =================================================================================================
// project TYPES
// =================================================================================================

export type IDsArray = ID[]
export type ID = string

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
  id_project: ID
  name: string
  sampleAlias: {
    singular: string
    plural: string
  }
  gps?: GPS_DTO
  status?: ProjectStatus
  rules: {
    allowMultipleDownloads?: boolean
    allowProjectNameChange?: boolean
    allowSampleAliasChange?: boolean
    allowGPSChange?: boolean
    showCreateWidgetButton_Project?: boolean
    showCreateWidgetButton_Template?: boolean
    showSampleCreationButton?: boolean
  }
  uploads?: {
    date: string
    url: string
  }[]
}

export type ProjectStatus = 'uploaded' | 'modified'

export type SampleSettings = {
  id_sample: ID
  name: string
  gps?: GPS_DTO
  rules: {
    allowSampleNameChange?: boolean
    allowGPSChange?: boolean
    showCreateWidgetButton?: boolean
    showCopyWidgetFromTemplateButton?: boolean
  }
}

// =================================================================================================
// Widget TYPES
// =================================================================================================

export type WidgetData = {
  id_widget: ID
  widgetName: string
  inputs: InputData[]
  rules: WidgetRules
  addToNewSamples?: boolean
  widgetTheme?: WidgetThemeDTO
}

export type WidgetRules = {
  allowWidgetNameChange?: boolean
  showAddInputButton?: boolean
  showOptionsButton?: boolean
  showThemeButton?: boolean
  showDeleteButton_Widget?: boolean
  showDeleteButton_Inputs?: boolean
  showMoveButton_Inputs?: boolean
  template_ShowDeleteButton_Widget?: boolean
  unlockAddToNewSamples?: boolean
}

export type WidgetScope = {
  type: 'project'
  id_project: string
} | {
  type: 'template'
  id_project: string
} | {
  type: 'sample'
  id_project: string
  id_sample: string
}

export type WidgetThemeDTO = {
  font: string
  font_placeholder: string
  background: string
  confirm: string
  wrong: string
  modified: string
  disabled: string
}

// =================================================================================================
// Input TYPES
// =================================================================================================

export type InputData = StringInputData | BooleanInputData | GPSInputData
export type InputStatus = 'modifying' | 'ready to save'
export type InputAlertMessage = {
  gpsDistanceAlertMessage?: string
}

export const InputTypesArray = ['boolean', 'string', 'gps'] as const;
export type InputTypes = (typeof InputTypesArray)[number];

// ============================
export type StringInputData = {
  id_input: ID
  label: string
  type: 'string'
  value: string
  placeholder?: string
  lockedLabel?: boolean
  lockedData?: boolean
}

// ============================
export type BooleanInputData = {
  id_input: ID
  label: string
  type: 'boolean'
  value: boolean
  notApplicable?: boolean
  lockedLabel?: boolean
  lockedData?: boolean
}

// ============================
export type  GPSInputData = {
  id_input: ID
  label: string
  type: 'gps'
  value: GPS_DTO
  lockedLabel?: boolean
  lockedData?: boolean
}
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
