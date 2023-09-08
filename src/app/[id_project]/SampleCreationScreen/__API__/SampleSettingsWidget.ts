import { GPS_DTO, SampleSettings } from '@Types/index';
import ProjectService from '@Services/ProjectService';

export default class SampleSettingsWidget {

  static temporarySettings: SampleSettings = ProjectService.getDefaultSampleSettings();

  static reset() { this.temporarySettings = ProjectService.getDefaultSampleSettings(); }
  static setSampleID(value: string) { this.temporarySettings.id_sample = value; }
  static setSampleName(value: string) { this.temporarySettings.name = value; }
  static setGPS(gpsData: GPS_DTO) { this.temporarySettings.gps = gpsData; }
  static deleteGPS() {
    if (this.temporarySettings.gps === undefined) {
      delete this.temporarySettings.gps;
    }
  }
}

