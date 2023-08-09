import ProjectService from '@Services/ProjectService';
import { ProjectDTO, WidgetData } from '@Types/index';
export default class API_ProjectCreation {

  static temporaryProject: ProjectDTO = ProjectService.getDefaultProjectTemplate();

  static reset() {
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
    const IDs = this.temporaryProject.projectWidgets.map(widget => widget.id_widget);
    if (!IDs.includes(widgetData.id_widget)) {
      this.temporaryProject.projectWidgets.push(widgetData);
    }
  }

  static updateProjectWidget(widgetData: WidgetData) {
    this.temporaryProject.projectWidgets.forEach(widget => {
      if (widget.id_widget === widgetData.id_widget) {
        widget = widgetData;
      }
    });
  }

  static deleteProjectWidget(widgetData: WidgetData) {
    this.temporaryProject.projectWidgets = this.temporaryProject.projectWidgets.filter(
      widget => widget.id_widget !== widgetData.id_widget
    );
  }

  // SAMPLE TEMPLATE WIDGETS

  static addPointTemplateWidget(widgetData: WidgetData) {
    const IDs = this.temporaryProject.template.map(widget => widget.id_widget);
    if (!IDs.includes(widgetData.id_widget)) {
      this.temporaryProject.template.push(widgetData);
    }
  }

  static updatePointTemplateWidget(widgetData: WidgetData) {
    this.temporaryProject.template.forEach(widget => {
      if (widget.id_widget === widgetData.id_widget) {
        widget = widgetData;
      }
    });
  }

  static deletePointTemplateWidget(widgetData: WidgetData) {
    this.temporaryProject.template = this.temporaryProject.template.filter(
      widget => widget.id_widget !== widgetData.id_widget
    );
  }
}
