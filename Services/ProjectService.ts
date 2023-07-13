export default class ProjectService {

  static KEY_LABELS = ['Immutable', 'ID', 'Name'];
  static currentProject: ProjectDTO | null = null;

  static createProject(project: ProjectDTO) {
    console.log(project);
  }
}

export type ProjectDTO = {
  Immutable: BooleanWidgetData
  ID: TextWidgetData
  Name: TextWidgetData
  projectWidgets: Record<WidgetLabel, WidgetData>
  points: PointDTO[]
  pointTemplate: PointDTO | null
}

export type PointDTO = {
  Immutable: BooleanWidgetData
  ID: TextWidgetData
  Name: TextWidgetData
  pointWidgets: Record<WidgetLabel, WidgetData>
}

export type WidgetLabel = string
export type WidgetData = TextWidgetData | BooleanWidgetData

export type TextWidgetData = {
  type: 'string'
  value: string
  canEdit: {
    label: boolean,
    value: boolean,
  }
}

export type BooleanWidgetData = {
  type: 'boolean'
  value: boolean
}
