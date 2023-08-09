import uuid from 'react-native-uuid';
import FileSystemService from './FileSystemService';
import DatabaseService from './DatabaseService';
import { ProjectDTO, ProjectSettings, SampleSettings, WidgetData, WidgetTypes } from '@Types/index';

export default class ProjectService {

  static DATA_BASE_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/database`;










  // ===============================================================================================
  // CACHED DATA
  // ===============================================================================================

  static lastOpenProject: ProjectSettings = {
    id_project: '',
    name: '',
    rules: {},
  };
  static allProjects: ProjectSettings[] = [];
  static allWidgets_Project: WidgetData[] = [];
  static allWidgets_Template: WidgetData[] = [];
  static allSamples: SampleSettings[] = [];
  static allWidgets_Sample: WidgetData[] = [];











  // ===============================================================================================
  // DATA CREATION METHODS
  // ===============================================================================================

  static generateUuidV4(): string {
    return uuid.v4() as string;
  }

  static getDefaultProjectTemplate(): ProjectDTO {
    return {
      projectSettings: {
        id_project: this.generateUuidV4(),
        name: '',
        rules: {
          allowNameChange: true,
          allowSampleCreation: true,
          allowWidgetCreation_Project: true,
          allowWidgetCreation_Template: true,
          allowWidgetCreation_Sample: true,
        },
      },
      projectWidgets: [],
      template: [],
      samples: [],
    };
  }

  static getDefaultSampleSettings(): SampleSettings {
    return {
      id_sample: this.generateUuidV4(),
      name: '',
      rules: {
        allowNameChange: true,
        allowSampleErase: true,
        allowWidgetCreation: true,
      },
    };
  }

  static getWidgetData(widgetName: WidgetTypes): WidgetData {
    switch (widgetName) {
      case 'boolean': return {
        id_widget: this.generateUuidV4(),
        name: '',
        type: 'boolean',
        value: false,
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
          allowWidgetErase: true,
        },
      };
      case 'text': return {
        id_widget: this.generateUuidV4(),
        name: '',
        type: 'text',
        value: '',
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
          allowWidgetErase: true,
        },
      };
    }
  }











  // ===============================================================================================
  // DATA CREATION METHODS
  // ===============================================================================================

  static async deleteDatabase() {
    await DatabaseService.deleteDatabase();
    await this.deleteLastOpenProject();
    this.lastOpenProject = {
      id_project: '',
      name: '',
      rules: {},
    };
    this.allProjects = [];
    this.allWidgets_Project = [];
    this.allWidgets_Template = [];
    this.allSamples = [];
    this.allWidgets_Sample = [];
  }

  // ===============================================================================================
  // CACHE METHODS
  // ===============================================================================================

  static getProjectFromCache(id_project: string): ProjectSettings {
    for (let i = 0; i < this.allProjects.length; i++) {
      if (this.allProjects[i].id_project === id_project) {
        return this.allProjects[i];
      }
    }
    throw Error('Project does not exist on cache');
  }

  static getSampleFromCache(id_sample: string): SampleSettings {
    for (let i = 0; i < this.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === id_sample) {
        return this.allSamples[i];
      }
    }
    throw Error('Sample does not exist on cache');
  }

  static getLastProjectFromCache(): ProjectSettings {
    return this.lastOpenProject;
  }

  static getAllProjectWidgetsFromCache(): WidgetData[] {
    return this.allWidgets_Project;
  }










  // ===============================================================================================
  // DATABASE CACHING RELATED METHODS
  // ===============================================================================================

  static async saveLastOpenProject(id_project: string): Promise<void> {
    await DatabaseService.saveLastOpenProject(id_project);
    this.lastOpenProject = await DatabaseService.readProject(id_project);
  }

  static async loadLastOpenProject(): Promise<void> {

    const lastProjectID = await DatabaseService.getLastOpenProject();
    const allProjectSettingsIDs = this.allProjects.map(settings => settings.id_project);

    if (lastProjectID === null) {
      return;
    }

    if (!allProjectSettingsIDs.includes(lastProjectID)) {
      return;
    }

    this.lastOpenProject = await DatabaseService.readProject(lastProjectID);
  }

  static async deleteLastOpenProject(): Promise<void> {
    await DatabaseService.deleteLastOpenProject();
    this.lastOpenProject = {
      id_project: '',
      name: '',
      rules: {},
    };
  }

  static async loadAllProjectsSettings(): Promise<void> {
    this.allProjects = await DatabaseService.getAllProjects();
  }

  static async loadAllSamplesSettings(id_project: string): Promise<void> {
    this.allSamples = await DatabaseService.getAllSamples(id_project);
  }

  static async loadAllWidgets_Project(id_project: string): Promise<void> {
    this.allWidgets_Project = await DatabaseService.getAllWidgets_Project(id_project);
  }

  static async loadAllWidgets_Template(id_project: string): Promise<void> {
    this.allWidgets_Template = await DatabaseService.getAllWidgets_Template(id_project);
  }

  static async loadAllWidgets_Sample(id_project: string, id_sample: string): Promise<void> {
    this.allWidgets_Sample = await DatabaseService.getAllWidgets_Sample(id_project, id_sample);
  }










  // ===============================================================================================
  // BASIC DATABASE METHODS
  // ===============================================================================================

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
      onError(JSON.stringify(error));
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
      onError(JSON.stringify(error));
    }
  }

  static async deleteProject(
    id_project: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.deleteProject(id_project);
      if (this.lastOpenProject.id_project === id_project) {
        await this.deleteLastOpenProject();
      }
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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

      // COPY WIDGETS FROM TEMPLATE
      const templateWidgets = await DatabaseService.getAllWidgets_Template(id_project);
      for (let i = 0; i < templateWidgets.length; i++) {
        templateWidgets[i].id_widget = this.generateUuidV4();
        await DatabaseService.createWidget_Sample(id_project, id_sample, templateWidgets[i]);
      }

      await this.loadAllSamplesSettings(id_project);
      onSuccess();

    } catch (error) {
      await DatabaseService.deleteSample(id_project, id_sample);
      onError(JSON.stringify(error));
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
      await this.loadAllSamplesSettings(id_project);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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
      await this.loadAllSamplesSettings(id_project);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Project(id_project);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget_Project(id_project, id_widget);
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Project(id_project);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Project(id_project);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Template(id_project);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget_Template(id_project, id_widget);
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Template(id_project);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Template(id_project);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Sample(id_project, id_sample);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget_Sample(id_project, id_sample, id_widget);
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Sample(id_project, id_sample);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
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
      await this.loadAllWidgets_Sample(id_project, id_sample);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
    }
  }

}
