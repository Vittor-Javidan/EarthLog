import UtilService from './UtilService';

import { ProjectDTO, ProjectSettings, SampleSettings, WidgetData, InputTypes, InputData, SampleDTO } from '@Types/ProjectTypes';
import DatabaseService from './DatabaseService';

export default class ProjectService {

  // ===============================================================================================
  // DATA CREATION METHODS
  // ===============================================================================================

  static getDefaultProjectTemplate(): ProjectDTO {
    return {
      projectSettings: {
        id_project: UtilService.generateUuidV4(),
        name: '',
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
        },
      },
      projectWidgets: [],
      template: [],
      samples: [],
    };
  }

  static getDefaultSampleSettings(): SampleSettings {
    return {
      id_sample: UtilService.generateUuidV4(),
      name: '',
      gps: {},
      rules: {
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
  // OTHER PROJECT METHODS
  // ===============================================================================================

  /**
   * Changes the ID of all elements inside a projectDTO.
   * All IDs are changed by reference. No need to return a value;
   */
  static changeAllIDs(projectDTO: ProjectDTO): void {

    projectDTO.projectSettings.id_project = UtilService.generateUuidV4();
    changeAllWidgetsIds(projectDTO.projectWidgets);
    changeAllWidgetsIds(projectDTO.template);
    changeAllSamplesIds(projectDTO.samples);

    function changeAllSamplesIds(sampleDTO: SampleDTO[]): void {
      for (let i = 0; i < sampleDTO.length; i++) {
        sampleDTO[i].sampleSettings.id_sample = UtilService.generateUuidV4();
        changeAllWidgetsIds(sampleDTO[i].sampleWidgets);
      }
    }

    function changeAllWidgetsIds(widgetDataArray: WidgetData[]): void {
      for (let i = 0; i < widgetDataArray.length; i++) {
        widgetDataArray[i].id_widget = UtilService.generateUuidV4();
        changeAllInputsIds(widgetDataArray[i].inputs);
      }
    }

    function changeAllInputsIds(inputDataArray: InputData[]): void {
      for (let i = 0; i < inputDataArray.length; i++) {
        inputDataArray[i].id_input = UtilService.generateUuidV4();
      }
    }
  }












  // ===============================================================================================
  // BASIC DATABASE METHODS
  // ===============================================================================================

  /**
   * Use this to retrive a ProjectDTO from database
   */
  static async buildProjectFromDatabase(project_id: string): Promise<ProjectDTO> {

    // INITAL PROJECT STRUCTURE
    const projectDTO: ProjectDTO = {
      projectSettings: await DatabaseService.readProject(project_id),
      projectWidgets:  await DatabaseService.getAllWidgets_Project(project_id),
      template:        await DatabaseService.getAllWidgets_Template(project_id),
      samples:         [],
    };

    // GET ALL SAMPLES
    const allSampleSettings = await DatabaseService.getAllSamples(project_id);
    for (let i = 0; i < allSampleSettings.length; i++) {
      projectDTO.samples.push({
        sampleSettings: allSampleSettings[i],
        sampleWidgets: await DatabaseService.getAllWidgets_Sample(project_id, allSampleSettings[i].id_sample),
      });
    }

    return projectDTO;
  }

  static async createProject(
    projectDTO: ProjectDTO,
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

      // PROJECT FOLDER
      await DatabaseService.createProject(projectSettings);

      // PROJECT WIDGETS
      for (let i = 0; i < projectWidgets.length; i++) {
        await DatabaseService.createWidget_Project(id_project, projectWidgets[i]);
      }

      // SAMPLE TEMPLATE WIDGETS
      for (let i = 0; i < template.length; i++) {
        await DatabaseService.createWidget_Template(id_project, template[i]);
      }

      // SAMPLES
      for (let i = 0; i < samples.length; i++) {

        const {
          sampleSettings,
          sampleWidgets,
        } = samples[i];

        // SAMPLE FOLDER
        await DatabaseService.createSample(id_project, sampleSettings);

        // SAMPLE WIDGETS
        for (let j = 0; j < sampleWidgets.length; j++) {
          const { id_sample } = sampleSettings;
          await DatabaseService.createWidget_Sample(id_project, id_sample, sampleWidgets[j]);
        }
      }

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
