import { translations } from '@Translations/index';
import { ProjectSettings, SampleSettings, WidgetData } from '@Types/ProjectTypes';
import DatabaseService from './DatabaseService';
import UtilService from './UtilService';
import ConfigService from './ConfigService';
import { CredentialDTO } from '@Types/AppTypes';
import CredentialService from './CredentialService';

export default class CacheService {

  static allCredentials: CredentialDTO[] = [];
  static lastOpenProject: ProjectSettings = {
    id_project: '',
    name: '',
    rules: {},
    sampleAlias: {
      singular: '',
      plural: '',
    },
  };
  static allProjects: ProjectSettings[] = [];
  static allWidgets_Project: WidgetData[] = [];
  static allWidgets_Template: WidgetData[] = [];
  static allSamples: SampleSettings[] = [];
  static allWidgets_Sample: WidgetData[] = [];

  // ===============================================================================================
  // CREDENTIAL RELATED METHODS
  // ===============================================================================================

  static async loadAllCredentials(): Promise<void> {
    this.allCredentials = await CredentialService.getAllCredentials();
  }

  static addToCredentials(credential: CredentialDTO) {
    this.allCredentials = [...this.allCredentials, credential];
  }

  // ===============================================================================================
  // PROJECT RELATED METHODS
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
    this.allWidgets_Project = await DatabaseService.getAllWidgets_Project(lastProjectID);
    this.allWidgets_Template = await DatabaseService.getAllWidgets_Template(lastProjectID);
    this.allSamples = await DatabaseService.getAllSamples(lastProjectID);
  }

  static async deleteLastOpenProject(): Promise<void> {
    await DatabaseService.deleteLastOpenProject();
    this.lastOpenProject = {
      id_project: '',
      name: '',
      rules: {},
      sampleAlias: {
        singular: '',
        plural: '',
      },
    };
  }

  static getProjectFromCache(id_project: string): ProjectSettings {
    for (let i = 0; i < this.allProjects.length; i++) {
      if (this.allProjects[i].id_project === id_project) {
        return this.allProjects[i];
      }
    }
    const R = translations.service.cacheService[ConfigService.config.language];
    throw Error(R['ERROR: Project does not exist on cache']);
  }

  static getSampleFromCache(id_sample: string): SampleSettings {
    for (let i = 0; i < this.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === id_sample) {
        return this.allSamples[i];
      }
    }
    const R = translations.service.cacheService[ConfigService.config.language];
    throw Error(R['ERROR: Sample does not exist on cache']);
  }

  static updateCache_ProjectSettings(projectSettings: ProjectSettings) {
    for (let i = 0; i < CacheService.allProjects.length; i++) {
      if (this.allProjects[i].id_project === projectSettings.id_project) {
        this.allProjects[i] = UtilService.deepCopy(projectSettings);
        return;
      }
    }
    const R = translations.service.cacheService[ConfigService.config.language];
    throw Error(R['ERROR: Project does not exist on cache']);
  }

  static updateCache_SampleSettings(sampleSettings: SampleSettings) {
    for (let i = 0; i < CacheService.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === sampleSettings.id_sample) {
        this.allSamples[i] = UtilService.deepCopy(sampleSettings);
        return;
      }
    }
    const R = translations.service.cacheService[ConfigService.config.language];
    throw Error(R['ERROR: Sample does not exist on cache']);
  }

  static updateCache_ProjectWidget(widgetData: WidgetData) {
    for (let i = 0; i < CacheService.allWidgets_Project.length; i++) {
      if (this.allWidgets_Project[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Project[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    const R = translations.service.cacheService[ConfigService.config.language];
    throw Error(R['ERROR: Project Widget does not exist on cache']);
  }

  static updateCache_TemplateWidget(widgetData: WidgetData) {
    for (let i = 0; i < CacheService.allWidgets_Template.length; i++) {
      if (this.allWidgets_Template[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Template[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    const R = translations.service.cacheService[ConfigService.config.language];
    throw Error(R['ERROR: Template Widget does not exist on cache']);
  }

  static updateCache_SampleWidget(widgetData: WidgetData) {
    for (let i = 0; i < CacheService.allWidgets_Sample.length; i++) {
      if (this.allWidgets_Sample[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Sample[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    const R = translations.service.cacheService[ConfigService.config.language];
    throw Error(R['ERROR: Sample Widget does not exist on cache']);
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

  /**
   * Adds a project direcly into the cache, to avoid the necessity of loading all projects again.
   */
  static addToAllProjects(projectSettings: ProjectSettings): void {
    this.allProjects = [UtilService.deepCopy(projectSettings), ...this.allProjects];
  }

  /**
   * Adds a sample direcly into the cache, to avoid the necessity of loading all samples again.
   */
  static addToAllSamples(sampleSettings: SampleSettings): void {
    this.allSamples = [UtilService.deepCopy(sampleSettings), ...this.allSamples];
  }

  /**
   * Adds a widget direcly into the cache, to avoid the necessity of loading all widgets again.
   */
  static addToAllWidgets_Project(widgetData: WidgetData): void {
    this.allWidgets_Project = [...this.allWidgets_Project, UtilService.deepCopy(widgetData)];
  }

  /**
   * Adds a widget direcly into the cache, to avoid the necessity of loading all widgets again.
   */
  static addToAllWidgets_Template(widgetData: WidgetData): void {
    this.allWidgets_Template = [...this.allWidgets_Template, UtilService.deepCopy(widgetData)];
  }

  /**
   * Adds a widget direcly into the cache, to avoid the necessity of loading all widgets again.
   */
  static addToAllWidgets_Sample(widgetData: WidgetData): void {
    this.allWidgets_Sample = [...this.allWidgets_Sample, UtilService.deepCopy(widgetData)];
  }
}
