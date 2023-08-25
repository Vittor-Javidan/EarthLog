import { SampleSettings } from '@Types/index';
import ProjectService from '@Services/ProjectService';

export default class API_Inputs_SampleSettings {

  static temporarySettings: SampleSettings = ProjectService.getDefaultSampleSettings();

  static reset() {
    this.temporarySettings = ProjectService.getDefaultSampleSettings();
  }

  static setSampleID(value: string) {
    this.temporarySettings.id_sample = value;
  }

  static setSampleName(value: string) {
    this.temporarySettings.name = value;
  }
}

