import { GPS_DTO } from '@Types/index';
import TemporaryProjectAPI from './TemporaryProjectAPI';

export default class ProjectSettingsWidgetAPI {

  static setID(value: string) { TemporaryProjectAPI.project.projectSettings.id_project = value; }
  static setName(value: string) { TemporaryProjectAPI.project.projectSettings.name = value; }
  static setGPS(gpsData: GPS_DTO) { TemporaryProjectAPI.project.projectSettings.gps = gpsData; }
  static deleteGPS() {
    if (TemporaryProjectAPI.project.projectSettings.gps === undefined) {
      delete TemporaryProjectAPI.project.projectSettings.gps;
    }
  }
}
