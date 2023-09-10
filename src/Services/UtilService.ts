// type ExcludeNonObjectKeys<T> = {
//   [K in keyof T]: T[K] extends object ? K : never;
// };
// type ExcludeNonObject<T> = Pick<T, Exclude<keyof T, ExcludeNonObjectKeys<T>[keyof T]>>;

export default class UtilService {

  static idRegex = /[^a-zA-Z0-9-]/g;
  static hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  // static deepCloning<T extends ExcludeNonObject<T>>(object: T): T {
  //   return JSON.parse(JSON.stringify(object)) as T;
  // }

  static deepCloning<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
