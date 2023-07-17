export type ProjectDTO = {
  projectSettings: ProjectSettingWidgets
  projectWidgets: Record<WidgetLabel, WidgetData>
  pointTemplate: Record<WidgetLabel, WidgetData>
  points: PointDTO[]
}

export type PointDTO = {
  ID: TextWidgetData
  Name: TextWidgetData
  pointWidgets: Record<WidgetLabel, WidgetData>
}

export type WidgetLabel = string
export type WidgetData = TextWidgetData | BooleanWidgetData
export type ProjectSettingWidgets = {
  Immutable: boolean,
  ID: string,
  Name: string,
  rules: {
    allowImmutableChange?: boolean,
    allowNameChange?: boolean
  }
}

export type TextWidgetData = {
  type: 'string'
  value: string
  rules: {
    allowLabelChange?: boolean,
    allowValueChange?: boolean,
    noSpaces?: boolean,
    noSpecialLetters?: boolean,
  }
}

export type BooleanWidgetData = {
  type: 'boolean'
  value: boolean
  rules: {
    allowLabelChange?: boolean,
    allowValueChange?: boolean,
  }
}

export default class ProjectService {

  static currentProject: ProjectDTO | null = null;
  static getDefaultProjectTemplate(): ProjectDTO {
    return {
      projectSettings: {
        Immutable: false,
        ID: '',
        Name: '',
        rules: {
          allowImmutableChange: true,
          allowNameChange: true,
        },
      },
      projectWidgets: {},
      pointTemplate: {},
      points: [],
    };
  }
}
