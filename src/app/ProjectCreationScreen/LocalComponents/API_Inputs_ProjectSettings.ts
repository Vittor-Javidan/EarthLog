import API_TemporaryProject from './API_TemporaryProject';

export default class API_Inputs_ProjectSettings {

  static setProjectID(value: string) { API_TemporaryProject.project.projectSettings.id_project = value; }
  static setProjectName(value: string) { API_TemporaryProject.project.projectSettings.name = value; }
}
