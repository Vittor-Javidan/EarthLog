import UtilService from '@Services/UtilService';
import { ProjectSettings } from '@Types/index';

export default class API_ProjectEdit {

  static projectSettings: ProjectSettings = {
    id_project: '',
    name: '',
    immutable: false,
    rules: {},
  };
  static initialValues: ProjectSettings = {
    id_project: '',
    name: '',
    immutable: false,
    rules: {},
  };

  static unsavedChanges: boolean = false;

  static init(projectSettings: ProjectSettings) {
    this.initialValues = UtilService.deepCloning(projectSettings);
    this.projectSettings = UtilService.deepCloning(projectSettings);
  }

  static setName(name: string) {
    this.projectSettings.name = name;
    this.unsavedChanges = true;
  }

  static resetName() {
    this.projectSettings.name = this.initialValues.name;
  }

  static setImmutable(boolean: boolean) {
    this.projectSettings.immutable = boolean;
    this.unsavedChanges = true;
  }

}
