import uuid from 'react-native-uuid';
import FileSystemService from './FileSystemService';
import DatabaseService from './DatabaseService';
import { ProjectDTO, ProjectSettings, SampleSettings, WidgetData, WidgetTypes } from '@Types/index';

export default class ProjectService {

  // ===============================================================================================
  // CONSTANTS
  // ===============================================================================================

  static DATA_BASE_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/database`;

  // ===============================================================================================
  // CACHED DATA
  // ===============================================================================================

  static lastProject: ProjectSettings = {
    id_project: '',
    immutable: true,
    name: '',
    rules: {},
  };
  static allProjects: ProjectSettings[] = [];
  static allSamples: SampleSettings[] = [];
  static allSampleWidgets: WidgetData[] = [];

  // ===============================================================================================
  // APP INITIALIZATION METHODS
  // ===============================================================================================

  static async loadDatabase(): Promise<void> {
    await DatabaseService.createDatabase();
    await this.loadAllProjectsSettings();
    await this.loadLastOpenProject();
  }

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
        immutable: false,
        rules: {
          allowImmutableChange: true,
          allowIDChange: true,
          allowNameChange: true,
          allowSampleCreation: true,
        },
      },
      projectWidgets: [],
      sampleTemplate: [],
      samples: [],
    };
  }

  static getDefaultSampleSettings(): SampleSettings {
    return {
      id_sample: this.generateUuidV4(),
      name: '',
      rules: {
        allowIDChange: true,
        allowNameChange: true,
        allowSampleErase: true,
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
  // CACHE METHODS
  // ===============================================================================================

  static getProject(id_project: string): ProjectSettings {
    for (let i = 0; i < this.allProjects.length; i++) {
      if (this.allProjects[i].id_project === id_project) {
        return this.allProjects[i];
      }
    }
    throw Error('Project does not exist on cache');
  }

  static getSample(id_sample: string): SampleSettings {
    for (let i = 0; i < this.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === id_sample) {
        return this.allSamples[i];
      }
    }
    throw Error('Sample does not exist on cache');
  }

  // ===============================================================================================
  // DATABASE CACHING RELATED METHODS
  // ===============================================================================================

  static async saveLastOpenProject(id_project: string): Promise<void> {
    await DatabaseService.saveLastOpenProject(id_project);
    this.lastProject = await DatabaseService.readProject(id_project);
  }

  static async loadLastOpenProject(): Promise<void> {
    const lastProjectID = await DatabaseService.getLastOpenProject();
    if (lastProjectID === null) {
      return;
    }
    this.lastProject = await DatabaseService.readProject(lastProjectID);
  }

  static async loadAllProjectsSettings(): Promise<void> {
    this.allProjects = await DatabaseService.getAllProjects();
  }

  static async loadAllSamplesSettings(id_project: string): Promise<void> {
    this.allSamples = await DatabaseService.getAllSamples(id_project);
  }

  static async loadAllSampleWidgetData(id_project: string, id_sample: string): Promise<void> {
    this.allSampleWidgets = await DatabaseService.getAllWidgets_Sample(id_project, id_sample);
  }

  // ===============================================================================================
  // OTHER DATABASE METHODS
  // ===============================================================================================

  static async createProject(
    projectDTO: ProjectDTO,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    const {
      projectSettings,
      projectWidgets,
      sampleTemplate,
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
      for (let i = 0; i < sampleTemplate.length; i++) {
        await DatabaseService.createWidget_SampleTemplate(id_project, sampleTemplate[i]);
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

      // REFRESH CACHE
      await this.loadAllProjectsSettings();
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
      await this.loadAllProjectsSettings();
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
      await this.loadAllProjectsSettings();
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
      const templateWidgets = await DatabaseService.getAllWidgets_SampleTemplate(id_project);
      for (let i = 0; i < templateWidgets.length; i++) {
        templateWidgets[i].id_widget = this.generateUuidV4();
        DatabaseService.createWidget_Sample(id_project, id_sample, templateWidgets[i]);
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

}
