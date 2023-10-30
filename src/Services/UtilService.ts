import uuid from 'react-native-uuid';
import { RegexRules } from '@Types/AppTypes';
import { WidgetData } from '@Types/ProjectTypes';

type ExcludeNonObjectKeys<T> = { [K in keyof T]: T[K] extends object ? K : never; };
type ExcludeNonObject<T> = Pick<T, Exclude<keyof T, ExcludeNonObjectKeys<T>[keyof T]>>;

export default class UtilService {

  static regexRules: RegexRules = {
    'noSpaces':        /\s/,
    'noSpecialLetter': /^[a-zA-Z0-9]+$/,
    'id':              /^[0-9A-Za-z-]+$/,
    'fileName':        /^[a-zA-Z0-9_-]+$/,
    'hexColor':        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  };

  static deepCopy<T extends ExcludeNonObject<T>>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }

  static generateUuidV4(): string {
    return uuid.v4() as string;
  }

  static changeAllIds (widgetData: WidgetData) {

    // Change Widget ID
    widgetData.id_widget = UtilService.generateUuidV4();

    for (let i = 0; i < widgetData.inputs.length; i++) {
      const inputArray = widgetData.inputs[i];

      // Change Input ID
      inputArray.id_input = UtilService.generateUuidV4();

      // Change Options IDs
      if (inputArray.type === 'options') {
        for (let j = 0; j < inputArray.value.length; j++) {
          inputArray.value[j].id = UtilService.generateUuidV4();
        }
      }

      // Change Selection Options IDs
      if (inputArray.type === 'selection') {
        for (let j = 0; j < inputArray.value.options.length; j++) {
          inputArray.value.options[j].id = UtilService.generateUuidV4();
        }
      }
    }

    return widgetData;
  }
}
