import { SampleSettings } from '@Types/index';

import ProjectService from '@Services/ProjectService';

export default class API_SampleCreation {

  static unsavedChanges: boolean = false;
  static temporarySettings: SampleSettings = ProjectService.getDefaultSampleSettings();

  static reset() {
    this.unsavedChanges = false;
    this.temporarySettings = ProjectService.getDefaultSampleSettings();
  }

  static setSampleID(value: string) { this.temporarySettings.id_sample = value; }
  static setSampleName(value: string) { this.temporarySettings.name = value; }
}

