import uuid from 'react-native-uuid';

import { InputData, ProjectDTO, SampleDTO, WidgetData } from '@V2/Types/ProjectTypes';

export default class IDService {

  static generateUuidV4(): string {
    return uuid.v4() as string;
  }

  static changeIDsByReference_Project(project: ProjectDTO): void {
    project.projectSettings.id_project = this.generateUuidV4();
    for (let i = 0; i < project.projectWidgets.length; i++) {
      this.changeIDsByReference_Widget(project.projectWidgets[i]);
    }
    for (let i = 0; i < project.template.length; i++) {
      this.changeIDsByReference_Widget(project.template[i]);
    }
    for (let i = 0; i < project.samples.length; i++) {
      this.changeIDsByReference_Sample(project.samples[i]);
    }
  }

  static changeIDsByReference_Sample(sampleDTO: SampleDTO): void {
    sampleDTO.sampleSettings.id_sample = this.generateUuidV4();
    for (let i = 0; i < sampleDTO.sampleWidgets.length; i++) {
      this.changeIDsByReference_Widget(sampleDTO.sampleWidgets[i]);
    }
  }

  static changeIDsByReference_Widget(widgetData: WidgetData): void {
    widgetData.id_widget = this.generateUuidV4();
    for (let i = 0; i < widgetData.inputs.length; i++) {
      this.changeIDsByReference_Input(widgetData.inputs[i]);
    }
  }

  static changeIDsByReference_Input(input: InputData): void {
    input.id_input = this.generateUuidV4();
    if (input.type === 'options') {
      for (let j = 0; j < input.value.length; j++) {
        input.value[j].id = this.generateUuidV4();
      }
      return;
    }
    if (input.type === 'selection') {
      for (let j = 0; j < input.value.options.length; j++) {
        input.value.options[j].id = this.generateUuidV4();
      }
      return;
    }
  }
}
