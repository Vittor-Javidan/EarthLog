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
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (UTC)`;
  }
}
