import { TextWidgetData } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

export default class Rules_TextWidgets {

  static checkRules(
    widgetData: TextWidgetData,
    callback: (isValid: boolean) => void
  ) {

    const { language } = ConfigService.config;
    const R = translations.Widgets.TextWidget[language];
    let isValid = true;

    if (this.noSpaces(widgetData)) {
      alert(R['Value cannot have empty spaces.']);
      isValid = false;
    }

    if (this.noSpecialLetters(widgetData)) {
      alert(R['only numbers, and letter from "a" to "z" or "A" to "Z" is allow.']);
      isValid = false;
    }

    callback(isValid);
  }

  static noSpaces(widgetData: TextWidgetData): boolean {
    if (widgetData.rules.noSpaces && widgetData.value !== '') {
      const regex = UtilService.regexRules['noSpaces'];
      return regex.test(widgetData.value);
    }
    return false;
  }

  static noSpecialLetters(widgetData: TextWidgetData): boolean {
    if (widgetData.rules.noSpecialLetters && widgetData.value !== '') {
      const regex = UtilService.regexRules['noSpecialLetter'];
      return !regex.test(widgetData.value);
    }
    return false;
  }
}
