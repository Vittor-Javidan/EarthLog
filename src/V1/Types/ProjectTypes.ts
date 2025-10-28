import { VERSION } from "@V1/Globals/Version"

// =================================================================================================
// project TYPES
// =================================================================================================

export type Status = 'uploaded' | 'modified' | 'new'
export type DownloadedProjectStatus = 'uploaded' | 'new'
export type UploadEntry = {
  dateUTM: string
  date: string
  url: string
}

export type SyncData = {
  id_project:       string
  project:          Status
  widgets_Project:  Record<string, Status | 'deleted'>
  widgets_Template: Record<string, Status | 'deleted'>
  samples:          Record<string, Status | 'deleted'>
  widgets_Samples:  Record<string, Record<string, Status | 'deleted'>>
  pictures:         Record<string, Exclude<Status, 'modified'> | 'deleted' | 'on cloud'>
}

export type DownloadedProjectDTO = {
  project: ProjectDTO,
  projectStatus: DownloadedProjectStatus
}

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
  lts_version?: typeof VERSION
  name: string
  sampleAlias: {
    singular: string
    plural: string
  }
  gps?: GPS_DTO
  rules: ProjectRules
  sampleRules?: SampleRules
  uploads?: UploadEntry[]
}

export type SampleSettings = {
  id_sample: string
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
  id_widget: string
  widgetName: string
  inputs: InputData[]
  rules: WidgetRules
  addToNewSamples?: boolean
  widgetTheme?: WidgetTheme
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

export type WidgetDisplay = 'data display' | 'theme display' | 'new input display'

export type WidgetTheme = {
  font: string
  font_placeholder: string
  background: string
  confirm: string
  wrong: string
  warning: string
  disabled: string
}

// =================================================================================================
// Input TYPES
// =================================================================================================

export type InputAlertMessage = {
  gpsDistanceAlertMessage?: string
  templatePictureScope?: string
}
export type InputData = (
  StringInputData    |
  BooleanInputData   |
  GPSInputData       |
  OptionsInputData   |
  SelectionInputData |
  PictureInputData
)
export const InputTypesArray = ['boolean', 'string', 'gps', 'options', 'selection', 'picture'] as const;
export type InputTypes = (typeof InputTypesArray)[number];

// ============================
export type StringInputData = {
  id_input: string
  label: string
  type: 'string'
  value: string
  placeholder?: string
  lockedLabel?: boolean
  lockedData?: boolean
}

// ============================
export type BooleanInputData = {
  id_input: string
  label: string
  type: 'boolean'
  value: boolean
  notApplicable?: boolean
  lockedLabel?: boolean
  lockedData?: boolean
}

// ============================
export type OptionsInputData = {
  id_input: string
  label: string
  type: 'options'
  value: OptionData[]
  showAddOptionButton?: boolean
  allowOptionLabelChange?: boolean
  allowOptionDeletion?: boolean
  lockedLabel?: boolean
  lockedData?: boolean
}
export type OptionData = {
  id: string
  optionLabel: string
  checked: boolean
}

// ============================
export type SelectionInputData = {
  id_input: string
  label: string
  type: 'selection'
  value: SelectionOptionData
  showAddOptionButton?: boolean
  allowOptionLabelChange?: boolean
  allowOptionDeletion?: boolean
  lockedLabel?: boolean
  lockedData?: boolean
}
export type SelectionOptionData = {
  options: { id: string, optionLabel: string }[]
  id_selected: string
}

// ============================
export type PictureInputData = {
  id_input: string
  label: string
  type: 'picture'
  value: PictureData[]
  lockedLabel?: boolean
  lockedData?: boolean
  picturesAmountLimit?: number
}
export type PictureData = {
  id_picture: string
  description: string
  dateAndTimeUTC: string
  dateAndTime: string
}

// ============================
export type  GPSInputData = {
  id_input: string
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

// =================================================================================================
// RULES
// =================================================================================================

export type ProjectRules = {
  allowMultipleDownloads?: boolean
  allowProjectNameChange?: boolean
  allowSampleAliasChange?: boolean
  allowGPSChange?: boolean
  allowProjectExport?: boolean
  showCreateWidgetButton_Project?: boolean
  showCreateWidgetButton_Template?: boolean
  showSampleCreationButton?: boolean
  addGPSToNewSamples?: boolean
  deleteAfterUpload?: boolean
  enableResetSyncData?: boolean
}

export type SampleRules = {
  allowSampleNameChange?: boolean
  allowGPSChange?: boolean
  showCreateWidgetButton?: boolean
  showCopyWidgetFromTemplateButton?: boolean
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
  template_showOptionsButton?: boolean
  template_unlockAddAutomatically?: boolean
  template_AllowCopies?: boolean
}
