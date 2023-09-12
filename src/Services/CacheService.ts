import { ProjectSettings, SampleSettings, WidgetData } from '@Types/index';
import DatabaseService from './DatabaseService';
import UtilService from './UtilService';

export default class CacheService {

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
    this.allSamples = await DatabaseService.getAllSamples(lastProjectID);
  }

  static async deleteLastOpenProject(): Promise<void> {
    await DatabaseService.deleteLastOpenProject();
    this.lastOpenProject = {
      id_project: '',
      name: '',
      rules: {},
    };
  }

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

  static updateCache_ProjectSettings(projectSettings: ProjectSettings) {
    for (let i = 0; i < CacheService.allProjects.length; i++) {
      if (this.allProjects[i].id_project === projectSettings.id_project) {
        this.allProjects[i] = UtilService.deepCopy(projectSettings);
        return;
      }
    }
    throw Error('Project does not exist on cache');
  }

  static updateCache_SampleSettings(sampleSettings: SampleSettings) {
    for (let i = 0; i < CacheService.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === sampleSettings.id_sample) {
        this.allSamples[i] = UtilService.deepCopy(sampleSettings);
        return;
      }
    }
    throw Error('Sample does not exist on cache');
  }

  static updateCache_ProjectWidget(widgetData: WidgetData) {
    for (let i = 0; i < CacheService.allWidgets_Project.length; i++) {
      if (this.allWidgets_Project[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Project[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    throw Error('Project Widget does not exist on cache');
  }

  static updateCache_TemplateWidget(widgetData: WidgetData) {
    for (let i = 0; i < CacheService.allWidgets_Template.length; i++) {
      if (this.allWidgets_Template[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Template[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    throw Error('Template Widget does not exist on cache');
  }

  static updateCache_SampleWidget(widgetData: WidgetData) {
    for (let i = 0; i < CacheService.allWidgets_Sample.length; i++) {
      if (this.allWidgets_Sample[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Sample[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    throw Error('Sample Widget does not exist on cache');
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
}
