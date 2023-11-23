import { ID, IDsArray, ProjectSettings, SyncData, SampleSettings, WidgetData, InputData, Status } from '@Types/ProjectTypes';
import FileSystemService, { AppPath } from './FileSystemService';
import LocalStorageService from './LocalStorageService';
import IDService from './IDService';

export default class DatabaseService {

  // ===============================================================================================
  // DATABASE
  // ===============================================================================================

  static async createDatabaseFolder(): Promise<void> {
    const databaseFolderContents = await FileSystemService.readDirectory(AppPath.DATABASE.ROOT);
    if (databaseFolderContents === null) {
      const indexFilePath = `${AppPath.DATABASE.ROOT}/index.json`;
      const indexJsonData = JSON.stringify([], null, 4);
      await FileSystemService.createDirectory(AppPath.DATABASE.ROOT);
      await FileSystemService.writeFile(indexFilePath, indexJsonData);
    }
  }

  static async deleteDatabaseFolder(): Promise<void> {
    await FileSystemService.delete(AppPath.DATABASE.ROOT);
    await this.deleteLastOpenProject();
  }

  // ===============================================================================================
  // FILE INDEXING
  // ===============================================================================================

  private static async readIndexFile(
    folderPath: string
  ): Promise<IDsArray> {
    const indexFilePath = `${folderPath}/index.json`;
    const indexDataString = await FileSystemService.readFile(indexFilePath);
    if (indexDataString !== null) {
      return JSON.parse(indexDataString);
    }
    alert(`index.json file do not exist. Path: ${folderPath}`);
    throw Error(`index.json file do not exist. Path: ${folderPath}`);
  }

  private static async updateIndexFile(
    folderPath: string,
    IDsArray: IDsArray
  ): Promise<void> {
    const indexFilePath = `${folderPath}/index.json`;
    const indexDataString = await FileSystemService.readFile(indexFilePath);
    if (indexDataString !== null) {
      const path = `${folderPath}/index.json`;
      const jsonData = JSON.stringify(IDsArray, null, 4);
      await FileSystemService.writeFile(path, jsonData);
      return;
    }
    alert(`index.json file do not exist. Path: ${folderPath}`);
    throw Error(`index.json file do not exist. Path: ${folderPath}`);
  }

  // ===============================================================================================
  // PROJECT
  // ===============================================================================================

  static async getLastOpenProject(): Promise<ID | null> {
    return await LocalStorageService.getData('LastProject');
  }

  static async saveLastOpenProject(id_project: string): Promise<void> {
    await LocalStorageService.saveData('LastProject', id_project);
  }

  static async deleteLastOpenProject(): Promise<void> {
    await LocalStorageService.removeData('LastProject');
  }

  static async getAllProjects(): Promise<ProjectSettings[]> {
    const allProjectsIDs = await this.readIndexFile(AppPath.DATABASE.ROOT);
    const allSettings: ProjectSettings[] = [];
    for (let i = 0; i < allProjectsIDs.length; i++) {
      const projectSettings = await this.readProject(allProjectsIDs[i]);
      allSettings.push(projectSettings);
    }
    return allSettings;
  }

  static async createProject(
    projectSettings: ProjectSettings
  ): Promise<void> {

    const { id_project } = projectSettings;
    const syncData: SyncData = {
      id_project: projectSettings.id_project,
      project: 'new',
      widgets_Project: {},
      widgets_Template: {},
      widgets_Samples: {},
      samples: {},
      pictures: {},
    };

    await updateIndexFile();
    await createFiles();

    async function updateIndexFile() {
      const allProjectsIDs = await DatabaseService.readIndexFile(AppPath.DATABASE.ROOT);
      if (!allProjectsIDs.includes(id_project)) {
        allProjectsIDs.push(id_project);
        await DatabaseService.updateIndexFile(AppPath.DATABASE.ROOT, allProjectsIDs);
        return;
      }
      alert(`Not possible to create 2 projects with same ID. ID: ${id_project}`);
      throw Error(`Not possible to create 2 projects with same ID. ID: ${id_project}`);
    }

    async function createFiles() {
      const projectSettingsJsonData  = JSON.stringify(projectSettings, null, 4);
      const indexJsonData            = JSON.stringify([], null, 4);
      const syncJsonData             = JSON.stringify(syncData, null, 4);
      const projectFolderPath        = `${AppPath.DATABASE.ROOT}/${id_project}`;
      const projectSettingsPath      = `${AppPath.DATABASE.ROOT}/${id_project}/projectSettings.json`;
      const projectWidgetsFolderPath = `${AppPath.DATABASE.ROOT}/${id_project}/projectWidgets`;
      const projectWidgetsIndexPath  = `${AppPath.DATABASE.ROOT}/${id_project}/projectWidgets/index.json`;
      const templateFolderPath       = `${AppPath.DATABASE.ROOT}/${id_project}/template`;
      const templateIndexPath        = `${AppPath.DATABASE.ROOT}/${id_project}/template/index.json`;
      const samplesFolderPath        = `${AppPath.DATABASE.ROOT}/${id_project}/samples`;
      const samplesIndexPath         = `${AppPath.DATABASE.ROOT}/${id_project}/samples/index.json`;
      const mediaFolderPath          = `${AppPath.DATABASE.ROOT}/${id_project}/media`;
      const picturesFolderPath       = `${AppPath.DATABASE.ROOT}/${id_project}/media/pictures`;
      const videosFolderPath         = `${AppPath.DATABASE.ROOT}/${id_project}/media/videos`;
      const audiosFolderPath         = `${AppPath.DATABASE.ROOT}/${id_project}/media/audios`;
      const syncFilePath             = `${AppPath.DATABASE.ROOT}/${id_project}/syncStatus.json`;
      await FileSystemService.createDirectory(projectFolderPath);
      await FileSystemService.createDirectory(projectWidgetsFolderPath);
      await FileSystemService.createDirectory(templateFolderPath);
      await FileSystemService.createDirectory(samplesFolderPath);
      await FileSystemService.createDirectory(mediaFolderPath);
      await FileSystemService.createDirectory(picturesFolderPath);
      await FileSystemService.createDirectory(videosFolderPath);
      await FileSystemService.createDirectory(audiosFolderPath);
      await FileSystemService.writeFile(projectSettingsPath,projectSettingsJsonData);
      await FileSystemService.writeFile(projectWidgetsIndexPath,indexJsonData);
      await FileSystemService.writeFile(templateIndexPath, indexJsonData);
      await FileSystemService.writeFile(samplesIndexPath, indexJsonData);
      await FileSystemService.writeFile(syncFilePath, syncJsonData);
    }
  }

  static async readProject(
    id_project: string
  ): Promise<ProjectSettings> {
    const path = `${AppPath.DATABASE.ROOT}/${id_project}/projectSettings.json`;
    const fileData = await FileSystemService.readFile(path);
    if (fileData !== null) {
      return JSON.parse(fileData);
    }
    alert(`Project settings file do not exist. ID: ${id_project}`);
    throw Error(`Project settings file do not exist. ID: ${id_project}`);
  }

  static async updateProject(options: {
    projectSettings: ProjectSettings
    sync: boolean
  }): Promise<void> {
    const { id_project } = options.projectSettings;
    const path = `${AppPath.DATABASE.ROOT}/${id_project}/projectSettings.json`;
    const jsonData = JSON.stringify(options.projectSettings, null, 4);
    await FileSystemService.writeFile(path, jsonData);
    await this.syncProject({ ...options, operation: 'updating' });
  }

  static async deleteProject(
    id_project: string
  ): Promise<void> {
    const allProjectsIDs = await this.readIndexFile(AppPath.DATABASE.ROOT);
    const newIDs = allProjectsIDs.filter(ID => ID !== id_project);
    await this.updateIndexFile(AppPath.DATABASE.ROOT, newIDs);
    const path = `${AppPath.DATABASE.ROOT}/${id_project}`;
    await FileSystemService.delete(path);
  }

  // ===============================================================================================
  // SAMPLE
  // ===============================================================================================

  static async getAllSamples(
    id_project: string
  ): Promise<SampleSettings[]> {

    const path = `${AppPath.DATABASE.ROOT}/${id_project}/samples`;
    const allSamplesIDs = await this.readIndexFile(path);
    return await allSampleSettings();

    async function allSampleSettings() {
      const allSettings: SampleSettings[] = [];
      for (let i = 0; i < allSamplesIDs.length; i++) {
        const sampleSettings = await DatabaseService.readSample({
          id_project: id_project,
          id_sample: allSamplesIDs[i],
        });
        allSettings.push(sampleSettings);
      }
      return allSettings;
    }
  }

  static async createSample(options: {
    id_project: string,
    sampleSettings: SampleSettings,
    addTemplateWidgets: boolean,
    sync: boolean,
  }): Promise<void> {

    const { id_sample } = options.sampleSettings;
    await updateIndexFile();
    await createFiles();
    await this.syncSample({ ...options, operation: 'creation'});
    await copyTemplateWidgets();

    async function updateIndexFile() {
      const path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples`;
      const allSamplesIDs = await DatabaseService.readIndexFile(path);
      if (!allSamplesIDs.includes(id_sample)) {
        allSamplesIDs.push(id_sample);
        await DatabaseService.updateIndexFile(path, allSamplesIDs);
        return;
      }
      alert(`Not possible to create 2 samples with same ID. id_project: ${options.id_project}, id_sample: ${id_sample}`);
      throw Error(`Not possible to create 2 samples with same ID. id_project: ${options.id_project}, id_sample: ${id_sample}`);
    }

    async function createFiles() {
      const mainFolderPath          = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${id_sample}`;
      const sampleSettingsFilePath  = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${id_sample}/sampleSettings.json`;
      const sampleWidgetsfolderPath = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${id_sample}/sampleWidgets`;
      const indexFilePath           = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${id_sample}/sampleWidgets/index.json`;
      const sampleSettingsJsonData  = JSON.stringify(options.sampleSettings, null, 4);
      const indexJsonData           = JSON.stringify([], null, 4);
      await FileSystemService.createDirectory(mainFolderPath);
      await FileSystemService.createDirectory(sampleWidgetsfolderPath);
      await FileSystemService.writeFile(sampleSettingsFilePath, sampleSettingsJsonData);
      await FileSystemService.writeFile(indexFilePath, indexJsonData);
    }

    async function copyTemplateWidgets() {
      if (options.addTemplateWidgets) {
        const templateWidgets = await DatabaseService.getAllWidgets({
          path: 'template widgets',
          id_project: options.id_project,
        });
        for (let i = 0; i < templateWidgets.length; i++) {
          if (templateWidgets[i].addToNewSamples === true) {
            IDService.changeIDsByReference_Widget(templateWidgets[i]);
            await DatabaseService.createWidget({
              path: 'sample widgets',
              id_project: options.id_project,
              id_sample: id_sample,
              widgetData: templateWidgets[i],
              sync: options.sync,
            });
          }
        }
      }
    }
  }

  static async readSample(options: {
    id_project: string,
    id_sample: string
  }): Promise<SampleSettings> {
    const path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${options.id_sample}/sampleSettings.json`;
    const fileData = await FileSystemService.readFile(path);
    return await JSON.parse(fileData as string) as SampleSettings;
  }

  static async updateSample(options: {
    id_project: string,
    sampleSettings: SampleSettings,
    sync: boolean,
  }): Promise<void> {
    const { id_sample } = options.sampleSettings;
    const path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${id_sample}/sampleSettings.json`;
    const jsonData = JSON.stringify(options.sampleSettings, null, 4);
    await FileSystemService.writeFile(path, jsonData);
    await this.syncSample({ ...options, operation: 'updating' });
  }

  static async deleteSample(options: {
    id_project: string,
    sampleSettings: SampleSettings,
    sync: boolean,
  }): Promise<void> {

    const { id_sample } = options.sampleSettings;
    const samplesFolder = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples`;
    await removeSampleIndex(samplesFolder, id_sample);
    await deleteSampleFolder(options.id_project, id_sample);
    await this.syncSample({ ...options, operation: 'deletion'});

    async function deleteSampleFolder(
      id_project: string,
      id_sample: string,
    ): Promise<void> {
      const sampleFolderPath = `${AppPath.DATABASE.ROOT}/${id_project}/samples/${id_sample}`;
      await FileSystemService.delete(sampleFolderPath);
    }

    async function removeSampleIndex(
      samplesFolder: string,
      id_sample: string,
    ): Promise<void> {
      const allSamplesIDs = await DatabaseService.readIndexFile(samplesFolder);
      const newIDs = allSamplesIDs.filter(ID => ID !== id_sample);
      await DatabaseService.updateIndexFile(samplesFolder, newIDs);
    }
  }

  // ===============================================================================================
  // WIDGETS
  // ===============================================================================================

  static async getAllWidgets(options: {
    path: 'project widgets' | 'template widgets'
    id_project: string,
  } | {
    path: 'sample widgets'
    id_project: string
    id_sample: string
  }): Promise<WidgetData[]> {

    let path;
    switch (options.path) {
      case 'project widgets':   path = `${AppPath.DATABASE.ROOT}/${options.id_project}/projectWidgets`;                             break;
      case 'template widgets':  path = `${AppPath.DATABASE.ROOT}/${options.id_project}/template`;                                   break;
      case 'sample widgets':    path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${options.id_sample}/sampleWidgets`; break;
    }
    const allWidgetsIDs = await this.readIndexFile(path);
    const allWidgetsData: WidgetData[] = [];
    for (let i = 0; i < allWidgetsIDs.length; i++) {
      const widgetData = await this.readWidget({ ...options, id_widget: allWidgetsIDs[i]});
      allWidgetsData.push(widgetData);
    }
    return allWidgetsData;
  }

  static async createWidget(options: {
    path: 'project widgets' | 'template widgets',
    id_project: string
    widgetData: WidgetData
    sync: boolean
  } | {
    path: 'sample widgets'
    id_project: string
    id_sample: string
    widgetData: WidgetData
    sync: boolean
  }): Promise<void> {

    const { id_widget } = options.widgetData;

    let path;
    switch (options.path) {
      case 'project widgets':  path = `${AppPath.DATABASE.ROOT}/${options.id_project}/projectWidgets`;                             break;
      case 'template widgets': path = `${AppPath.DATABASE.ROOT}/${options.id_project}/template`;                                   break;
      case 'sample widgets':   path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${options.id_sample}/sampleWidgets`; break;
    }

    await updateIndexFiles(path);
    await createFiles(path);
    await this.syncWidget({ ...options, operation: 'creation'});

    async function updateIndexFiles(path: string) {
      const allWidgetsIDs = await DatabaseService.readIndexFile(path);
      if (!allWidgetsIDs.includes(id_widget)) {
        allWidgetsIDs.push(id_widget);
        await DatabaseService.updateIndexFile(path, allWidgetsIDs);
        return;
      }
      alert(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
      throw Error(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
    }

    async function createFiles(path: string) {
      const mainFolderPath = `${path}/${id_widget}`;
      const filePath       = `${path}/${id_widget}/data.json`;
      const widgetJsonData = JSON.stringify(options.widgetData, null, 4);
      await FileSystemService.createDirectory(mainFolderPath);
      await FileSystemService.writeFile(filePath, widgetJsonData);
    }
  }

  static async readWidget(options: {
    path: 'project widgets' | 'template widgets'
    id_project: string,
    id_widget: string
  } | {
    path: 'sample widgets',
    id_project: string,
    id_sample: string,
    id_widget: string
  }): Promise<WidgetData> {

    let path;
    switch (options.path) {
      case 'project widgets':  path = `${AppPath.DATABASE.ROOT}/${options.id_project}/projectWidgets`;                             break;
      case 'template widgets': path = `${AppPath.DATABASE.ROOT}/${options.id_project}/template`;                                   break;
      case 'sample widgets':   path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${options.id_sample}/sampleWidgets`; break;
    }

    return await readFile(path);

    async function readFile(path: string) {
      const filePath = `${path}/${options.id_widget}/data.json`;
      const dataFile = await FileSystemService.readFile(filePath);
      if (dataFile !== null) {
        return await JSON.parse(dataFile);
      }
      alert(`Widget of id ${options.id_widget} do not exist on database`);
      throw Error(`Widget of id ${options.id_widget} do not exist on database`);
    }
  }

  static async updateWidget(options: {
    path: 'project widgets' | 'template widgets',
    id_project: string
    widgetData: WidgetData
    sync: boolean
  } | {
    path: 'sample widgets'
    id_project: string
    id_sample: string
    widgetData: WidgetData
    sync: boolean
  }): Promise<void> {

    const { id_widget } = options.widgetData;

    let path;
    switch (options.path) {
      case 'project widgets':  path = `${AppPath.DATABASE.ROOT}/${options.id_project}/projectWidgets`;                             break;
      case 'template widgets': path = `${AppPath.DATABASE.ROOT}/${options.id_project}/template`;                                   break;
      case 'sample widgets':   path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${options.id_sample}/sampleWidgets`; break;
    }

    await updateFile(path);
    await this.syncWidget({ ...options, operation: 'updating'});

    async function updateFile(path: string) {
      const filePath = `${path}/${id_widget}/data.json`;
      const jsonData = JSON.stringify(options.widgetData, null, 4);
      await FileSystemService.writeFile(filePath, jsonData);
    }
  }

  static async deleteWidget(options: {
    path: 'project widgets' | 'template widgets'
    id_project: string,
    widgetData: WidgetData
    sync: boolean
  } | {
    path: 'sample widgets'
    id_project: string,
    id_sample: string,
    widgetData: WidgetData
    sync: boolean
  }): Promise<void> {
    const { id_widget } = options.widgetData;

    let path;
    switch (options.path) {
      case 'project widgets':  path = `${AppPath.DATABASE.ROOT}/${options.id_project}/projectWidgets`;                             break;
      case 'template widgets': path = `${AppPath.DATABASE.ROOT}/${options.id_project}/template`;                                   break;
      case 'sample widgets':   path = `${AppPath.DATABASE.ROOT}/${options.id_project}/samples/${options.id_sample}/sampleWidgets`; break;
    }

    await updateIndexFile(path);
    await deleteFiles(path);
    await this.syncWidget({ ...options, operation: 'deletion' });

    async function updateIndexFile(path: string) {
      const allWidgetsIDs = await DatabaseService.readIndexFile(path);
      const newIDs = allWidgetsIDs.filter(ID => ID !== id_widget);
      await DatabaseService.updateIndexFile(path, newIDs);
    }

    async function deleteFiles(path: string) {
      const widgetFolder = `${path}/${options.widgetData}`;
      await FileSystemService.delete(widgetFolder);
    }
  }

  // ===============================================================================================
  // MEDIA FILES
  // ===============================================================================================

  static async deleteMedia(options: {
    scope: 'sample'
    id_project: string
    widgetArray: WidgetData[]
  } | {
    scope: 'widget'
    id_project: string
    widget: WidgetData
  } | {
    scope: 'input'
    id_project: string
    input: InputData
  } | {
    scope: 'picture'
    id_project: string
    id_media: string
  }): Promise<void> {

    const ids_pictures: string[] = [];

    switch (options.scope) {
      case 'sample':       getMediaIDs_Sample(options.widgetArray); break;
      case 'widget':       getMediaIDs_Widget(options.widget);      break;
      case 'input':        getMediaIDs_Input(options.input);        break;
      case 'picture':      ids_pictures.push(options.id_media);     break;
    }

    await deleteAndSync();

    function getMediaIDs_Sample(sampleWidgets: WidgetData[]) {
      for (let i = 0; i < sampleWidgets.length; i++) {
        const widgetData = sampleWidgets[i];
        getMediaIDs_Widget(widgetData);
      }
    }

    function getMediaIDs_Widget(widgetData: WidgetData) {
      for (let i = 0; i < widgetData.inputs.length; i++) {
        const inputData = widgetData.inputs[i];
        getMediaIDs_Input(inputData);
      }
    }

    function getMediaIDs_Input(input: InputData) {
      if (input.type === 'picture') {
        for (let i = 0; i < input.value.length; i++) {
          const pictureData = input.value[i];
          ids_pictures.push(pictureData.id_picture);
        }
      }
    }

    async function deleteAndSync() {

      const promises = [];
      const syncData = await DatabaseService.readSyncFile(options.id_project);

      for (let i = 0; i < ids_pictures.length; i++) {
        const path = `${AppPath.DATABASE.ROOT}/${options.id_project}/media/pictures/${ids_pictures[i]}.jpg`;
        promises.push(FileSystemService.delete(path));
        DatabaseService.defineStatus_Media(ids_pictures[i], syncData.pictures, 'deletion');
      }

      promises.push(DatabaseService.updateSyncFile(syncData));
      await Promise.all(promises);
    }
  }

  static async savePictureFromUri(
    options: {
      id_project: string,
      id_picture: string,
      photoUri: string,
    },
    onSave: () => void,
  ): Promise<void> {
    const { id_project, id_picture, photoUri } = options;
    const data = await FileSystemService.readFile(photoUri, 'base64');
    if (data !== null) {
      await this.savePicture(id_project, id_picture, data, 'creation');
      onSave();
      return;
    }
    alert(`Picture not found on phones cache. PhotoURI: ${photoUri}`);
    throw Error(`Picture not found on phones cache. PhotoURI: ${photoUri}`);
  }

  static async getPictureData(options: {
    id_project: string,
    id_picture: string,
  }): Promise<string | null> {
    const pictureUri = this.getPictureUri(options.id_project, options.id_picture);
    return await FileSystemService.readFile(pictureUri, 'base64');
  }

  static async savePicture(
    id_project: string,
    id_picture: string,
    data: string,
    operation: 'creation' | 'download'
  ): Promise<void> {
    const path = `${AppPath.DATABASE.ROOT}/${id_project}/media/pictures/${id_picture}.jpg`;
    await FileSystemService.writeFile(path, data, 'base64');
    await this.syncPicture(id_project, id_picture, operation);
  }

  static getPictureUri(
    id_project: string,
    id_picture: string
  ): string {
    return `${AppPath.DATABASE.ROOT}/${id_project}/media/pictures/${id_picture}.jpg`;
  }


  // ===============================================================================================
  // SYNC METHODS
  // ===============================================================================================

  static async getAllSyncData(): Promise<SyncData[]> {
    const allProjectsIDs = await this.readIndexFile(AppPath.DATABASE.ROOT);
    const allSyncStatus: SyncData[] = [];
    for (let i = 0; i < allProjectsIDs.length; i++) {
      const syncData = await this.readSyncFile(allProjectsIDs[i]);
      allSyncStatus.push(syncData);
    }
    return allSyncStatus;
  }

  static async readSyncFile(
    id_project: string
  ): Promise<SyncData> {
    const path = `${AppPath.DATABASE.ROOT}/${id_project}/syncStatus.json`;
    const fileData = await FileSystemService.readFile(path);
    if (fileData !== null) {
      return JSON.parse(fileData);
    }
    throw Error('sync file do not exist');
  }

  static async updateSyncFile(
    syncData: SyncData
  ): Promise<void> {
    const path = `${AppPath.DATABASE.ROOT}/${syncData.id_project}/syncStatus.json`;
    const jsonData = JSON.stringify(syncData, null, 4);
    await FileSystemService.writeFile(path, jsonData);
  }

  static async syncProject(options: {
    projectSettings: ProjectSettings,
    operation: 'updating',
    sync: boolean,
  }): Promise<void> {
    if (options.sync) {
      const { id_project } = options.projectSettings;
      const syncData = await this.readSyncFile(id_project);
      this.defineStatus_Project(syncData);
      await this.updateSyncFile(syncData);
    }
  }

  static async syncSample(options: {
    id_project: string
    sampleSettings: SampleSettings
    operation: 'creation' | 'updating' | 'deletion'
    sync: boolean
  }): Promise<void> {
    if (options.sync) {
      const { id_sample } = options.sampleSettings;
      const syncData = await this.readSyncFile(options.id_project);
      this.defineStatus_Project(syncData);
      this.defineStatus_Sample(id_sample, syncData, options.operation);
      await this.updateSyncFile(syncData);
    }
  }

  static async syncWidget(options: {
    path: 'project widgets' | 'template widgets'
    id_project: string,
    widgetData: WidgetData,
    operation: 'creation' | 'updating' | 'deletion',
    sync: boolean
  } | {
    path: 'sample widgets'
    id_project: string,
    id_sample: string,
    widgetData: WidgetData,
    operation: 'creation' | 'updating' | 'deletion',
    sync: boolean
  }): Promise<void> {
    if (options.sync) {

      const { id_widget } = options.widgetData;
      const syncData = await this.readSyncFile(options.id_project);
      this.defineStatus_Project(syncData);

      switch (options.path) {
        case 'project widgets':  this.defineStatus_Widget(id_widget, syncData.widgets_Project, options.operation);  break;
        case 'template widgets': this.defineStatus_Widget(id_widget, syncData.widgets_Template, options.operation); break;
        case 'sample widgets': {
          this.defineStatus_Sample(options.id_sample, syncData, 'updating');
          this.defineStatus_Widget(id_widget, syncData.widgets_Samples[options.id_sample], options.operation);
          break;
        }
      }

      await this.updateSyncFile(syncData);
    }
  }

  static async syncPicture(
    id_project: string,
    id_picture: string,
    operation: 'creation' | 'deletion' | 'download',
  ): Promise<void> {
    const syncData = await this.readSyncFile(id_project);
    if (operation !== 'download') {
      this.defineStatus_Project(syncData);
    }
    this.defineStatus_Media(id_picture, syncData.pictures, operation);
    await this.updateSyncFile(syncData);
  }

  /** Change project sync status by reference */
  private static defineStatus_Project(
    syncData: SyncData
  ): void {
    switch (syncData.project) {
      case 'uploaded': syncData.project = 'modified'; break;
    }
  }

  /** Change sync status by reference */
  private static defineStatus_Sample(
    id_sample: string,
    syncData: SyncData,
    operation: 'creation' | 'updating' | 'deletion',
  ): void {
    switch (operation) {

      case 'creation': {
        syncData.samples[id_sample] = 'new';
        syncData.widgets_Samples[id_sample] = {};
        break;
      }

      case 'updating': {
        switch (syncData.samples[id_sample]) {
          case 'uploaded': syncData.samples[id_sample] = 'modified'; break;
        }
        break;
      }

      case 'deletion': {

        switch (syncData.samples[id_sample]) {
          case 'modified': syncData.samples[id_sample] = 'deleted'; break;
          case 'uploaded': syncData.samples[id_sample] = 'deleted'; break;
          case 'new':      delete syncData.samples[id_sample];      break;
        }
        delete syncData.widgets_Samples[id_sample];
        break;
      }
    }
  }

  /** Change sync status by reference */
  private static defineStatus_Widget(
    id_element: string,
    recordList: Record<string, Status | 'deleted'>,
    operation: 'creation' | 'updating' | 'deletion',
  ): void {
    switch (operation) {

      case 'creation': {
        recordList[id_element] = 'new';
        break;
      }

      case 'updating': {
        switch (recordList[id_element]) {
          case 'uploaded': recordList[id_element] = 'modified'; break;
        }
        break;
      }

      case 'deletion': {
        switch (recordList[id_element]) {
          case 'modified': recordList[id_element] = 'deleted'; break;
          case 'uploaded': recordList[id_element] = 'deleted'; break;
          case 'new':      delete recordList[id_element];      break;
        }
        break;
      }
    }
  }

  private static defineStatus_Media(
    id_element: string,
    recordList: Record<string, Exclude<Status, 'modified'> | 'deleted' | 'on cloud'>,
    operation: 'creation' | 'deletion' | 'download',
  ): void {
    switch (operation) {

      case 'download': {
        recordList[id_element] = 'uploaded';
        break;
      }

      case 'creation': {
        recordList[id_element] = 'new';
        break;
      }

      case 'deletion': {

        switch (recordList[id_element]) {
          case 'on cloud': recordList[id_element] = 'deleted'; break;
          case 'uploaded': recordList[id_element] = 'deleted'; break;
          case 'new':      delete recordList[id_element];      break;
        }
        break;
      }
    }
  }
}
