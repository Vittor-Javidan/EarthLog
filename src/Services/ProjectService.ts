import UtilService from './UtilService';

import { ProjectDTO, ProjectSettings, SampleSettings, WidgetData, InputTypes, InputData, SampleRules, GPS_DTO } from '@Types/ProjectTypes';
import DatabaseService from './DatabaseService';
import { translations } from '@Translations/index';
import ConfigService from './ConfigService';

export default class ProjectService {

  // ===============================================================================================
  // DATA CREATION METHODS
  // ===============================================================================================

  static getDefaultProjectTemplate(options: {
    name?: string
  }): ProjectDTO {
    const id_project = UtilService.generateUuidV4();
    return {
      projectSettings: {
        id_project: id_project,
        status: 'new',
        name: options.name ?? '',
        gps: {},
        sampleAlias: {
          singular: '',
          plural: '',
        },
        rules: {
          allowGPSChange: true,
          allowProjectNameChange: true,
          allowSampleAliasChange: true,
          showCreateWidgetButton_Project: true,
          showCreateWidgetButton_Template: true,
          showSampleCreationButton: true,
          addGPSToNewSamples: true,
        },
      },
      projectWidgets: [],
      template: [],
      samples: [],
      syncData: {
        id_project: id_project,
        project: 'new',
        widgets_Project: {},
        widgets_Template: {},
        samples: {},
        widgets_Samples: {},
      },
    };
  }

  static getDefaultSampleSettings(options: {
    name?: string
    rules?: SampleRules,
    gps?: GPS_DTO
  }): SampleSettings {
    return {
      id_sample: UtilService.generateUuidV4(),
      name: options.name ?? '',
      gps: options.gps,
      rules: options.rules ?? {
        allowGPSChange: true,
        allowSampleNameChange: true,
        showCreateWidgetButton: true,
        showCopyWidgetFromTemplateButton: true,
      },
    };
  }

  static getWidgetData() : WidgetData {
    return {
      id_widget: UtilService.generateUuidV4(),
      widgetName: '',
      inputs: [],
      rules: {
        allowWidgetNameChange: true,
        showAddInputButton: true,
        showThemeButton: true,
        showOptionsButton: true,
        showDeleteButton_Widget: true,
        showDeleteButton_Inputs: true,
        showMoveButton_Inputs: true,
        template_showOptionsButton: true,
        template_AllowCopies: true,
        template_ShowDeleteButton_Widget: true,
        template_unlockAddAutomatically: true,
      },
    };
  }

  static getInputData(inputType: InputTypes): InputData {
    switch (inputType) {
      case 'boolean': return {
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'boolean',
        value: false,
        notApplicable: true,
      };
      case 'string': return {
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'string',
        value: '',
      };
      case 'gps': return {
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'gps',
        value: {},
      };
    }
  }











  // ===============================================================================================
  // BASIC DATABASE METHODS
  // ===============================================================================================

  static async createProject(
    projectDTO: ProjectDTO,
    feedback: (message: string) => void,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    const {
      projectSettings,
      projectWidgets,
      template,
      samples,
    } = projectDTO;

    const {
      id_project,
    } = projectSettings;

    try {

      const R = translations.service.projectService[ConfigService.config.language];

      // PROJECT FOLDER
      feedback(R['Creating project folder']);
      await DatabaseService.createProject(projectSettings);

      // PROJECT WIDGETS
      feedback(R['Saving project widgets']);
      for (let i = 0; i < projectWidgets.length; i++) {
        await DatabaseService.createWidget_Project(id_project, projectWidgets[i]);
      }

      // SAMPLE TEMPLATE WIDGETS
      feedback(R['Saving template widgets']);
      for (let i = 0; i < template.length; i++) {
        await DatabaseService.createWidget_Template(id_project, template[i]);
      }

      // SAMPLES
      for (let i = 0; i < samples.length; i++) {
        feedback(R['Saving samples of ID:'] + ` ${samples[i].sampleSettings.id_sample}`);

        const { sampleSettings, sampleWidgets } = samples[i];
        const { id_sample } = sampleSettings;

        // SAMPLE FOLDER
        await DatabaseService.createSample(id_project, sampleSettings);

        // SAMPLE WIDGETS
        for (let j = 0; j < sampleWidgets.length; j++) {
          feedback(R['Saving sample widget of ID:'] + ` ${sampleWidgets[j].id_widget}`);
          await DatabaseService.createWidget_Sample(id_project, id_sample, sampleWidgets[j]);
        }
      }

      // PROJECT SYNC FILE
      feedback(R['Saving project sync file']);
      await DatabaseService.createSyncFile(id_project, projectDTO.syncData);

      onSuccess();

    } catch (error) {
      DatabaseService.deleteProject(projectSettings.id_project);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateProject(
    projectSettings: ProjectSettings,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.updateProject(projectSettings);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteProject(
    id_project: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.deleteProject(id_project);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async createSample(
    id_project: string,
    sampleSettings: SampleSettings,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    const { id_sample } = sampleSettings;

    try {

      await DatabaseService.createSample(id_project, sampleSettings);

      // COPY AUTOGENERATED WIDGETS FROM TEMPLATE
      const templateWidgets = await DatabaseService.getAllWidgets_Template(id_project);
      for (let i = 0; i < templateWidgets.length; i++) {
        if (templateWidgets[i].addToNewSamples === true) {
          templateWidgets[i].id_widget = UtilService.generateUuidV4();
          await DatabaseService.createWidget_Sample(id_project, id_sample, templateWidgets[i]);
        }
      }

      onSuccess();

    } catch (error) {
      await DatabaseService.deleteSample(id_project, id_sample);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateSample(
    id_project: string,
    sampleSettings: SampleSettings,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.updateSample(id_project, sampleSettings);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteSample(
    id_project: string,
    id_sample: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.deleteSample(id_project, id_sample);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async createWidget_Project(
    id_project: string,
    widgetData: WidgetData,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    const { id_widget } = widgetData;

    try {
      await DatabaseService.createWidget_Project(id_project, widgetData);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget_Project(id_project, id_widget);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateWidget_Project(
    id_project: string,
    widgetData: WidgetData,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {
      await DatabaseService.updateWidget_Project(id_project, widgetData);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteWidget_Project(
    id_project: string,
    id_widget: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {
      await DatabaseService.deleteWidget_Project(id_project, id_widget);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async createWidget_Template(
    id_project: string,
    widgetData: WidgetData,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    const { id_widget } = widgetData;

    try {
      await DatabaseService.createWidget_Template(id_project, widgetData);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget_Template(id_project, id_widget);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateWidget_Template(
    id_project: string,
    widgetData: WidgetData,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {
      await DatabaseService.updateWidget_Template(id_project, widgetData);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteWidget_Template(
    id_project: string,
    id_widget: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {
      await DatabaseService.deleteWidget_Template(id_project, id_widget);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async createWidget_Sample(
    id_project: string,
    id_sample: string,
    widgetData: WidgetData,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    const { id_widget } = widgetData;

    try {
      await DatabaseService.createWidget_Sample(id_project, id_sample, widgetData);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget_Sample(id_project, id_sample, id_widget);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateWidget_Sample(
    id_project: string,
    id_sample: string,
    widgetData: WidgetData,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {
      await DatabaseService.updateWidget_Sample(id_project, id_sample, widgetData);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteWidget_Sample(
    id_project: string,
    id_sample: string,
    id_widget: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {
      await DatabaseService.deleteWidget_Sample(id_project, id_sample, id_widget);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }
}
