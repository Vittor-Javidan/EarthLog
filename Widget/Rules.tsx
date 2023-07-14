import { TextWidgetData, WidgetData, WidgetLabel } from '@Services/ProjectService';

export class WidgetRules {

  static noDuplicatedLabel(label: WidgetLabel, widgets: Record<WidgetLabel, WidgetData>) {
    alert(`The label ${label} already axists`);
    return Object.keys(widgets).includes(label);
  }

  static noEmptyLabel(label: WidgetLabel): boolean {
    return label === '';
  }

  // ===============================================================================================
  // FLEXIBLE RULES
  // ===============================================================================================

  static noSpaces(widgetData: TextWidgetData): boolean {
    if (widgetData.rules.noSpaces && widgetData.value !== '') {
      const regex = /\s/;
      return regex.test(widgetData.value);
    }
    return false;
  }

  static noSpecialLetters(widgetData: TextWidgetData): boolean {
    if (widgetData.rules.noSpecialLetters && widgetData.value !== '') {
      const regex = /^[a-zA-Z0-9]+$/;
      return !regex.test(widgetData.value);
    }
    return false;
  }
}
