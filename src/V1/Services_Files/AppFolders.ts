import { path } from '@V1/Globals/Path'
import { ConfigDTO, CredentialDTO } from '@V1/Types/AppTypes';
import { ProjectSettings, SampleSettings, SyncData, WidgetData } from '@V1/Types/ProjectTypes';
import { FileSystemService } from '@V1/Services_Core/FileSystemService';

export class FOLDER_App {

  private static APP_ROOT_FOLDER = () => path.getDir().ROOT();

  static async init(): Promise<void> {
    FileSystemService.createDirectory({ directory: this.APP_ROOT_FOLDER() });
    const promises = [
      FOLDER_Temp.init(),
      FOLDER_Config.init(),
      FOLDER_Credentials.init(),
      FOLDER_SyncData.init(),
      FOLDER_Projects.init(),
      FOLDER_ExportedFiles.init(),
    ];
    await Promise.all(promises);
  }

  static async deleteFolder(): Promise<void> {
    FileSystemService.deleteDirectory({ directory: this.APP_ROOT_FOLDER() });
  }
}

export class FOLDER_ExportedFiles {
  private static EXPORTED_FILES_FOLDER = () => path.getDir().EXPORTED_FILES();

  static async init(): Promise<void> {
    try {
      FileSystemService.createDirectory({ directory: this.EXPORTED_FILES_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }
}

export class FOLDER_Temp {

  private static TEMP_FOLDER = () => path.getDir().TEMP();

  static async init(): Promise<void> {
    try {
      FileSystemService.createDirectory({ directory: this.TEMP_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }
}

export class FOLDER_Config {

  private static CONFIG_FOLDER     = () =>    path.getDir().CONFIG();
  private static CONFIG_FILE_PATH  = () => `${path.getDir().CONFIG()}/index.json`;

  static async init(): Promise<void> {
    try {
      FileSystemService.createDirectory({ directory: this.CONFIG_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  static async get(): Promise<ConfigDTO | null> {
    const configData = FileSystemService.readFile({ directory: this.CONFIG_FILE_PATH(), encoding: 'utf8' });
    return configData ? JSON.parse(configData) : null;
  }

  static async update(o: {
    config: ConfigDTO
  }): Promise<void> {
    const { config } = o;
    FileSystemService.writeFile({ directory: this.CONFIG_FILE_PATH(), data: JSON.stringify(config), encoding: 'utf8' });
  }
}

export class FOLDER_Credentials {

  private static CREDENTIALS_FOLDER     = () =>    path.getDir().CREDENTIALS();
  private static CREDENTIALS_FILE_PATH  = () => `${path.getDir().CREDENTIALS()}/index.json`;

  static async init(): Promise<void> {
    try {
      FileSystemService.createDirectory({ directory: this.CREDENTIALS_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  static async getAll(): Promise<CredentialDTO[]> {
    const credentialsData = FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    return allCredentials;
  }

  static async create(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    const credentialsData = FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    allCredentials.push(credential);
    FileSystemService.writeFile({ directory: this.CREDENTIALS_FILE_PATH(), data: JSON.stringify(allCredentials), encoding: 'utf8' });
  }

  static async update(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    const credentialsData = FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    const index = allCredentials.findIndex(c => c.credential_id === credential.credential_id);
    if (index !== -1) {
      allCredentials[index] = credential;
      FileSystemService.writeFile({ directory: this.CREDENTIALS_FILE_PATH(), data: JSON.stringify(allCredentials), encoding: 'utf8' });
    }
  }

  static async delete(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    const credentialsData = FileSystemService.readFile({ directory: this.CREDENTIALS_FILE_PATH(), encoding: 'utf8' });
    const allCredentials: CredentialDTO[] = JSON.parse(credentialsData ?? '[]');
    const index = allCredentials.findIndex(c => c.credential_id === credential.credential_id);
    if (index !== -1) {
      allCredentials.splice(index, 1);
      FileSystemService.writeFile({ directory: this.CREDENTIALS_FILE_PATH(), data: JSON.stringify(allCredentials), encoding: 'utf8' });
    }
  }
}

export class FOLDER_SyncData {

  static SYNC_DATA_FOLDER    = (                  ) =>    path.getDir().SYNC_DATA();
  static SYNC_DATA_FILE_PATH = (id_project: string) => `${path.getDir().SYNC_DATA()}/${id_project}.json`;

  static async init(): Promise<void> {
    try {
      FileSystemService.createDirectory({ directory: this.SYNC_DATA_FOLDER() });
    } catch (e) {
      alert('App folder do not exist.');
      throw Error('App folder do not exist.');
    }
  }

  static async getAll(): Promise<SyncData[]> {
    const allSyncDataFileNames = FileSystemService.readDirectory({ directory: this.SYNC_DATA_FOLDER() });
    if (allSyncDataFileNames) {
      const allSyncData: SyncData[] = [];
      for (let i = 0; i < allSyncDataFileNames.length; i++) {
        const fileName = allSyncDataFileNames[i];
        const data = FileSystemService.readFile({ directory: `${this.SYNC_DATA_FOLDER()}/${fileName}`, encoding: 'utf8' });
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
    const data = FileSystemService.readFile({ directory: this.SYNC_DATA_FILE_PATH(id_project), encoding: 'utf8' });
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
    FileSystemService.writeFile({ directory: this.SYNC_DATA_FILE_PATH(id_project), data: JSON.stringify(syncData), encoding: 'utf8' });
  }

  static async update(o: {
    syncData: SyncData
  }): Promise<void> {
    const { syncData } = o;
    const { id_project } = syncData;
    FileSystemService.writeFile({ directory: this.SYNC_DATA_FILE_PATH(id_project), data: JSON.stringify(syncData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    FileSystemService.deleteFile({ directory: this.SYNC_DATA_FILE_PATH(id_project) });
  }
}

export class FOLDER_Projects {

  private static PROJECTS_FODLER            = (                  ) =>    path.getDir().PROJECTS.ROOT();
  private static PROJECTS_INDEX_FILE_PATH   = (                  ) => `${path.getDir().PROJECTS.ROOT()}/index.json`;
  private static PROJECT_FOLDER             = (id_project: string) => `${path.getDir().PROJECTS.PROJECT.ROOT(id_project)}`;
  private static PROJECT_SETTINGS_FILE_PATH = (id_project: string) => `${path.getDir().PROJECTS.PROJECT.ROOT(id_project)}/projectSettings.json`;

  static async init(): Promise<void> {
    try {
      FileSystemService.createDirectory({ directory: this.PROJECTS_FODLER() });
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
    const projectsSettingsData = FileSystemService.readFile({ directory: this.PROJECT_SETTINGS_FILE_PATH(id_project), encoding: 'utf8' });
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
    FileSystemService.createDirectory({ directory: this.PROJECT_FOLDER(id_project) });
    FileSystemService.writeFile({ directory: this.PROJECT_SETTINGS_FILE_PATH(id_project), data: JSON.stringify(projectSettings), encoding: 'utf8' });
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
    FileSystemService.writeFile({ directory: this.PROJECT_SETTINGS_FILE_PATH(id_project), data: JSON.stringify(projectSettings), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    await this.removeProjectID({ id_project });
    FileSystemService.deleteDirectory({ directory: this.PROJECT_FOLDER(id_project) });
  }

  private static async getAllProjectsIDs(): Promise<string[]> {
    const allProjectsIDsData = FileSystemService.readFile({ directory: this.PROJECTS_INDEX_FILE_PATH(), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.PROJECTS_INDEX_FILE_PATH(), data: JSON.stringify(allProjectsIDs), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.PROJECTS_INDEX_FILE_PATH(), data: JSON.stringify(allProjectsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_ProjectWidgets {

  private static PROJECT_WIDGETS_FOLDER  = (id_project: string                   ) =>    path.getDir().PROJECTS.PROJECT.PROJECT_WIDGETS(id_project);
  private static WIDGETS_INDEX_FILE_PATH = (id_project: string                   ) => `${path.getDir().PROJECTS.PROJECT.PROJECT_WIDGETS(id_project)}/index.json`;
  private static WIDGET_DATA_FILE_PATH   = (id_project: string, id_widget: string) => `${path.getDir().PROJECTS.PROJECT.PROJECT_WIDGETS(id_project)}/${id_widget}.json`;

  static async init(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    try {
      FileSystemService.createDirectory({ directory: this.PROJECT_WIDGETS_FOLDER(id_project) });
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
    const widgetData = FileSystemService.readFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), encoding: 'utf8' });
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
    FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async update(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await this.removeWidgetID({ id_project, id_widget});
    FileSystemService.deleteFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget) });
  }

  private static async getAllWidgetsIDs(o: {
    id_project: string
  }): Promise<string[]> {
    const { id_project } = o;
    const allWidgetsIDsData = FileSystemService.readFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_TemplateWidgets {

  private static TEMPLATE_WIDGETS_FOLDER = (id_project: string,                  ) =>    path.getDir().PROJECTS.PROJECT.TEMPLATE_WIDGETS(id_project);
  private static WIDGETS_INDEX_FILE_PATH = (id_project: string,                  ) => `${path.getDir().PROJECTS.PROJECT.TEMPLATE_WIDGETS(id_project)}/index.json`;
  private static WIDGET_DATA_FILE_PATH   = (id_project: string, id_widget: string) => `${path.getDir().PROJECTS.PROJECT.TEMPLATE_WIDGETS(id_project)}/${id_widget}.json`;

  static async init(o: {
    id_project: string
  }): Promise<void> {
    const { id_project } = o;
    try {
      FileSystemService.createDirectory({ directory: this.TEMPLATE_WIDGETS_FOLDER(id_project) });
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
    const widgetData = FileSystemService.readFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), encoding: 'utf8' });
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
    FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async update(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, widgetData } = o;
    const { id_widget } = widgetData;
    await this.removeWidgetID({ id_project, id_widget});
    FileSystemService.deleteFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_widget) });
  }

  private static async getAllWidgetsIDs(o: {
    id_project: string
  }): Promise<string[]> {
    const { id_project } = o;
    const allWidgetsIDsData = FileSystemService.readFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_Samples {

  private static SAMPLES_FOLDER            = (id_project: string                   ) =>    path.getDir().PROJECTS.PROJECT.SAMPLES.ROOT(id_project);
  private static SAMPLES_INDEX_FILE_PATH   = (id_project: string                   ) => `${path.getDir().PROJECTS.PROJECT.SAMPLES.ROOT(id_project)}/index.json`;
  private static SAMPLE_FOLDER             = (id_project: string, id_sample: string) => `${path.getDir().PROJECTS.PROJECT.SAMPLES.SAMPLE.ROOT(id_project, id_sample)}`;
  private static SAMPLE_SETTINGS_FILE_PATH = (id_project: string, id_sample: string) => `${path.getDir().PROJECTS.PROJECT.SAMPLES.SAMPLE.ROOT(id_project, id_sample)}/sampleSettings.json`;

  static async init(o: {
    id_project: string
  }) {
    const { id_project } = o;
    try {
      FileSystemService.createDirectory({ directory: this.SAMPLES_FOLDER(id_project) });
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
    const sampleSettingsData = FileSystemService.readFile({ directory: this.SAMPLE_SETTINGS_FILE_PATH(id_project, id_sample), encoding: 'utf8' });
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
    FileSystemService.createDirectory({ directory: this.SAMPLE_FOLDER(id_project, id_sample) });
    FileSystemService.writeFile({ directory: this.SAMPLE_SETTINGS_FILE_PATH(id_project, id_sample), data: JSON.stringify(sampleSettings), encoding: 'utf8' });
    await FOLDER_SampleWidgets.init({ id_project, id_sample });
  }

  static async update(o: {
    id_project: string
    sampleSettings: SampleSettings
  }): Promise<void> {
    const { id_project, sampleSettings } = o;
    const { id_sample } = sampleSettings;
    FileSystemService.writeFile({ directory: this.SAMPLE_SETTINGS_FILE_PATH(id_project, id_sample), data: JSON.stringify(sampleSettings), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    sampleSettings: SampleSettings
  }): Promise<void> {
    const { id_project, sampleSettings } = o;
    const { id_sample } = sampleSettings;
    await this.removeSampleID({ id_project, id_sample });
    FileSystemService.deleteDirectory({ directory: this.SAMPLE_FOLDER(id_project, id_sample) });
  }

  private static async getAllSamplesIDs(o: {
    id_project: string
  }): Promise<string[]> {
    const { id_project } = o;
    const allSamplesIDsData = FileSystemService.readFile({ directory: this.SAMPLES_INDEX_FILE_PATH(id_project), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.SAMPLES_INDEX_FILE_PATH(id_project), data: JSON.stringify(allSamplesIDs), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.SAMPLES_INDEX_FILE_PATH(id_project), data: JSON.stringify(allSampleIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_SampleWidgets {

  private static SAMPLE_WIDGETS_FOLDER   = (id_project: string, id_sample: string                   ) =>    path.getDir().PROJECTS.PROJECT.SAMPLES.SAMPLE.SAMPLE_WIDGETS(id_project, id_sample);
  private static WIDGETS_INDEX_FILE_PATH = (id_project: string, id_sample: string                   ) => `${path.getDir().PROJECTS.PROJECT.SAMPLES.SAMPLE.SAMPLE_WIDGETS(id_project, id_sample)}/index.json`;
  private static WIDGET_DATA_FILE_PATH   = (id_project: string, id_sample: string, id_widget: string) => `${path.getDir().PROJECTS.PROJECT.SAMPLES.SAMPLE.SAMPLE_WIDGETS(id_project, id_sample)}/${id_widget}.json`;

  static async init(o: {
    id_project: string
    id_sample: string
  }): Promise<void> {
    const { id_project, id_sample } = o;
    try {
      FileSystemService.createDirectory({ directory: this.SAMPLE_WIDGETS_FOLDER(id_project, id_sample) });
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
    const widgetData = FileSystemService.readFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget), encoding: 'utf8' });
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
    FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async update(o: {
    id_project: string
    id_sample: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, id_sample, widgetData } = o;
    const { id_widget } = widgetData;
    FileSystemService.writeFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget), data: JSON.stringify(widgetData), encoding: 'utf8' });
  }

  static async delete(o: {
    id_project: string
    id_sample: string
    widgetData: WidgetData
  }): Promise<void> {
    const { id_project, id_sample, widgetData } = o;
    const { id_widget } = widgetData;
    await this.removeWidgetID({ id_project, id_sample, id_widget});
    FileSystemService.deleteFile({ directory: this.WIDGET_DATA_FILE_PATH(id_project, id_sample, id_widget) });
  }

  private static async getAllWidgetsIDs(o: {
    id_project: string
    id_sample: string
  }): Promise<string[]> {
    const { id_project, id_sample } = o;
    const allWidgetsIDsData = FileSystemService.readFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project, id_sample), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project, id_sample), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
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
      FileSystemService.writeFile({ directory: this.WIDGETS_INDEX_FILE_PATH(id_project, id_sample), data: JSON.stringify(allWidgetsIDs), encoding: 'utf8' });
    }
  }
}

export class FOLDER_Media {

  static MEDIA_FOLDER   = (id_project: string) => path.getDir().PROJECTS.PROJECT.MEDIA.ROOT(id_project);
  static PICTURE_FOLDER = (id_project: string) => path.getDir().PROJECTS.PROJECT.MEDIA.PICTURES(id_project);
  static VIDEO_FOLDER   = (id_project: string) => path.getDir().PROJECTS.PROJECT.MEDIA.VIDEOS(id_project);
  static AUDIO_FOLDER   = (id_project: string) => path.getDir().PROJECTS.PROJECT.MEDIA.AUDIOS(id_project);

  static async init(o: {
    id_project: string
  }) {
    const { id_project } = o;
    try {
      FileSystemService.createDirectory({ directory: this.MEDIA_FOLDER(id_project)} );
      FileSystemService.createDirectory({ directory: this.PICTURE_FOLDER(id_project)} );
      FileSystemService.createDirectory({ directory: this.VIDEO_FOLDER(id_project)} );
      FileSystemService.createDirectory({ directory: this.AUDIO_FOLDER(id_project)} );
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
    const PICTURE_FILE_PATH = `${this.PICTURE_FOLDER(id_project)}/${id_picture}.jpg`;
    return FileSystemService.readFile({ directory: PICTURE_FILE_PATH, encoding: 'base64' });
  }

  static async createPictureFromURI(o: {
    id_project: string,
    id_picture: string,
    photoUri: string,
  }) {
    const { id_project, id_picture, photoUri } = o;
    const base64Data = FileSystemService.readFile({ directory: photoUri, encoding: 'base64' });
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
    const PICTURE_FILE_PATH = `${this.PICTURE_FOLDER(id_project)}/${id_picture}.jpg`;
    FileSystemService.writeFile({ directory: PICTURE_FILE_PATH, data: base64Data, encoding: 'base64'});
  }

  static async deletePicture(o: {
    id_project: string
    id_picture: string
  }): Promise<void> {
    const { id_project, id_picture } = o;
    const PICTURE_FILE_PATH = `${this.PICTURE_FOLDER(id_project)}/${id_picture}.jpg`;
    FileSystemService.deleteFile({ directory: PICTURE_FILE_PATH });
  }
}
