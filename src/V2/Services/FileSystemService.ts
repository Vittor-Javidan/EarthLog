import * as ExpoFileSystem from 'expo-file-system';

import { LTS_VERSION } from '@V2/Globals/Version';
import { ConfigDTO, CredentialDTO } from '@V2/Types/AppTypes';
import { ProjectSettings, SampleSettings, SyncData, WidgetData } from '@V2/Types/ProjectTypes';

class FileSystemService {

  /**
   * Creates a new directory if not exist.
   * @param directory directory path
   */
  static async createDirectory(o: {
    directory: string
  }): Promise<void> {
    const { directory } = o;
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (!directoryExists) {
      await ExpoFileSystem.makeDirectoryAsync(directory);
    }
  }

  /**
   * Reads directory folders and file names if exists. Return null otherwise
   * @param directory directory path
   */
  static async readDirectory(o: {
    directory: string
  }): Promise<string[] | null> {
    const { directory } = o;
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (directoryExists) {
      return await ExpoFileSystem.readDirectoryAsync(directory);
    }
    return null;
  }

  /**
   * Update or create a file for a given directory.
   * @param directory directory of the file, with file name included.
   * @param data stringfied data to be saved on the file.
   */
  static async writeFile(o: {
    directory: string,
    data: string,
    encoding: 'utf8' | 'base64'
  }): Promise<void> {
    const { directory, data, encoding } = o;
    await ExpoFileSystem.writeAsStringAsync(directory, data, { encoding });
  }

  /**
   * Reads a file. Return a string if exists, null otherwise.
   * @param directory directory of the file, with file name included.
   */
  static async readFile(o: {
    directory: string,
    encoding: 'utf8' | 'base64'
  }): Promise<string | null> {
    const { directory, encoding } = o;
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (directoryExists) {
      return await ExpoFileSystem.readAsStringAsync(directory, { encoding });
    }
    return null;
  }

  /**
   * Deletes a directory recusively if exists. If a file is specified on the delete path, only the
   * file will be deleted.
   * @param directory directory, with file name included or not.
   */
  static async delete(o: {
    directory: string
  }): Promise<void> {
    const { directory } = o;
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (directoryExists) {
      await ExpoFileSystem.deleteAsync(directory);
    }
  }
}

const APP_ROOT_PATH = `${ExpoFileSystem.documentDirectory?.slice(0, -1)}`;
export const getPath = { // TODO: Rename it to 'FilePath'
  ROOT                   : (                                     ) => `${APP_ROOT_PATH}/${LTS_VERSION}`,
  CONFIG                 : (                                     ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Config`,
  CREDENTIALS            : (                                     ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Credentials`,
  TEMP                   : (                                     ) => `${APP_ROOT_PATH}/${LTS_VERSION}/TemporaryFiles`,
  SYNC_DATA              : (                                     ) => `${APP_ROOT_PATH}/${LTS_VERSION}/SyncData`,
  PROJECTS: {
    ROOT                 : (                                     ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects`,
    PROJECT : {
      ROOT               : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}`,
      PROJECT_WIDGETS    : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/projectWidgets`,
      TEMPLATE_WIDGETS   : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/templateWidgets`,
      SAMPLES: {
        ROOT             : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/samples`,
        SAMPLE: {
          ROOT           : (id_project: string, id_sample: string) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/samples/${id_sample}`,
          SAMPLE_WIDGETS : (id_project: string, id_sample: string) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/samples/${id_sample}/sampleWidgets`,
        },
      },
      MEDIA: {
        ROOT             : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media`,
        PICTURES         : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media/pictures`,
        VIDEOS           : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media/videos`,
        AUDIOS           : (id_project: string                   ) => `${APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media/audios`,
      },
    },
  },
};

export class FOLDER_App {

  private static APP_ROOT_FOLDER = () => getPath.ROOT();

  static async init(): Promise<void> {
    await FileSystemService.createDirectory({ directory: this.APP_ROOT_FOLDER() });
    const promises = [
      FOLDER_Temp.init(),
      FOLDER_Config.init(),
      FOLDER_Credentials.init(),
      FOLDER_SyncData.init(),
      FOLDER_Projects.init(),
    ];
    await Promise.all(promises);
  }

  static async deleteFolder(): Promise<void> {
    await FileSystemService.delete({ directory: this.APP_ROOT_FOLDER() });
  }
}

export class FOLDER_Temp {

  private static TEMP_FOLDER = () => getPath.TEMP();

  static async init(): Promise<void> {
    try {
      await FileSystemService.createDirectory({ directory: this.TEMP_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  /**
   * @returns directory of created file
   */
  static async createFile(o: {
    filename: string,
    data: string,
    encoding: 'base64' | 'utf8'
  }): Promise<string> {
    const { filename, data, encoding } = o;
    const directory = `${this.TEMP_FOLDER()}/${filename}`;
    await FileSystemService.writeFile({ directory, data, encoding });
    return directory;
  }

  static async deleteFile(o: {
    directory: string
  }): Promise<void> {
    const { directory } = o;
    await FileSystemService.delete({ directory });
  }
}

export class FOLDER_Config {

  private static CONFIG_FOLDER     = () =>    getPath.CONFIG();
  private static CONFIG_FILE_PATH  = () => `${getPath.CONFIG()}/index.json`;

  static async init(): Promise<void> {
    try {
      await FileSystemService.createDirectory({ directory: this.CONFIG_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  static async get(): Promise<ConfigDTO | null> {
    const configData = await FileSystemService.readFile({ directory: this.CONFIG_FILE_PATH(), encoding: 'utf8' });
    return configData ? JSON.parse(configData) : null;
  }

  static async update(o: {
    config: ConfigDTO
  }): Promise<void> {
    const { config } = o;
    await FileSystemService.writeFile({ directory: this.CONFIG_FILE_PATH(), data: JSON.stringify(config), encoding: 'utf8' });
  }
}

export class FOLDER_Credentials {

  private static CREDENTIALS_FOLDER     = () =>    getPath.CREDENTIALS();
  private static CREDENTIALS_FILE_PATH  = () => `${getPath.CREDENTIALS()}/index.json`;

  static async init(): Promise<void> {
    try {
      await FileSystemService.createDirectory({ directory: this.CREDENTIALS_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  static async getAll(): Promise<CredentialDTO[]> {
    const credentialsData = await FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    return allCredentials;
  }

  static async create(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    const credentialsData = await FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    allCredentials.push(credential);
    await FileSystemService.writeFile({ directory: this.CREDENTIALS_FILE_PATH(), data: JSON.stringify(allCredentials), encoding: 'utf8' });
  }

  static async update(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    const credentialsData = await FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    const index = allCredentials.findIndex(c => c.credential_id === credential.credential_id);
    if (index !== -1) {
      allCredentials[index] = credential;
      await FileSystemService.writeFile({ directory: this.CREDENTIALS_FILE_PATH(), data: JSON.stringify(allCredentials), encoding: 'utf8' });
    }
  }

  static async delete(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    const credentialsData = await FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    const index = allCredentials.findIndex(c => c.credential_id === credential.credential_id);
    if (index !== -1) {
      allCredentials.splice(index, 1);
      await FileSystemService.writeFile({ directory: this.CREDENTIALS_FILE_PATH(), data: JSON.stringify(allCredentials), encoding: 'utf8' });
    }
  }
}

export class FOLDER_SyncData {

  static SYNC_DATA_FOLDER    = (                  ) =>    getPath.SYNC_DATA();
  static SYNC_DATA_FILE_PATH = (id_project: string) => `${getPath.SYNC_DATA()}/${id_project}.json`;

  static async init(): Promise<void> {
    try {
      await FileSystemService.createDirectory({ directory: this.SYNC_DATA_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  static async getAll(): Promise<SyncData[]> {
    const allSyncDataFileNames = await FileSystemService.readDirectory({ directory: this.SYNC_DATA_FOLDER() });
    if (allSyncDataFileNames) {
      const allSyncData: SyncData[] = [];
      for (let i = 0; i < allSyncDataFileNames.length; i++) {
        const fileName = allSyncDataFileNames[i];
        const data = await FileSystemService.readFile({ directory: `${this.SYNC_DATA_FOLDER()}/${fileName}`, encoding: 'utf8' });
        if (data) {
          allSyncData.push(JSON.parse(data));
        }
      }
      return allSyncData;
    }
    alert('SyncData folder do not exist.');
    throw Error('SyncData folder do not exist.');
  }

  static async get(o: {
    id_project: string
  }): Promise<SyncData> {
    const { id_project } = o;
    const data = await FileSystemService.readFile({ directory: this.SYNC_DATA_FILE_PATH(id_project), encoding: 'utf8' });
    if (data) {
      return JSON.parse(data);
    }
    alert('SyncData do not exist.');
    throw Error('SyncData do not exist.');
  }

  static async create(o: {
    syncData: SyncData
  }): Promise<void> {
    const { syncData } = o;
    const { id_project } = syncData;
    await FileSystemService.writeFile({ directory: this.SYNC_DATA_FILE_PATH(id_project), data: JSON.stringify(syncData), encoding: 'utf8' });
  }

  static async update(o: {
    syncData: SyncData
  }): Promise<void> {
    const { syncData } = o;
    const { id_project } = syncData;
    await FileSystemService.writeFile({ directory: this.SYNC_DATA_FILE_PATH(id_project), data: JSON.stringify(syncData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    await FileSystemService.delete({ directory: this.SYNC_DATA_FILE_PATH(id_project) });
  }
}

export class FOLDER_Projects {

  private static PROJECTS_FODLER            = (                  ) =>    getPath.PROJECTS.ROOT();
  private static PROJECTS_INDEX_FILE_PATH   = (                  ) => `${getPath.PROJECTS.ROOT()}/index.json`;
  private static PROJECT_FOLDER             = (id_project: string) => `${getPath.PROJECTS.PROJECT.ROOT(id_project)}`;
  private static PROJECT_SETTINGS_FILE_PATH = (id_project: string) => `${getPath.PROJECTS.PROJECT.ROOT(id_project)}/projectSettings.json`;

  static async init(): Promise<void> {
    try {
      await FileSystemService.createDirectory({ directory: this.PROJECTS_FODLER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  static async getAll(): Promise<ProjectSettings[]> {
    const allProjectsIDs: string[] = await this.getAllProjectsIDs();
    const projectSettingsArray: ProjectSettings[] = [];
    for (let i = 0; i < allProjectsIDs.length; i++) {
      const id_project = allProjectsIDs[i];
      projectSettingsArray.push(await this.get({ id_project }));
    }
    return projectSettingsArray;
  }

  static async get(o: {
    id_project: string
  }): Promise<ProjectSettings> {
    const { id_project } = o;
    const projectsSettingsData = await FileSystemService.readFile({ directory: this.PROJECT_SETTINGS_FILE_PATH(id_project), encoding: 'utf8' });
    if (projectsSettingsData) {
      return JSON.parse(projectsSettingsData);
    }
    alert(`Project do not exist. ID: ${id_project}`);
    throw Error(`Project do not exist. ID: ${id_project}`);
  }

  static async create(o: {
    projectSettings: ProjectSettings
  }): Promise<void> {
    const { projectSettings } = o;
    const { id_project } = projectSettings;
    await this.addProjectID({ id_project });
    await FileSystemService.createDirectory({ directory: this.PROJECT_FOLDER(id_project) });
    await FileSystemService.writeFile({ directory: this.PROJECT_SETTINGS_FILE_PATH(id_project), data: JSON.stringify(projectSettings), encoding: 'utf8' });
    const promises = [
      await FOLDER_ProjectWidgets.init({ id_project }),
      await FOLDER_TemplateWidgets.init({ id_project }),
      await FOLDER_Samples.init({ id_project }),
      await FOLDER_Media.init({ id_project }),
    ];
    await Promise.all(promises);
  }

  static async update(o: {
    projectSettings: ProjectSettings
  }): Promise<void> {
    const { projectSettings } = o;
    const { id_project } = projectSettings;
    await FileSystemService.writeFile({ directory: this.PROJECT_SETTINGS_FILE_PATH(id_project), data: JSON.stringify(projectSettings), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    await this.removeProjectID({ id_project });
    await FileSystemService.delete({ directory: this.PROJECT_FOLDER(id_project) });
  }

  private static async getAllProjectsIDs(): Promise<string[]> {
    const allProjectsIDsData = await FileSystemService.readFile({ directory: this.PROJECTS_INDEX_FILE_PATH(), encoding: 'utf8' });
    const allProjectsIDs: string[] = JSON.parse(allProjectsIDsData ?? '[]');
    return allProjectsIDs;
  }

  private static async addProjectID(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    const allProjectsIDs: string[] = await this.getAllProjectsIDs();
    if (!allProjectsIDs.includes(id_project)) {
      allProjectsIDs.push(id_project);
      await FileSystemService.writeFile({ directory: this.PROJECTS_INDEX_FILE_PATH(), data: JSON.stringify(allProjectsIDs), encoding: 'utf8' });
      return;
    }
    alert(`Not possible to create 2 Projects with same ID. id_project: ${id_project}`);
    throw Error(`Not possible to create 2 Projects with same ID. id_project: ${id_project}`);
  }

  private static async removeProjectID(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    const allProjectsIDs: string[] = await this.getAllProjectsIDs();
    const index = allProjectsIDs.findIndex(id => id === id_project);
    if (index !== -1) {
      allProjectsIDs.splice(index, 1);
      await FileSystemService.writeFile({ directory: this.PROJECTS_INDEX_FILE_PATH(), data: JSON.stringify(allProjectsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_ProjectWidgets {

  private static PROJECT_WIDGETS_FOLDER  = (id_project: string                   ) =>    getPath.PROJECTS.PROJECT.PROJECT_WIDGETS(id_project);
  private static WIDGETS_INDEX_FILE_PATH = (id_project: string                   ) => `${getPath.PROJECTS.PROJECT.PROJECT_WIDGETS(id_project)}/index.json`;
  private static WIDGET_DATA_FILE_PATH   = (id_project: string, id_widget: string) => `${getPath.PROJECTS.PROJECT.PROJECT_WIDGETS(id_project)}/${id_widget}.json`;

  static async init(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    try {
      await FileSystemService.createDirectory({ directory: this.PROJECT_WIDGETS_FOLDER(id_project) });
    } catch (e) {
      alert(`Project folder do not exist. id_project: ${id_project}`);
      throw Error(`Project folder do not exist. id_project: ${id_project}`);
    }
  }

  static async getAll(o: {
    id_project: string
  }): Promise<WidgetData[]> {
    const widgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    const widgetsDataArray: WidgetData[] = [];
    for (let i = 0; i < widgetsIDs.length; i++) {
      const id_widget = widgetsIDs[i];
      widgetsDataArray.push(await this.get({ ...o, id_widget}));
    }
    return widgetsDataArray;
  }

  static async get(o: {
    id_project: string
    id_widget: string
  }): Promise<WidgetData> {
    const { id_project, id_widget } = o;
    const widgetData = await FileSystemService.readFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), encoding: 'utf8' });
    if (widgetData) {
      return JSON.parse(widgetData);
    }
    alert(`Widget do not exist. ID: ${id_widget}`);
    throw Error(`Widget do not exist. ID: ${id_widget}`);
  }

  static async create(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await this.addWidgetID({ id_project, id_widget});
    await FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async update(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await this.removeWidgetID({ id_project, id_widget});
    await FileSystemService.delete({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget) });
  }

  private static async getAllWidgetsIDs(o: {
    id_project: string
  }): Promise<string[]> {
    const { id_project } = o;
    const allWidgetsIDsData = await FileSystemService.readFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), encoding: 'utf8' });
    const allWidgetsIDs: string[] = JSON.parse(allWidgetsIDsData ?? '[]');
    return allWidgetsIDs;
  }

  private static async addWidgetID(o: {
    id_project: string
    id_widget: string
  }): Promise<void> {
    const { id_project, id_widget } = o;
    const allWidgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    if (!allWidgetsIDs.includes(id_widget)) {
      allWidgetsIDs.push(id_widget);
      await FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
      return;
    }
    alert(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
    throw Error(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
  }

  private static async removeWidgetID(o: {
    id_project: string
    id_widget: string
  }): Promise<void> {
    const { id_project, id_widget } = o;
    const allWidgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    const index = allWidgetsIDs.findIndex(id => id === id_widget);
    if (index !== -1) {
      allWidgetsIDs.splice(index, 1);
      await FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_TemplateWidgets {

  private static TEMPLATE_WIDGETS_FOLDER = (id_project: string,                  ) =>    getPath.PROJECTS.PROJECT.TEMPLATE_WIDGETS(id_project);
  private static WIDGETS_INDEX_FILE_PATH = (id_project: string,                  ) => `${getPath.PROJECTS.PROJECT.TEMPLATE_WIDGETS(id_project)}/index.json`;
  private static WIDGET_DATA_FILE_PATH   = (id_project: string, id_widget: string) => `${getPath.PROJECTS.PROJECT.TEMPLATE_WIDGETS(id_project)}/${id_widget}.json`;

  static async init(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    try {
      await FileSystemService.createDirectory({ directory: this.TEMPLATE_WIDGETS_FOLDER(id_project) });
    } catch (e) {
      alert(`Project folder do not exist. id_project: ${id_project}`);
      throw Error(`Project folder do not exist. id_project: ${id_project}`);
    }
  }

  static async getAll(o: {
    id_project: string
  }): Promise<WidgetData[]> {
    const widgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    const widgetsDataArray: WidgetData[] = [];
    for (let i = 0; i < widgetsIDs.length; i++) {
      const id_widget = widgetsIDs[i];
      widgetsDataArray.push(await this.get({ ...o, id_widget}));
    }
    return widgetsDataArray;
  }

  static async get(o: {
    id_project: string
    id_widget: string
  }): Promise<WidgetData> {
    const { id_project, id_widget } = o;
    const widgetData = await FileSystemService.readFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), encoding: 'utf8' });
    if (widgetData) {
      return JSON.parse(widgetData);
    }
    alert(`Widget do not exist. ID: ${id_widget}`);
    throw Error(`Widget do not exist. ID: ${id_widget}`);
  }

  static async create(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await this.addWidgetID({ id_project, id_widget });
    await FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async update(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await this.removeWidgetID({ id_project, id_widget});
    await FileSystemService.delete({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget) });
  }

  private static async getAllWidgetsIDs(o: {
    id_project: string
  }): Promise<string[]> {
    const { id_project } = o;
    const allWidgetsIDsData = await FileSystemService.readFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), encoding: 'utf8' });
    const allWidgetsIDs: string[] = JSON.parse(allWidgetsIDsData ?? '[]');
    return allWidgetsIDs;
  }

  private static async addWidgetID(o: {
    id_project: string
    id_widget: string
  }): Promise<void> {
    const { id_project, id_widget } = o;
    const allWidgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    if (!allWidgetsIDs.includes(id_widget)) {
      allWidgetsIDs.push(id_widget);
      await FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
      return;
    }
    alert(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
    throw Error(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
  }

  private static async removeWidgetID(o: {
    id_project: string
    id_widget: string
  }): Promise<void> {
    const { id_project, id_widget } = o;
    const allWidgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    const index = allWidgetsIDs.findIndex(id => id === id_widget);
    if (index !== -1) {
      allWidgetsIDs.splice(index, 1);
      await FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_Samples {

  private static SAMPLES_FOLDER            = (id_project: string                   ) =>    getPath.PROJECTS.PROJECT.SAMPLES.ROOT(id_project);
  private static SAMPLES_INDEX_FILE_PATH   = (id_project: string                   ) => `${getPath.PROJECTS.PROJECT.SAMPLES.ROOT(id_project)}/index.json`;
  private static SAMPLE_FOLDER             = (id_project: string, id_sample: string) => `${getPath.PROJECTS.PROJECT.SAMPLES.SAMPLE.ROOT(id_project, id_sample)}`;
  private static SAMPLE_SETTINGS_FILE_PATH = (id_project: string, id_sample: string) => `${getPath.PROJECTS.PROJECT.SAMPLES.SAMPLE.ROOT(id_project, id_sample)}/sampleSettings.json`;

  static async init(o: {
    id_project: string
  }) {
    const { id_project } = o;
    try {
      await FileSystemService.createDirectory({ directory: this.SAMPLES_FOLDER(id_project) });
    } catch (e) {
      alert(`Project folder do not exist. id_project: ${id_project}`);
      throw Error(`Project folder do not exist. id_project: ${id_project}`);
    }
  }

  static async getAll(o: {
    id_project: string
  }): Promise<SampleSettings[]> {
    const { id_project } = o;
    const allSamplesIDs: string[] = await this.getAllSamplesIDs({ id_project });
    const sampleSettingsArray: SampleSettings[] = [];
    for (let i = 0; i < allSamplesIDs.length; i++) {
      const id_sample = allSamplesIDs[i];
      sampleSettingsArray.push(await this.get({ id_project, id_sample }));
    }
    return sampleSettingsArray;
  }

  static async get(o: {
    id_project: string
    id_sample: string
  }): Promise<SampleSettings> {
    const { id_project, id_sample } = o;
    const sampleSettingsData = await FileSystemService.readFile({ directory: this.SAMPLE_SETTINGS_FILE_PATH(id_project, id_sample), encoding: 'utf8' });
    if (sampleSettingsData) {
      return JSON.parse(sampleSettingsData);
    }
    alert(`Sample do not exist. ID: ${id_sample}`);
    throw Error(`Sample do not exist. ID: ${id_sample}`);
  }

  static async create(o: {
    id_project: string
    sampleSettings: SampleSettings
  }): Promise<void> {
    const { id_project, sampleSettings } = o;
    const { id_sample } = sampleSettings;
    await this.addSampleID({ id_project, id_sample });
    await FileSystemService.createDirectory({ directory: this.SAMPLE_FOLDER(id_project, id_sample) });
    await FileSystemService.writeFile({ directory: this.SAMPLE_SETTINGS_FILE_PATH(id_project, id_sample), data: JSON.stringify(sampleSettings), encoding: 'utf8' });
    await FOLDER_SampleWidgets.init({ id_project, id_sample });
  }

  static async update(o: {
    id_project: string
    sampleSettings: SampleSettings
  }): Promise<void> {
    const { id_project, sampleSettings } = o;
    const { id_sample } = sampleSettings;
    await FileSystemService.writeFile({ directory: this.SAMPLE_SETTINGS_FILE_PATH(id_project, id_sample), data: JSON.stringify(sampleSettings), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    sampleSettings: SampleSettings
  }): Promise<void> {
    const { id_project, sampleSettings } = o;
    const { id_sample } = sampleSettings;
    await this.removeSampleID({ id_project, id_sample });
    await FileSystemService.delete({ directory: this.SAMPLE_FOLDER(id_project, id_sample) });
  }

  private static async getAllSamplesIDs(o: {
    id_project: string
  }): Promise<string[]> {
    const { id_project } = o;
    const allSamplesIDsData = await FileSystemService.readFile({ directory: this.SAMPLES_INDEX_FILE_PATH(id_project), encoding: 'utf8' });
    const allSampleIDs: string[] = JSON.parse(allSamplesIDsData ?? '[]');
    return allSampleIDs;
  }

  private static async addSampleID(o: {
    id_project: string
    id_sample: string
  }): Promise<void> {
    const { id_project, id_sample } = o;
    const allSamplesIDs: string[] = await this.getAllSamplesIDs({ id_project });
    if (!allSamplesIDs.includes(id_sample)) {
      allSamplesIDs.push(id_sample);
      await FileSystemService.writeFile({ directory: this.SAMPLES_INDEX_FILE_PATH(id_project), data: JSON.stringify(allSamplesIDs), encoding: 'utf8' });
      return;
    }
    alert(`Not possible to create 2 samples with same ID. id_widget: ${id_sample}`);
    throw Error(`Not possible to create 2 samples with same ID. id_widget: ${id_sample}`);
  }

  private static async removeSampleID(o: {
    id_project: string
    id_sample: string
  }): Promise<void> {
    const { id_project, id_sample } = o;
    const allSampleIDs: string[] = await this.getAllSamplesIDs({ id_project });
    const index = allSampleIDs.findIndex(id => id === id_sample);
    if (index !== -1) {
      allSampleIDs.splice(index, 1);
      await FileSystemService.writeFile({ directory: this.SAMPLES_INDEX_FILE_PATH(id_project), data: JSON.stringify(allSampleIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_SampleWidgets {

  private static SAMPLE_WIDGETS_FOLDER   = (id_project: string, id_sample: string                   ) =>    getPath.PROJECTS.PROJECT.SAMPLES.SAMPLE.SAMPLE_WIDGETS(id_project, id_sample);
  private static WIDGETS_INDEX_FILE_PATH = (id_project: string, id_sample: string                   ) => `${getPath.PROJECTS.PROJECT.SAMPLES.SAMPLE.SAMPLE_WIDGETS(id_project, id_sample)}/index.json`;
  private static WIDGET_DATA_FILE_PATH   = (id_project: string, id_sample: string, id_widget: string) => `${getPath.PROJECTS.PROJECT.SAMPLES.SAMPLE.SAMPLE_WIDGETS(id_project, id_sample)}/${id_widget}.json`;

  static async init(o: {
    id_project: string
    id_sample: string
  }): Promise<void> {
    const { id_project, id_sample } = o;
    try {
      await FileSystemService.createDirectory({ directory: this.SAMPLE_WIDGETS_FOLDER(id_project, id_sample) });
    } catch (e) {
      alert(`Sample folder do not exist. id_project: ${id_project}, id_sample: ${id_sample}`);
      throw Error(`Sample folder do not exist. id_project: ${id_project}, id_sample: ${id_sample}`);
    }
  }

  static async getAll(o: {
    id_project: string
    id_sample: string
  }): Promise<WidgetData[]> {
    const widgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    const widgetsDataArray: WidgetData[] = [];
    for (let i = 0; i < widgetsIDs.length; i++) {
      const id_widget = widgetsIDs[i];
      widgetsDataArray.push(await this.get({ ...o, id_widget}));
    }
    return widgetsDataArray;
  }

  static async get(o: {
    id_project: string
    id_sample: string
    id_widget: string
  }): Promise<WidgetData> {
    const { id_project, id_sample, id_widget } = o;
    const widgetData = await FileSystemService.readFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget), encoding: 'utf8' });
    if (widgetData) {
      return JSON.parse(widgetData);
    }
    alert(`Widget do not exist. ID: ${id_widget}`);
    throw Error(`Widget do not exist. ID: ${id_widget}`);
  }

  static async create(o: {
    id_project: string
    id_sample: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, id_sample, widgetData } = o;
    const { id_widget } = widgetData;
    await this.addWidgetID({ id_project, id_sample, id_widget});
    await FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async update(o: {
    id_project: string
    id_sample: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, id_sample, widgetData } = o;
    const { id_widget } = widgetData;
    await FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    id_sample: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, id_sample, widgetData } = o;
    const { id_widget } = widgetData;
    await this.removeWidgetID({ id_project, id_sample, id_widget});
    await FileSystemService.delete({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget) });
  }

  private static async getAllWidgetsIDs(o: {
    id_project: string
    id_sample: string
  }): Promise<string[]> {
    const { id_project, id_sample } = o;
    const allWidgetsIDsData = await FileSystemService.readFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project, id_sample), encoding: 'utf8' });
    const allWidgetsIDs: string[] = JSON.parse(allWidgetsIDsData ?? '[]');
    return allWidgetsIDs;
  }

  private static async addWidgetID(o: {
    id_project: string
    id_sample: string
    id_widget: string
  }): Promise<void> {
    const { id_project, id_sample, id_widget } = o;
    const allWidgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    if (!allWidgetsIDs.includes(id_widget)) {
      allWidgetsIDs.push(id_widget);
      await FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project, id_sample), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
      return;
    }
    alert(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
    throw Error(`Not possible to create 2 widgets with same ID. id_widget: ${id_widget}`);
  }

  private static async removeWidgetID(o: {
    id_project: string
    id_sample: string
    id_widget: string
  }): Promise<void> {
    const { id_project, id_sample, id_widget } = o;
    const allWidgetsIDs: string[] = await this.getAllWidgetsIDs(o);
    const index = allWidgetsIDs.findIndex(id => id === id_widget);
    if (index !== -1) {
      allWidgetsIDs.splice(index, 1);
      await FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project, id_sample), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_Media {

  static MEDIA_FOLDER   = (id_project: string) => getPath.PROJECTS.PROJECT.MEDIA.ROOT(id_project);
  static PICTURE_FOLDER = (id_project: string) => getPath.PROJECTS.PROJECT.MEDIA.PICTURES(id_project);
  static VIDEO_FOLDER   = (id_project: string) => getPath.PROJECTS.PROJECT.MEDIA.VIDEOS(id_project);
  static AUDIO_FOLDER   = (id_project: string) => getPath.PROJECTS.PROJECT.MEDIA.AUDIOS(id_project);

  static async init(o: {
    id_project: string
  }) {
    const { id_project } = o;
    try {
      await FileSystemService.createDirectory({ directory: this.MEDIA_FOLDER(id_project)} );
      await FileSystemService.createDirectory({ directory: this.PICTURE_FOLDER(id_project)} );
      await FileSystemService.createDirectory({ directory: this.VIDEO_FOLDER(id_project)} );
      await FileSystemService.createDirectory({ directory: this.AUDIO_FOLDER(id_project)} );
    } catch (e) {
      alert(`Project folder do not exist. id_project: ${id_project}`);
      throw Error(`Project folder do not exist. id_project: ${id_project}`);
    }
  }

  static getPictureURL(o: {
    id_project: string
    id_picture: string
  }): string {
    const { id_project, id_picture } = o;
    return `${this.PICTURE_FOLDER(id_project)}/${id_picture}.jpg`;
  }

  static async getPicture(o: {
    id_project: string
    id_picture: string
  }): Promise<string | null> {
    const { id_project, id_picture } = o;
    return FileSystemService.readFile({ directory: `${this.PICTURE_FOLDER(id_project)}/${id_picture}.jpg`, encoding: 'base64' });
  }

  static async createPictureFromURI(o: {
    id_project: string,
    id_picture: string,
    photoUri: string,
  }) {
    const { id_project, id_picture, photoUri } = o;
    const base64Data = await FileSystemService.readFile({ directory: photoUri, encoding: 'base64' });
    if (base64Data !== null) {
      await this.createPicture({ id_project, id_picture, base64Data});
      return;
    }
    alert(`Picture not found on phones cache. PhotoURI: ${photoUri}`);
    throw Error(`Picture not found on phones cache. PhotoURI: ${photoUri}`);
  }

  static async createPicture(o: {
    id_project: string
    id_picture: string
    base64Data: string
  }): Promise<void> {
    const { id_project, id_picture, base64Data } = o;
    await FileSystemService.writeFile({ directory: `${this.PICTURE_FOLDER(id_project)}/${id_picture}.jpg`, data: base64Data, encoding: 'base64'});
  }

  static async deletePicture(o: {
    id_project: string
    id_picture: string
  }): Promise<void> {
    const { id_project, id_picture } = o;
    await FileSystemService.delete({ directory: `${this.PICTURE_FOLDER(id_project)}/${id_picture}.jpg` });
  }
}
