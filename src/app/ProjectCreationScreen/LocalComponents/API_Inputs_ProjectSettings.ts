import API_TemporaryProject from './API_TemporaryProject';

export default class API_Inputs_ProjectSettings {

  static setProjectImmutable(value: boolean) { API_TemporaryProject.project.projectSettings.immutable = value; }
  static setProjectID(value: string) { API_TemporaryProject.project.projectSettings.id_project = value; }
  static setProjectName(value: string) { API_TemporaryProject.project.projectSettings.name = value; }
}
