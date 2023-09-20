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
  rules: {
      allowProjectNameChange?: boolean
      allowSampleAliasChange?: boolean
      allowGPSChange?: boolean                                                                      //Hide GPSInput if both this and gps undefined
      showCreateWidgetButton_Project?: boolean
      showCreateWidgetButton_Template?: boolean
      showSampleCreationButton?: boolean
  }
}

export type SampleSettings = {
  id_sample: ID
  name: string
  gps?: GPS_DTO                                                                                     //Hide GPSInput if undefined
  rules: {
      allowSampleNameChange?: boolean
      allowGPSChange?: boolean                                                                      //Hide GPSInput if both this and gps undefined
      showCreateWidgetButton?: boolean
  }
}

// =================================================================================================
// Widget TYPES
// =================================================================================================

export type WidgetData = {
  id_widget: ID                                                                                     // No not share same id between Widgets, because its used to name actual folders inside user device, so it can leads into to crash or unexpected behaviors. Use ids validated by this regex: /^[0-9A-Za-z-]+$/
  widgetName: string                                                                                // You can use scape sequence on strings here, without break app layout, like "\n", "\t", etc.
  inputs: InputData[]
  rules: {
    allowWidgetNameChange?: boolean
    showAddInputButton?: boolean
    showDeleteButton_Inputs?: boolean
    showDeleteButton_Widget?: boolean
    showOptionsButton?: boolean
    showInputsDeleteOption?: boolean
    showColorButton?: boolean
  }
  autoGenerate?: boolean                                                                            // Used by template screen to auto add a Widget on new Samples user creates
  widgetTheme?: WidgetThemeData                                                                     // When undefine, it renders with default theme
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

export type WidgetThemeData = {
  font: string                                                                                      // Defines color for fonts and Inputs Borders
  font_placeholder: string                                                                          // Defines color font for placeholders
  background: string                                                                                // Defines color for Widget static background color.
  confirm: string                                                                                   // Defines a color for confirm feedback. Ex: "True" value on boolean Input; Confirm button when editing input label name; Saved feedback.
  wrong: string                                                                                     // Defines a color for negation feedback. Ex: "False" value on boolean input; Trash color on input.
  modified: string                                                                                  // Defines a color for changes feedback. Ex: "Saved" status changing to "Saving" status on top left Widget corner.
  disabled: string                                                                                  // Defines a color for disabled things. Ex: When N/A is clicked on a boolean input, turning the switch and boolean value to disbled color.
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
  id_input: ID                                                                                      // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior.
  label: string                                                                                     // Max of 25 characteres. More than this can break input label layout render. App will not allow you to edit the label in app if you pass this threshold.
  type: 'string'                                                                                    // Without this value, the apps cannot recognize the existence of the input
  value: string                                                                                     // The actual value of the input
  placeholder?: string                                                                              // Customize the placeholder text for your Text input.
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
}

// ============================
export type BooleanInputData = {
  id_input: ID                                                                                      // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior.
  label: string                                                                                     // Max of 25 characteres. More than this can break input label layout render. App will not allow you to edit the label in app if you pass this threshold.
  type: 'boolean'                                                                                   // Without this value, the apps cannot recognize the existence of the input
  value: boolean                                                                                    // The actual value of the input
  notApplicable?: boolean                                                                           // Shows "N/A" option on boolean inputs when not undefined. Use this when just true or false is not enough.
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
}

// ============================
export type  GPSInputData = {
  id_input: ID                                                                                      // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior.
  label: string                                                                                     // Max of 25 characteres. More than this can break input label layout render. App will not allow you to edit the label in app if you pass this threshold.
  type: 'gps'                                                                                       // Without this value, the apps cannot recognize the existence of the input
  value: GPS_DTO                                                                                    // The actual value of the input
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
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
