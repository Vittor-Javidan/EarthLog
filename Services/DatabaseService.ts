import { ID, IDsArray, ProjectSettings, SampleSettings, WidgetData } from '@Types/index';

import FileSystemService from './FileSystemService';
import LocalStorageService from './LocalStorageService';

/**
 * Should never be called directly on UI. It meant to be used by other services.
 */
export default class DatabaseService {

  private static DATA_BASE_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/database`;










  // ===============================================================================================
  // DATABASE
  // ===============================================================================================

  static async createDatabase(): Promise<void> {
    const databaseFolderContents = await FileSystemService.readDirectory(this.DATA_BASE_DIRECTORY);
    if (databaseFolderContents === null) {

      // MAIN FOLDER
      await FileSystemService.createDirectory(this.DATA_BASE_DIRECTORY);

      // MAIN INDEX FILE
      await FileSystemService.writeFile(
        `${this.DATA_BASE_DIRECTORY}/index.json`,
        JSON.stringify([], null, 4)
      );
    }
  }










  // ===============================================================================================
  // PROJECT
  // ===============================================================================================

  static async getLastOpenProject(): Promise<ID | null> {

    // LOAD ID FROM LOCAL STORAGE
    const lastProject = await LocalStorageService.getData('LastProject');
    if (lastProject === null) {
      return null;
    }
    return JSON.parse(lastProject) as string;
  }

  static async saveLastOpenProject(id_project: string): Promise<void> {

    // SAVE ID ON LOCAL STORAGE
    await LocalStorageService.saveData('LastProject', JSON.stringify(id_project));
  }

  static async getAllProjects(): Promise<ProjectSettings[]> {

    // GET ALL PROJECTS IDs
    const allProjectsIDs = await this.readIndexFile(
      `${this.DATA_BASE_DIRECTORY}`
    );

    // GET PROJECT SETTINGS FOR EACH ID
    const allSettings: ProjectSettings[] = [];
    for (let i = 0; i < allProjectsIDs.length; i++) {
      allSettings.push(
        await this.readProject(allProjectsIDs[i])
      );
    }

    return allSettings;
  }

  static async createProject(projectSettings: ProjectSettings): Promise<void> {

    const { id_project } = projectSettings;
    const allProjectsIDs = await this.readIndexFile(
      `${this.DATA_BASE_DIRECTORY}`
    );

    // CHECK FOR DUPLICATE PROJECT ID
    if (allProjectsIDs.includes(id_project)) {
      throw Error('You cannot create 2 projects with same ID');
    }

    // ADD TO ALL PROJECTS INDEX
    allProjectsIDs.push(id_project);
    await this.updateIndexFile(
      `${this.DATA_BASE_DIRECTORY}`,
      allProjectsIDs
    );

    // CREATE MAIN FOLDER
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}`
    );

    // CREATE MAIN FOLDER CONTENTS
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets/index.json`,
      JSON.stringify([], null, 4)
    );
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate/index.json`,
      JSON.stringify([], null, 4)
    );
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/index.json`,
      JSON.stringify([], null, 4)
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectSettings.json`,
      JSON.stringify(projectSettings, null, 4),
    );
  }

  static async readProject(id_project: string): Promise<ProjectSettings> {

    // READ PROJECT SETTINGS
    const fileData = await FileSystemService.readFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectSettings.json`
    );
    return JSON.parse(fileData as string) as ProjectSettings;
  }

  static async updateProject(projectSettings: ProjectSettings): Promise<void> {

    // UPDATE PROJECT SETTINGS
    const { id_project } = projectSettings;
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectSettings.json`,
      JSON.stringify(projectSettings, null, 4)
    );
  }

  static async deleteProject(id_project: string): Promise<void> {

    const allProjectsIDs = await this.readIndexFile(
      this.DATA_BASE_DIRECTORY
    );

    // REMOVE FROM ALL PROJECTS INDEX
    const newIDs = allProjectsIDs.filter(ID => ID !== id_project);
    await this.updateIndexFile(
      this.DATA_BASE_DIRECTORY,
      newIDs
    );

    // DELETE MAIN FOLDER
    await FileSystemService.delete(
      `${this.DATA_BASE_DIRECTORY}/${id_project}`
    );
  }










  // ===============================================================================================
  // SAMPLE
  // ===============================================================================================

  static async getAllSamples(id_project: string): Promise<SampleSettings[]> {

    // GET ALL SAMPLES IDs
    const allSamplesIDs = await this.readIndexFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`
    );

    // GET SAMPLE SETTINGS FOR EACH ID
    const allSettings: SampleSettings[] = [];
    for (let i = 0; i < allSamplesIDs.length; i++) {
      allSettings.push(
        await this.readSample(id_project, allSamplesIDs[i])
      );
    }

    return allSettings;
  }

  static async createSample(
    id_project: string,
    sampleSettings: SampleSettings,
  ): Promise<void> {

    const { id_sample } = sampleSettings;
    const allSamplesIDs = await this.readIndexFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`
    );

    // CHECK FOR DUPLICATE SAMPLE ID
    if (allSamplesIDs.includes(id_sample)) {
      throw Error('You cannot create 2 Samples with same ID');
    }

    // ADD TO ALL SAMPLES INDEX
    allSamplesIDs.push(id_sample);
    await this.updateIndexFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`,
      allSamplesIDs
    );

    // CREATE MAIN FOLDER
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}`
    );

    // CREATE MAIN FOLDER CONTENTS
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets/index.json`,
      JSON.stringify([], null, 4)
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleSettings.json`,
      JSON.stringify(sampleSettings, null, 4),
    );
  }

  static async readSample(
    id_project: string,
    id_sample: string
  ): Promise<SampleSettings> {

    // READ PROJECT SETTINGS
    const fileData = await FileSystemService.readFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleSettings.json`
    );
    return await JSON.parse(fileData as string) as SampleSettings;
  }

  static async updateSample(
    id_project: string,
    sampleSettings: SampleSettings
  ): Promise<void> {

    const { id_sample } = sampleSettings;

    // UPDATE SAMPPLE SETTINGS
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleSettings.json`,
      JSON.stringify(sampleSettings, null, 4)
    );
  }

  static async deleteSample(
    id_project: string,
    id_sample: string,
  ): Promise<void> {

    const allSamplesIDs = await this.readIndexFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`
    );

    // REMOVE SAMPLE INDEX
    const newIDs = allSamplesIDs.filter(ID => ID !== id_sample);
    await this.updateIndexFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`,
      newIDs
    );

    // DELETE SAMPLE FOLDER
    await FileSystemService.delete(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}`
    );
  }











  // ===============================================================================================
  // WIDGETS
  // ===============================================================================================

  static async getAllWidgets_Project(
    id_project: string
  ): Promise<WidgetData[]> {
    return await this.getAllWidgets(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`
    );
  }
  static async getAllWidgets_SampleTemplate(
    id_project: string
  ): Promise<WidgetData[]> {
    return await this.getAllWidgets(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`
    );
  }
  static async getAllWidgets_Sample(
    id_project: string,
    id_sample: string
  ): Promise<WidgetData[]> {
    return await this.getAllWidgets(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`
    );
  }
  private static async getAllWidgets(allWidgetsFolderPath: string): Promise<WidgetData[]> {

    // GET ALL WIDGETS IDs
    const allWidgetsIDs = await this.readIndexFile(
      `${allWidgetsFolderPath}`
    );

    // GET WIDGET DATA FOR EACH ID
    const allWidgetsData: WidgetData[] = [];
    for (let i = 0; i < allWidgetsIDs.length; i++) {
      allWidgetsData.push(
        await this.readWidget(allWidgetsFolderPath, allWidgetsIDs[i])
      );
    }

    return allWidgetsData;
  }

  //================================
  //================================
  static async createWidget_Project(
    id_project: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.createWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`,
      widgetData,
    );
  }
  static async createWidget_SampleTemplate(
    id_project: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.createWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`,
      widgetData,
    );
  }
  static async createWidget_Sample(
    id_project: string,
    id_sample: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.createWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`,
      widgetData,
    );
  }
  private static async createWidget(
    allWidgetsFolderPath: string,
    widgetData: WidgetData,
  ) {

    const { id_widget } = widgetData;
    const allWidgetsIDs = await this.readIndexFile(
      `${allWidgetsFolderPath}`
    );

    // CHECK FOR DUPLICATE WIDGET ID
    if (allWidgetsIDs.includes(id_widget)) {
      throw Error('You cannot create 2 widgets with same ID');
    }

    // ADD TO PROJECT WIDGETS INDEX
    allWidgetsIDs.push(id_widget);
    await this.updateIndexFile(
      `${allWidgetsFolderPath}`,
      allWidgetsIDs
    );

    // CREATE MAIN FOLDER
    await FileSystemService.createDirectory(
      `${allWidgetsFolderPath}/${id_widget}`
    );

    // MAIN FOLDER CONTENTS
    await FileSystemService.writeFile(
      `${allWidgetsFolderPath}/${id_widget}/data.json`,
      JSON.stringify(widgetData, null, 4),
    );
  }

  //================================
  //================================
  static async readWidget_Project(
    id_project: string,
    id_widget: string,
  ): Promise<WidgetData> {
    return await this.readWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`,
      id_widget
    );
  }
  static async readWidget_SampleTemplate(
    id_project: string,
    id_widget: string,
  ): Promise<WidgetData> {
    return await this.readWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`,
      id_widget
    );
  }
  static async readWidget_Sample(
    id_project: string,
    id_sample: string,
    id_widget: string,
  ): Promise<WidgetData> {
    return await this.readWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`,
      id_widget
    );
  }
  private static async readWidget(
    allWidgetsFolderPath: string,
    id_widget: string,
  ): Promise<WidgetData> {

    // READ WIDGET DATA
    const dataFile = await FileSystemService.readFile(
      `${allWidgetsFolderPath}/${id_widget}/data.json`
    );
    return await JSON.parse(dataFile as string) as WidgetData;
  }

  //================================
  //================================
  static async updateWidget_Project(
    id_project: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.updateWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`,
      widgetData
    );
  }
  static async updateWidget_SampleTemplate(
    id_project: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.updateWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`,
      widgetData
    );
  }
  static async updateWidget_Sample(
    id_project: string,
    id_sample: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.updateWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`,
      widgetData
    );
  }
  private static async updateWidget(
    allWidgetsFolderPath: string,
    widgetData: WidgetData,
  ): Promise<void> {

    const { id_widget } = widgetData;

    // OVEWRITTE FILES
    await FileSystemService.writeFile(
      `${allWidgetsFolderPath}/${id_widget}/data.json`,
      JSON.stringify(widgetData, null, 4)
    );
  }

  //================================
  //================================
  static async deleteWidget_Project(
    id_project: string,
    id_widget: string,
  ): Promise<void> {
    await this.deleteWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`,
      id_widget
    );
  }
  static async deleteWidget_SampleTemplate(
    id_project: string,
    id_widget: string,
  ): Promise<void> {
    await this.deleteWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`,
      id_widget
    );
  }
  static async deleteWidget_Sample(
    id_project: string,
    id_sample: string,
    id_widget: string,
  ): Promise<void> {
    await this.deleteWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`,
      id_widget
    );
  }
  private static async deleteWidget(
    allWidgetsFolderPath: string,
    id_widget: string,
  ): Promise<void> {

    const allWidgetsIDs = await this.readIndexFile(
      `${allWidgetsFolderPath}`
    );

    // REMOVE WIDGET INDEX
    const newIDs = allWidgetsIDs.filter(ID => ID !== id_widget);
    await this.updateIndexFile(
      `${allWidgetsFolderPath}`,
      newIDs
    );

    // DELETE MAIN FOLDER
    await FileSystemService.delete(
      `${allWidgetsFolderPath}/${id_widget}`
    );
  }










  // ===============================================================================================
  // INDEX FILE
  // ===============================================================================================

  private static async readIndexFile(folderPath: string): Promise<IDsArray> {
    const indexFilePath = `${folderPath}/index.json`;
    const indexDataString = await FileSystemService.readFile(indexFilePath);
    if (indexDataString === null) {
      throw Error(`ERROR: index.json file do not exist. Path: ${folderPath}`);
    }
    return JSON.parse(indexDataString) as IDsArray;
  }

  private static async updateIndexFile(folderPath: string, IDsArray: IDsArray): Promise<void> {
    const indexFilePath = `${folderPath}/index.json`;
    const indexDataString = await FileSystemService.readFile(indexFilePath);
    if (indexDataString === null) {
      throw Error(`ERROR: index.json file do not exist. Cannot be updated. Path: ${folderPath}`);
    }
    await FileSystemService.writeFile(`${folderPath}/index.json`, JSON.stringify(IDsArray, null, 4));
  }
}
