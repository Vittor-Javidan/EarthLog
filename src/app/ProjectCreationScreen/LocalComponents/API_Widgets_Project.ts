import { WidgetData } from '@Types/index';
import API_TemporaryProject from './API_TemporaryProject';

export default class API_Widgets_Project {

  private static SETTER_KEY_PROJECT_WIDGET = 'ProjectSettingsScreen_Widgets';
  private static registeredSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};

  static setterRegister_ProjectWidgets(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.registeredSetters[this.SETTER_KEY_PROJECT_WIDGET] = setter;
  }

  static refresh_ProjectWidgets() {
    this.registeredSetters[this.SETTER_KEY_PROJECT_WIDGET](prev => !prev);
  }

  static addProjectWidget(widgetData: WidgetData) {
    const IDs = API_TemporaryProject.project.projectWidgets.map(widget => widget.id_widget);
    if (!IDs.includes(widgetData.id_widget)) {
      API_TemporaryProject.project.projectWidgets.push(widgetData);
    }
  }

  static updateProjectWidget(widgetData: WidgetData) {
    API_TemporaryProject.project.projectWidgets.forEach(widget => {
      if (widget.id_widget === widgetData.id_widget) {
        widget = widgetData;
      }
    });
  }

  static deleteProjectWidget(widgetData: WidgetData) {
    API_TemporaryProject.project.projectWidgets = API_TemporaryProject.project.projectWidgets.filter(
      widget => widget.id_widget !== widgetData.id_widget
    );
  }
}
