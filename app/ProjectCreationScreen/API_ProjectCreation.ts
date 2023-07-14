import ProjectService, { BooleanWidgetData, ProjectDTO, TextWidgetData, WidgetData } from '@Services/ProjectService';
export default class API_ProjectCreation {

  static unsavedChanges: boolean = false;
  static temporaryProject: ProjectDTO = ProjectService.getDefaultProjectTemplate();

  static reset() {
    this.unsavedChanges = false;
    this.temporaryProject = ProjectService.getDefaultProjectTemplate();
  }

  static setProjectImmutable(value: BooleanWidgetData) {
    this.temporaryProject.projectSettings.Immutable = value;
  }

  static setProjectID(value: TextWidgetData) {
    this.temporaryProject.projectSettings.ID = value;
  }

  static setProjectName(value: TextWidgetData) {
    this.temporaryProject.projectSettings.Name = value;
  }

  static modifyProjectWidget(key: string, value: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.projectWidgets[key] = value;
  }

  static modifyPointTemplateWidget(key: string, value: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.pointTemplate[key] = value;
  }

  static deleteProjectWidget(key: string) {
    this.unsavedChanges = true;
    delete this.temporaryProject.projectWidgets[key];
  }

  static deletePointTemplateWidget(key: string) {
    this.unsavedChanges = true;
    delete this.temporaryProject.pointTemplate[key];
  }
}
