export default class ProjectService {

  static KEY_LABELS = ['Immutable', 'ID', 'Name'];
  static currentProject: ProjectDTO | null = null;

  static createProject(project: ProjectDTO) {
    console.log(project);
  }
}

export type ProjectDTO = {
  pointTemplate: PointTemplate | null
  projectInfo: Record<string , ProjectInfoTypes>
  points: PointDTO[]
}

export type PointDTO = Record<string, Widget>
export type PointTemplate = Record<string, WidgetType>

export type ProjectInfoTypes = StringType | BooleanType

export type Widget = any
export type WidgetType = any

export type StringType = {
  type: 'string'
  value: string
}

export type BooleanType = {
  type: 'boolean'
  value: boolean
}
