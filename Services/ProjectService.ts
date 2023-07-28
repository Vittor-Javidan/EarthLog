import uuid from 'react-native-uuid';
import FileSystemService from './FileSystemService';
import LocalStorageService from './LocalStorageService';

export type ProjectDTO = {
  projectSettings: ProjectSettings
  projectWidgets: WidgetData[]
  sampleTemplate: WidgetData[]
  samples: SampleDTO[]
}
export type SampleDTO = {
  sampleSettings: SampleSettings
  sampleWidgets: WidgetData[]
}

export type WidgetData = TextWidgetData | BooleanWidgetData

export type ProjectSettings = {
  id_project: string
  name: string
  immutable: boolean
  rules: {
    allowImmutableChange?: boolean
    allowIDChange?: boolean
    allowNameChange?: boolean
    allowSampleCreation?: boolean
  }
}
export type SampleSettings = {
  id_sample: string
  name: string
  rules: {
    allowIDChange?: boolean,
    allowNameChange?: boolean,
    allowSampleErase?: boolean,
  }
}

export type BooleanWidgetData = {
  id_widget: string
  name: string
  type: 'boolean'
  value: boolean
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
  }
}
export type TextWidgetData = {
  id_widget: string
  name: string
  type: 'text'
  value: string
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
    noSpaces?: boolean
    noSpecialLetters?: boolean
  }
}

export type WidgetTypes = 'boolean' | 'text'

/*
  The index.json file has the purpose to allow the app to know how organized is the elements, since
  just small blocks of project data is loaded on each screen.
*/
export type IDsArray = string[]

export default class ProjectService {

  // ===============================================================================================
  // CONSTANTS
  // ===============================================================================================

  static DATA_BASE_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/database`;

  // ===============================================================================================
  // CACHED DATA
  // ===============================================================================================

  static lastLoadedProject: ProjectSettings = {
    id_project: '',
    immutable: true,
    name: 'ERROR: No project available',
    rules: {},
  };
  static allProjectSettings: ProjectSettings[] = [];
  static allSamplesSettings: SampleSettings[] = [];
  static allWidgetsData: WidgetData[] = [];

  // ===============================================================================================
  // APP INITIALIZATION METHODS
  // ===============================================================================================

  static async loadDatabase(): Promise<void> {
    await this.createDataBaseFolderStructure();
    await this.loadAllProjectSettings();
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
  // CACHE LOADING METHODS
  // ===============================================================================================

  static getCachedProjectSettings(id_project: string): ProjectSettings {
    for (let i = 0; i < this.allProjectSettings.length; i++) {
      if (this.allProjectSettings[i].id_project === id_project) {
        return this.allProjectSettings[i];
      }
    }
    throw Error('Project does not exist on cache');
  }

  static getCachedSampleSettings(id_sample: string): SampleSettings {
    for (let i = 0; i < this.allSamplesSettings.length; i++) {
      if (this.allSamplesSettings[i].id_sample === id_sample) {
        return this.allSamplesSettings[i];
      }
    }
    throw Error('Sample does not exist on cache');
  }

  static async getLastOpenProject(): Promise<string | null> {
    const lastProject = await LocalStorageService.getData('LastProject');
    if (lastProject === null) {
      return null;
    }
    return JSON.parse(lastProject) as string;
  }

  static async saveLastOpenProject(id_project: string): Promise<void> {

    // LOCAL STORAGE
    await LocalStorageService.saveData('LastProject', JSON.stringify(id_project));

    // MEMORY CACHE
    this.allProjectSettings.forEach(settings => {
      if (settings.id_project === id_project) {
        this.lastLoadedProject = settings;
      }
    });
  }

  static async loadLastOpenProject(): Promise<void> {

    const lastProjectID = await this.getLastOpenProject();
    if (lastProjectID === null) {
      return;
    }

    for (let i = 0; i < this.allProjectSettings.length; i++) {
      if (this.allProjectSettings[i].id_project === lastProjectID) {
        this.lastLoadedProject = this.allProjectSettings[i];
      }
    }
  }

  static async loadAllProjectSettings(): Promise<void> {

    const indexData = await this.readIndexFile(this.DATA_BASE_DIRECTORY);

    this.allProjectSettings = [];
    for (let i = 0; i < indexData.length; i++) {
      this.allProjectSettings.push(await this.readProjectSettingsFile(indexData[i]));
    }

    // LAST LOADED PROJECT
    const lastProjectID = await this.getLastOpenProject();
    if (lastProjectID === null) {
      return;
    }

    for (let i = 0; i < this.allProjectSettings.length; i++) {
      if (this.allProjectSettings[i].id_project === lastProjectID) {
        this.lastLoadedProject = this.allProjectSettings[i];
      }
    }
  }

  static async loadAllSampleSettings(id_project: string): Promise<void> {

    const indexData = await this.readIndexFile(
      `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`,
    );

    this.allSamplesSettings = [];
    for (let i = 0; i < indexData.length; i++) {
      this.allSamplesSettings.push(await this.readSampleSettingsFile(id_project, indexData[i]));
    }
  }

  static async loadAllWidgetsData(id_project: string, id_sample: string): Promise<void> {

    // ALL WIDGET DATA
    const directoryPath = `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`;
    const indexData = await this.readIndexFile(
      directoryPath
    );

    this.allWidgetsData = [];
    for (let i = 0; i < indexData.length; i++) {
      this.allWidgetsData.push(await this.readWidgetDataFile(`${directoryPath}/${indexData[i]}`));
    }
  }

  // ===============================================================================================
  // CRUD METHODS
  // ===============================================================================================

  static async createProject(
    projectDTO: ProjectDTO,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {

      // PROJECT
      const { id_project } = projectDTO.projectSettings;
      await this.createProjectFolderStructure(projectDTO.projectSettings);

      for (const projectWidgetLabel in projectDTO.projectWidgets) {
        const projectWidgetData = projectDTO.projectWidgets[projectWidgetLabel];
        await this.createWidgetFolderStructure(
          projectWidgetData,
          `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`,
        );
      }

      for (const sampleTemplatetWidgetLabel in projectDTO.sampleTemplate) {
        const sampleTemplateWidgetData = projectDTO.sampleTemplate[sampleTemplatetWidgetLabel];
        await this.createWidgetFolderStructure(
          sampleTemplateWidgetData,
          `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`,
        );
      }

      // SAMPLES
      for (let i = 0; i < projectDTO.samples.length; i++) {

        const { id_sample } = projectDTO.samples[i].sampleSettings;
        await this.createSampleFolderStructure(
          id_project,
          projectDTO.samples[i].sampleSettings
        );

        for (const sampleWidgetLabel in projectDTO.samples[i].sampleWidgets) {
          const sampleWidgetData = projectDTO.samples[i].sampleWidgets[sampleWidgetLabel];
          await this.createWidgetFolderStructure(
            sampleWidgetData,
            `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`,
          );
        }
      }

      // UPDATE PROJECTS CACHE
      await this.loadAllProjectSettings();
      onSuccess();

    } catch (error) {
      this.deleteProject(projectDTO.projectSettings.id_project);
      onError(JSON.stringify(error));
    }
  }

  static async updateProject(
    projectSettings: ProjectSettings,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await this.updateProjectSettingsFile(projectSettings);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
    }
  }

  static async deleteProject(id_project: string): Promise<void> {

    // REMOVE PROJECT INDEX
    const indexData = await this.readIndexFile(this.DATA_BASE_DIRECTORY);
    const newIndexData = indexData.filter(ID => ID !== id_project);
    await this.updateIndexFile(this.DATA_BASE_DIRECTORY, newIndexData);

    // DELETE PROJECT FOLDER
    await FileSystemService.delete(`${this.DATA_BASE_DIRECTORY}/${id_project}`);

    // UPDATE PROJECTS CACHE
    await this.loadAllProjectSettings();
  }

  static async createSample(
    id_project: string,
    sampleSettings: SampleSettings,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {

      const { id_sample } = sampleSettings;
      await this.createSampleFolderStructure(id_project, sampleSettings);
      const sampleTemplatePath = `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`;
      const sampleTemplateIDs = await this.readIndexFile(sampleTemplatePath);
      for (let i = 0; i < sampleTemplateIDs.length; i++) {

        // READ WIDGET DATA
        const widgetData = await this.readWidgetDataFile(
          `${sampleTemplatePath}/${sampleTemplateIDs[i]}`
        );

        // CREATE A WIDGET COPY INTO SAMPLE FOLDER
        widgetData.id_widget = this.generateUuidV4();
        await this.createWidgetFolderStructure(
          widgetData,
          `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`
        );
      }

      // UPDATE SAMPLES CACHE
      await this.loadAllSampleSettings(id_project);
      onSuccess();

    } catch (error) {
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
      await this.updateSampleSettingsFile(id_project, sampleSettings);
      onSuccess();
    } catch (error) {
      onError(JSON.stringify(error));
    }
  }

  static async deleteSample(id_project: string, id_sample: string): Promise<void> {

    // REMOVE SAMPLE INDEX
    const projectSamplesPath = `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`;
    const indexData = await this.readIndexFile(projectSamplesPath);
    const newIndexData = indexData.filter(ID => ID !== id_sample);
    await this.updateIndexFile(projectSamplesPath, newIndexData);

    // DELETE SAMPLE FOLDER
    await FileSystemService.delete(`${projectSamplesPath}/${id_sample}`);

    // UPDATE SAMPLE CACHE
    await this.loadAllSampleSettings(id_project);
  }

  // ===============================================================================================
  // FILES/FOLDERS READING/WRITTING METHODS
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
    await FileSystemService.writeFile(indexFilePath, JSON.stringify(IDsArray, null, 4));
  }

  private static async readProjectSettingsFile(id_project: string): Promise<ProjectSettings> {
    const settingsFilePath = `${this.DATA_BASE_DIRECTORY}/${id_project}/projectSettings.json`;
    const settingsFile = await FileSystemService.readFile(settingsFilePath);
    if (settingsFile === null) {
      throw Error('projectSettings.json file do not exist');
    }
    return JSON.parse(settingsFile) as ProjectSettings;
  }

  private static async updateProjectSettingsFile(projectSettings: ProjectSettings): Promise<void> {
    const settingsFilePath = `${this.DATA_BASE_DIRECTORY}/${projectSettings.id_project}/projectSettings.json`;
    await FileSystemService.writeFile(settingsFilePath, JSON.stringify(projectSettings, null, 4));
  }

  private static async readSampleSettingsFile(id_project: string, id_sample: string): Promise<SampleSettings> {
    const settingFilePath = `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleSettings.json`;
    const settingsFile = await FileSystemService.readFile(settingFilePath);
    if (settingsFile === null) {
      throw Error('sampleSettings.json file do not exist');
    }
    return await JSON.parse(settingsFile) as SampleSettings;
  }

  private static async updateSampleSettingsFile(id_project: string, sampleSettings: SampleSettings) {
    const settingFilePath = `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/sampleSettings.json`;
    await FileSystemService.writeFile(settingFilePath, JSON.stringify(sampleSettings, null, 4));
  }

  private static async readWidgetDataFile(directoryPath: string): Promise<WidgetData> {
    const dataFilePath = `${directoryPath}/data.json`;
    const dataFile = await FileSystemService.readFile(dataFilePath);
    if (dataFile === null) {
      throw Error('data.json file do not exist');
    }
    return await JSON.parse(dataFile) as WidgetData;
  }

  private static async updateWidgetDataFile(directoryPath: string, widgetData: WidgetData): Promise<void> {
    const dataFilePath = `${directoryPath}/data.json`;
    await FileSystemService.writeFile(dataFilePath, JSON.stringify(widgetData, null, 4));
  }

  // ===============================================================================================
  // FILES/FOLDERS CREATION METHODS
  // ===============================================================================================

  private static async createDataBaseFolderStructure(): Promise<void> {
    const databaseFolderContents = await FileSystemService.readDirectory(this.DATA_BASE_DIRECTORY);
    if (databaseFolderContents === null) {

      // MAIN FOLDER
      await FileSystemService.createDirectory(this.DATA_BASE_DIRECTORY);

      // MAIN FOLDER CONTENTS
      await FileSystemService.writeFile(
        `${this.DATA_BASE_DIRECTORY}/index.json`,
        JSON.stringify([], null, 4)
      );
    }
  }

  private static async createProjectFolderStructure(projectSettings: ProjectSettings): Promise<void> {

    // INDEXING
    const indexData = await this.readIndexFile(this.DATA_BASE_DIRECTORY);
    if (indexData.includes(projectSettings.id_project)) {
      throw Error('You cannot create 2 projects with same ID');
    }
    indexData.push(projectSettings.id_project);
    await this.updateIndexFile(this.DATA_BASE_DIRECTORY, indexData);

    // MAIN FOLDER
    const projectFolderPath = `${this.DATA_BASE_DIRECTORY}/${projectSettings.id_project}`;
    await FileSystemService.createDirectory(projectFolderPath);

    // MAIN FOLDER CONTENTS
    await FileSystemService.createDirectory(`${projectFolderPath}/projectWidgets`);
    await FileSystemService.createDirectory(`${projectFolderPath}/samples`);
    await FileSystemService.createDirectory(`${projectFolderPath}/sampleTemplate`);
    await FileSystemService.writeFile(
      `${projectFolderPath}/projectSettings.json`,
      JSON.stringify(projectSettings, null, 4),
    );
    await FileSystemService.writeFile(
      `${projectFolderPath}/projectWidgets/index.json`,
      JSON.stringify([], null, 4)
    );
    await FileSystemService.writeFile(
      `${projectFolderPath}/samples/index.json`,
      JSON.stringify([], null, 4)
    );
    await FileSystemService.writeFile(
      `${projectFolderPath}/sampleTemplate/index.json`,
      JSON.stringify([], null, 4)
    );
  }

  private static async createSampleFolderStructure(
    id_project: string,
    sampleSettings: SampleSettings,
  ): Promise<void> {

    const projectSamplesPath = `${this.DATA_BASE_DIRECTORY}/${id_project}/samples`;

    // INDEXING
    const indexData = await this.readIndexFile(projectSamplesPath);
    if (indexData.includes(sampleSettings.id_sample)) {
      throw Error('You cannot create 2 Samples with same ID');
    }
    indexData.push(sampleSettings.id_sample);
    await this.updateIndexFile(projectSamplesPath, indexData);

    // MAIN FOLDER
    const sampleFolderPath = `${projectSamplesPath}/${sampleSettings.id_sample}`;
    await FileSystemService.createDirectory(sampleFolderPath);

    // MAIN FOLDER CONTENTS
    await FileSystemService.createDirectory(`${sampleFolderPath}/sampleWidgets`);
    await FileSystemService.writeFile(
      `${sampleFolderPath}/sampleSettings.json`,
      JSON.stringify(sampleSettings, null, 4),
    );
    await FileSystemService.writeFile(
      `${sampleFolderPath}/sampleWidgets/index.json`,
      JSON.stringify([], null, 4)
    );
  }

  private static async createWidgetFolderStructure(
    widgetData: WidgetData,
    folderPath: string,
  ): Promise<void> {

    // INDEXING
    const indexData = await this.readIndexFile(folderPath);
    if (indexData.includes(widgetData.id_widget)) {
      throw Error('You cannot create 2 widget with same ID');
    }
    indexData.push(widgetData.id_widget);
    await this.updateIndexFile(folderPath, indexData);


    // MAIN FOLDER
    const widgetFolderPath = `${folderPath}/${widgetData.id_widget}`;
    await FileSystemService.createDirectory(widgetFolderPath);

    // MAIN FOLDER CONTENTS
    await FileSystemService.writeFile(
      `${widgetFolderPath}/data.json`,
      JSON.stringify(widgetData, null, 4),
    );
  }
}
