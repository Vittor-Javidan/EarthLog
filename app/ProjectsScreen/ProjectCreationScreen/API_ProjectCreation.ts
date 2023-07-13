import { PointTemplate, ProjectDTO, ProjectInfoTypes } from '@Services/ProjectService';

export default class API_ProjectCreation {

  static unsavedChanges: boolean = false;
  static temporaryProject: ProjectDTO = {
    projectInfo: {
      'Immutable': { type: 'boolean', value: false },
      'ID': { type: 'string', value: ''},
      'Name': { type: 'string', value: ''},
    },
    points: [],
    pointTemplate: null,
  };

  static refreshSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};

  static reset() {
    this.unsavedChanges = false;
    this.temporaryProject = {
      projectInfo: {
        'Immutable': { type: 'boolean', value: false },
        'ID': { type: 'string', value: ''},
        'Name': { type: 'string', value: ''},
      },
      points: [],
      pointTemplate: null,
    };
  }

  static modifyProjectInfo(key: string, value: ProjectInfoTypes) {
    this.unsavedChanges = true;
    this.temporaryProject.projectInfo[key] = value;
  }

  static deleteProjectInfo(key: string) {
    this.unsavedChanges = true;
    delete this.temporaryProject.projectInfo[key];
  }

  static setPointTemplate(template: PointTemplate | null) {
    this.unsavedChanges = true;
    this.temporaryProject.pointTemplate = template;
  }
}
