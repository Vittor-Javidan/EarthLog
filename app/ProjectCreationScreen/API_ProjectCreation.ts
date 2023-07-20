import ProjectService, { ProjectDTO, WidgetData } from '@Services/ProjectService';
export default class API_ProjectCreation {

  static unsavedChanges: boolean = false;
  static temporaryProject: ProjectDTO = ProjectService.getDefaultProjectTemplate();

  static reset() {
    this.unsavedChanges = false;
    this.temporaryProject = ProjectService.getDefaultProjectTemplate();
  }

  static setProjectImmutable(value: boolean) {
    this.temporaryProject.projectSettings.immutable = value;
  }

  static setProjectID(value: string) {
    this.temporaryProject.projectSettings.id_project = value;
  }

  static setProjectName(value: string) {
    this.temporaryProject.projectSettings.name = value;
  }

  static modifyProjectWidget(key: string, value: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.projectWidgets[key] = value;
  }

  static modifyPointTemplateWidget(key: string, value: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.sampleTemplate[key] = value;
  }

  static deleteProjectWidget(key: string) {
    this.unsavedChanges = true;
    delete this.temporaryProject.projectWidgets[key];
  }

  static deletePointTemplateWidget(key: string) {
    this.unsavedChanges = true;
    delete this.temporaryProject.sampleTemplate[key];
  }
}
