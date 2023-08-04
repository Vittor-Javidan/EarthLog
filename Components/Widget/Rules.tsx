import { TextWidgetData, WidgetData } from '@Types/index';

export class WidgetRules {

  static noEmptyLabel(widgetData: WidgetData): boolean {
    return widgetData.name === '';
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
