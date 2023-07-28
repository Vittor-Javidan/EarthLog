export default class UtilService {

  static idRegex = /[^a-zA-Z0-9-]/g;

  static deepCloning<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
