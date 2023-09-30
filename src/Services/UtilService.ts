import { RegexRules } from '@Types/AppTypes';

type ExcludeNonObjectKeys<T> = { [K in keyof T]: T[K] extends object ? K : never; };
type ExcludeNonObject<T> = Pick<T, Exclude<keyof T, ExcludeNonObjectKeys<T>[keyof T]>>;

export default class UtilService {

  static regexRules: RegexRules = {
    'noSpaces': /\s/,
    'noSpecialLetter': /^[a-zA-Z0-9]+$/,
    'id': /^[0-9A-Za-z-]+$/,
    'hexColor': /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  };

  static deepCopy<T extends ExcludeNonObject<T>>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
