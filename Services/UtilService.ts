export default class UtilService {

  static idRegex = /[^a-zA-Z0-9-]/g;
  static hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  static deepCloning<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
