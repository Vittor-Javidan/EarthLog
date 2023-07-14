import { TextWidgetData } from '@Services/ProjectService';

export class WidgetRules {

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
