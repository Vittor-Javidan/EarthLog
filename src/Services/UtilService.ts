import uuid from 'react-native-uuid';
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

  static generateUuidV4(): string {
    return uuid.v4() as string;
  }

  static getCurrentDateTime(): string  {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
