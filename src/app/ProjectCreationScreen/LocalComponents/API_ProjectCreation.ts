import ProjectService from '@Services/ProjectService';
import { ProjectDTO, WidgetData } from '@Types/index';
export default class API_ProjectCreation {

  static unsavedChanges: boolean = false;
  static temporaryProject: ProjectDTO = ProjectService.getDefaultProjectTemplate();

  static reset() {
    this.unsavedChanges = false;
    this.temporaryProject = ProjectService.getDefaultProjectTemplate();
  }

  static setProjectImmutable(value: boolean) { this.temporaryProject.projectSettings.immutable = value; }
  static setProjectID(value: string) { this.temporaryProject.projectSettings.id_project = value; }
  static setProjectName(value: string) { this.temporaryProject.projectSettings.name = value; }

  // PROJECT WIDGETS

  private static SETTER_KEY_PROJECT_WIDGET = 'ProjectSettingsScreen_Widgets';
  private static registeredSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};
  static setterRegister_ProjectWidgets(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.registeredSetters[this.SETTER_KEY_PROJECT_WIDGET] = setter;
  }
  static refresh_ProjectWidgets() {
    this.registeredSetters[this.SETTER_KEY_PROJECT_WIDGET](prev => !prev);
  }

  static addProjectWidget(widgetData: WidgetData) {
    this.unsavedChanges = true;
    const IDs = this.temporaryProject.projectWidgets.map(widget => widget.id_widget);
    if (!IDs.includes(widgetData.id_widget)) {
      this.temporaryProject.projectWidgets.push(widgetData);
    }
  }

  static updateProjectWidget(widgetData: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.projectWidgets.forEach(widget => {
      if (widget.id_widget === widgetData.id_widget) {
        widget = widgetData;
      }
    });
  }

  static deleteProjectWidget(widgetData: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.projectWidgets = this.temporaryProject.projectWidgets.filter(
      widget => widget.id_widget !== widgetData.id_widget
    );
  }

  // SAMPLE TEMPLATE WIDGETS

  static addPointTemplateWidget(widgetData: WidgetData) {
    this.unsavedChanges = true;
    const IDs = this.temporaryProject.sampleTemplate.map(widget => widget.id_widget);
    if (!IDs.includes(widgetData.id_widget)) {
      this.temporaryProject.sampleTemplate.push(widgetData);
    }
  }

  static updatePointTemplateWidget(widgetData: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.sampleTemplate.forEach(widget => {
      if (widget.id_widget === widgetData.id_widget) {
        widget = widgetData;
      }
    });
  }

  static deletePointTemplateWidget(widgetData: WidgetData) {
    this.unsavedChanges = true;
    this.temporaryProject.sampleTemplate = this.temporaryProject.sampleTemplate.filter(
      widget => widget.id_widget !== widgetData.id_widget
    );
  }
}
