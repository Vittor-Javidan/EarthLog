import { ID, IDsArray, ProjectSettings, SyncData, SampleSettings, WidgetData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import FileSystemService from './FileSystemService';
import LocalStorageService from './LocalStorageService';
import ConfigService from './ConfigService';

/**
 * Should never be called directly on UI. It meant to be used by other services.
 */
export default class DatabaseService {

  private static DATA_BASE_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/database`;










  // ===============================================================================================
  // DATABASE
  // ===============================================================================================

  static async createDatabaseFolder(): Promise<void> {
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

  static async deleteDatabaseFolder(): Promise<void> {
    await FileSystemService.delete(this.DATA_BASE_DIRECTORY);
    await this.deleteLastOpenProject();
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

  static async deleteLastOpenProject(): Promise<void> {

    // REMOVE ID FROM LOCAL STORAGE
    await LocalStorageService.removeData('LastProject');
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
      const R = translations.service.database[ConfigService.config.language];
      throw Error(R['ERROR: Not possible to create 2 projects with same ID']);
    }

    // ADD TO ALL PROJECTS INDEX
    allProjectsIDs.push(id_project);
    await this.updateIndexFile(
      `${this.DATA_BASE_DIRECTORY}`,
      allProjectsIDs,
    );

    // CREATE MAIN FOLDER
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}`
    );

    // CREATE PROJECT SETTINGS FILE ==
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectSettings.json`,
      JSON.stringify(projectSettings, null, 4),
    );

    // CREATE SYNC FILE ==============
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/syncStatus.json`,
      JSON.stringify({}, null, 4)
    );

    // CREATE PROJECT WIDGETS FOLDER =======
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets/index.json`,
      JSON.stringify([], null, 4)
    );

    // CREATE TEMPLATE WIDGETS FOLDER ======
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/template`
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/template/index.json`,
      JSON.stringify([], null, 4)
    );

    // CREATE SAMPLES FOLDER ===============
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`
    );
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/index.json`,
      JSON.stringify([], null, 4)
    );

    // CREATE MEDIA FOLDER =================
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/media`
    );
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/media/pictures`
    );
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/media/videos`
    );
    await FileSystemService.createDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/media/audios`
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
      const R = translations.service.database[ConfigService.config.language];
      throw Error(R['ERROR: Not possible to create 2 samples with same ID']);
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
  static async getAllWidgets_Template(
    id_project: string
  ): Promise<WidgetData[]> {
    return await this.getAllWidgets(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/template`
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
  static async createWidget_Template(
    id_project: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.createWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/template`,
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
      const R = translations.service.database[ConfigService.config.language];
      throw Error(R['ERROR: Not possible to create 2 widgets with same ID']);
    }

    // ADD TO PROJECT WIDGETS INDEX
    allWidgetsIDs.push(id_widget);
    await this.updateIndexFile(
      `${allWidgetsFolderPath}`,
      allWidgetsIDs,
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
  static async readWidget_Template(
    id_project: string,
    id_widget: string,
  ): Promise<WidgetData> {
    return await this.readWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/template`,
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
  static async updateWidget_Template(
    id_project: string,
    widgetData: WidgetData,
  ): Promise<void> {
    await this.updateWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/template`,
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
  static async deleteWidget_Template(
    id_project: string,
    id_widget: string,
  ): Promise<void> {
    await this.deleteWidget(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/template`,
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
      const R = translations.service.database[ConfigService.config.language];
      throw Error(R['ERROR: index.json file do not exist. Path: '] + folderPath);
    }
    return JSON.parse(indexDataString) as IDsArray;
  }

  private static async updateIndexFile(folderPath: string, IDsArray: IDsArray): Promise<void> {
    const indexFilePath = `${folderPath}/index.json`;
    const indexDataString = await FileSystemService.readFile(indexFilePath);
    if (indexDataString === null) {
      const R = translations.service.database[ConfigService.config.language];
      throw Error(R['ERROR: index.json file do not exist. Path: '] + folderPath);
    }
    await FileSystemService.writeFile(`${folderPath}/index.json`, JSON.stringify(IDsArray, null, 4));
  }









  // ===============================================================================================
  // SYNC FILES
  // ===============================================================================================

  static async getAllSyncData(): Promise<SyncData[]> {

    // GET ALL PROJECTS IDs
    const allProjectsIDs = await this.readIndexFile(
      `${this.DATA_BASE_DIRECTORY}`
    );

    // GET PROJECT SYNC STATUS FOR EACH ID
    const allSyncStatus: SyncData[] = [];
    for (let i = 0; i < allProjectsIDs.length; i++) {
      allSyncStatus.push(
        await this.readSyncFile(allProjectsIDs[i])
      );
    }

    return allSyncStatus;
  }

  static async readSyncFile(
    id_project: string
  ): Promise<SyncData> {
    const fileData = await FileSystemService.readFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/syncStatus.json`
    );
    return JSON.parse(fileData as string) as SyncData;
  }


  static async updateSyncFile(
    syncData: SyncData
  ): Promise<void> {
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${syncData.id_project}/syncStatus.json`,
      JSON.stringify(syncData, null, 4)
    );
  }









  // ===============================================================================================
  // PICTURE FILES
  // ===============================================================================================

  static async getAllPicturesIDs(
    id_project: string
  ): Promise<string[]> {
    const idsArray = await FileSystemService.readDirectory(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/media/pictures`
    );
    return idsArray ?? [];
  }

  static async savePicture(
    id_project: string,
    id_picture: string,
    picture: string
  ) {
    await FileSystemService.writeFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/media/pictures/${id_picture}.jpg`,
      picture, 'base64'
    );
  }

  static async getPicture(
    id_project: string,
    id_picture: string,
  ): Promise<string | null> {
    return await FileSystemService.readFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/media/pictures/${id_picture}.jpg`,
      'base64',
    );
  }
}
