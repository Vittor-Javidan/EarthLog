import { BooleanWidgetData, ProjectDTO, WidgetData, TextWidgetData, PointDTO } from '@Services/ProjectService';

export default class API_ProjectCreation {

  static unsavedChanges: boolean = false;
  static temporaryProject: ProjectDTO = {
    Immutable: { type: 'boolean', value: false },
    ID: {
      type: 'string',
      value: '',
      canEdit: {
        label: false,
        value: true,
      },
    },
    Name: {
      type: 'string',
      value: '',
      canEdit: {
        label: false,
        value: true,
      },
    },
    projectWidgets: {},
    points: [],
    pointTemplate: null,
  };

  static refreshSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};

  static reset() {
    this.unsavedChanges = false;
    this.temporaryProject = {
      Immutable: { type: 'boolean', value: false },
      ID: {
        type: 'string',
        value: '',
        canEdit: {
          label: false,
          value: true,
        },
      },
      Name: {
        type: 'string',
        value: '',
        canEdit: {
          label: false,
          value: true,
        },
      },
      projectWidgets: {},
      points: [],
      pointTemplate: null,
    };
  }

  static setImmutable(value: BooleanWidgetData) {
    this.temporaryProject.Immutable = value;
  }

  static setID(value: TextWidgetData) {
    this.temporaryProject.ID = value;
  }

  static setName(value: TextWidgetData) {
    this.temporaryProject.Name = value;
  }

  static modifyProjectInfo(key: string, value: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.projectWidgets[key] = value;
  }

  static deleteProjectInfo(key: string) {
    this.unsavedChanges = true;
    delete this.temporaryProject.projectWidgets[key];
  }

  static setPointTemplate(template: PointDTO | null) {
    this.unsavedChanges = true;
    this.temporaryProject.pointTemplate = template;
  }
}
