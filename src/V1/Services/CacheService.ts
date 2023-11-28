import { LTS_VERSION } from '@V1/Globals/Version';
import { ProjectSettings, SampleSettings, WidgetData } from '@V1/Types/ProjectTypes';
import LocalStorageService from './LocalStorageService';
import DatabaseService from './DatabaseService';
import UtilService from './UtilService';

export default class CacheService {

  private static LAST_PROJECT_LOCAL_STORAGE_KEY = `${LTS_VERSION}_LastProject`;

  static lastOpenProject: ProjectSettings | null = null;
  static allProjects: ProjectSettings[]          = [];
  static allWidgets_Project: WidgetData[]        = [];
  static allWidgets_Template: WidgetData[]       = [];
  static allSamples: SampleSettings[]            = [];
  static allWidgets_Sample: WidgetData[]         = [];

  // ===============================================================================================
  // PROJECT RELATED METHODS
  // ===============================================================================================

  static async saveLastOpenProject(id_project: string): Promise<void> {
    await LocalStorageService.saveData(this.LAST_PROJECT_LOCAL_STORAGE_KEY, id_project);
    this.lastOpenProject = await DatabaseService.readProject(id_project);
  }

  /**
   * @WARNING Depends on all projects already being loaded
   */
  static async loadLastOpenProject(): Promise<void> {

    const lastProjectID = await LocalStorageService.getData(this.LAST_PROJECT_LOCAL_STORAGE_KEY);
    const allProjectSettingsIDs = this.allProjects.map(settings => settings.id_project);

    if (lastProjectID === null) {
      return;
    }

    if (!allProjectSettingsIDs.includes(lastProjectID)) {
      return;
    }

    this.lastOpenProject     = await DatabaseService.readProject(lastProjectID);
    this.allWidgets_Project  = await DatabaseService.getAllWidgets({ path: 'project widgets', id_project: lastProjectID });
    this.allWidgets_Template = await DatabaseService.getAllWidgets({ path: 'template widgets', id_project: lastProjectID });
    this.allSamples          = (await DatabaseService.getAllSamples(lastProjectID)).reverse();
  }

  static async deleteLastOpenProject(): Promise<void> {
    await LocalStorageService.removeData(this.LAST_PROJECT_LOCAL_STORAGE_KEY);
    this.lastOpenProject = null;
  }

  static resetCache(): void {
    CacheService.allProjects = [];
    CacheService.allWidgets_Project = [];
    CacheService.allWidgets_Template = [];
    CacheService.allSamples = [];
    CacheService.allWidgets_Sample = [];
  }

  static getProjectFromCache(
    id_project: string,
  ): ProjectSettings {
    for (let i = 0; i < this.allProjects.length; i++) {
      if (this.allProjects[i].id_project === id_project) {
        return this.allProjects[i];
      }
    }
    throw Error('ERROR: Project does not exist on cache');
  }

  static getSampleFromCache(
    id_sample: string,
  ): SampleSettings {
    for (let i = 0; i < this.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === id_sample) {
        return this.allSamples[i];
      }
    }
    throw Error('ERROR: Sample does not exist on cache');
  }

  static updateCache_ProjectSettings(
    projectSettings: ProjectSettings,
  ) {
    for (let i = 0; i < CacheService.allProjects.length; i++) {
      if (this.allProjects[i].id_project === projectSettings.id_project) {
        this.allProjects[i] = UtilService.deepCopy(projectSettings);
        return;
      }
    }
    throw Error('ERROR: Project does not exist on cache');
  }

  static updateCache_SampleSettings(
    sampleSettings: SampleSettings,
  ) {
    for (let i = 0; i < CacheService.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === sampleSettings.id_sample) {
        this.allSamples[i] = UtilService.deepCopy(sampleSettings);
        return;
      }
    }
    throw Error('ERROR: Sample does not exist on cache');
  }

  static updateCache_ProjectWidget(
    widgetData: WidgetData,
  ) {
    for (let i = 0; i < CacheService.allWidgets_Project.length; i++) {
      if (this.allWidgets_Project[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Project[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    throw Error('ERROR: Project Widget does not exist on cache');
  }

  static updateCache_TemplateWidget(
    widgetData: WidgetData,
  ) {
    for (let i = 0; i < CacheService.allWidgets_Template.length; i++) {
      if (this.allWidgets_Template[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Template[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    throw Error('ERROR: Template Widget does not exist on cache');
  }

  static updateCache_SampleWidget(
    widgetData: WidgetData,
  ) {
    for (let i = 0; i < CacheService.allWidgets_Sample.length; i++) {
      if (this.allWidgets_Sample[i].id_widget === widgetData.id_widget) {
        this.allWidgets_Sample[i] = UtilService.deepCopy(widgetData);
        return;
      }
    }
    throw Error('ERROR: Sample Widget does not exist on cache');
  }

  static async loadAllProjectsSettings(): Promise<void> {
    this.allProjects = (await DatabaseService.getAllProjects()).reverse();
  }

  static async loadAllSamplesSettings(id_project: string): Promise<void> {
    this.allSamples = (await DatabaseService.getAllSamples(id_project)).reverse();
  }

  static async loadAllWidgets_Project(id_project: string): Promise<void> {
    this.allWidgets_Project = await DatabaseService.getAllWidgets({
      path: 'project widgets',
      id_project: id_project,
    });
  }

  static async loadAllWidgets_Template(id_project: string): Promise<void> {
    this.allWidgets_Template = await DatabaseService.getAllWidgets({
      path: 'template widgets',
      id_project: id_project,
    });
  }

  static async loadAllWidgets_Sample(id_project: string, id_sample: string): Promise<void> {
    this.allWidgets_Sample = await DatabaseService.getAllWidgets({
      path: 'sample widgets',
      id_project: id_project,
      id_sample: id_sample,
    });
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

  /**
   * Remove widget directly from the cache, to avoid unnecessary loading of all samples again.
   * Does not update array reference.
   */
  static removeFromProjects(id_project: string): void {
    for (let i = 0; i < this.allProjects.length; i++) {
      if (this.allProjects[i].id_project === id_project) {
        this.allProjects.splice(i, 1);
      }
    }
  }

  /**
   * Remove widget directly from the cache, to avoid unnecessary loading of all samples again.
   * Does not update array reference.
   */
  static removeFromSamples(id_sample: string): void {
    for (let i = 0; i < this.allSamples.length; i++) {
      if (this.allSamples[i].id_sample === id_sample) {
        this.allSamples.splice(i, 1);
      }
    }
  }
}
