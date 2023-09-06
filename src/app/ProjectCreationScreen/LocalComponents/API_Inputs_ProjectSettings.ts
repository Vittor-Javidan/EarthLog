import { GPS_DTO } from '@Types/index';
import API_TemporaryProject from './API_TemporaryProject';

export default class API_Inputs_ProjectSettings {

  static setID(value: string) { API_TemporaryProject.project.projectSettings.id_project = value; }
  static setName(value: string) { API_TemporaryProject.project.projectSettings.name = value; }
  static setGPS(gpsData: GPS_DTO) { API_TemporaryProject.project.projectSettings.gps = gpsData; }
  static deleteGPS() {
    if (API_TemporaryProject.project.projectSettings.gps === undefined) {
      delete API_TemporaryProject.project.projectSettings.gps;
    }
  }
}
