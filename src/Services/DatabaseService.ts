import { ProjectSettings, SyncData, SampleSettings, WidgetData, InputData, Status } from '@Types/ProjectTypes';
import { FOLDER_Media, FOLDER_ProjectWidgets, FOLDER_Projects, FOLDER_SampleWidgets, FOLDER_Samples, FOLDER_SyncData, FOLDER_TemplateWidgets } from './FileSystemService';
import IDService from './IDService';

export default class DatabaseService {

  // ===============================================================================================
  // PROJECT
  // ===============================================================================================

  static async getAllProjects(): Promise<ProjectSettings[]> {
    return FOLDER_Projects.getAll();
  }

  static async createProject(o: {
    projectSettings: ProjectSettings
    syncData: SyncData
  }): Promise<void> {
    const { projectSettings, syncData } = o;
    await FOLDER_Projects.create(projectSettings);
    await FOLDER_SyncData.create(syncData);
  }

  static async readProject(
    id_project: string
  ): Promise<ProjectSettings> {
    return FOLDER_Projects.get(id_project);
  }

  static async updateProject(o: {
    projectSettings: ProjectSettings
    sync: boolean
  }): Promise<void> {
    const { projectSettings, sync } = o;
    await FOLDER_Projects.update(projectSettings);
    await Sync.project({ operation: 'updating', projectSettings, sync });
  }

  static async deleteProject(
    id_project: string
  ): Promise<void> {
    await FOLDER_Projects.delete(id_project);
    await FOLDER_SyncData.delete(id_project);
  }

  // ===============================================================================================
  // SAMPLE
  // ===============================================================================================

  static async getAllSamples(
    id_project: string
  ): Promise<SampleSettings[]> {
    return FOLDER_Samples.getAll(id_project);
  }

  static async createSample(o: {
    id_project: string,
    sampleSettings: SampleSettings,
    addTemplateWidgets: boolean,
    sync: boolean,
  }): Promise<void> {

    const { id_project, sampleSettings, addTemplateWidgets, sync } = o;
    const { id_sample } = o.sampleSettings;
    await FOLDER_Samples.create({ id_project, sampleSettings });
    await Sync.sample({ operation: 'creation', id_project, sampleSettings, sync });

    if (addTemplateWidgets) {
      const templateWidgets = await this.getAllWidgets({ path: 'template widgets', id_project });
      for (let i = 0; i < templateWidgets.length; i++) {
        if (templateWidgets[i].addToNewSamples === true) {
          const widgetData = templateWidgets[i];
          IDService.changeIDsByReference_Widget(widgetData);
          await this.createWidget({ path: 'sample widgets', id_project, id_sample, widgetData, sync });
        }
      }
    }
  }

  static async readSample(o: {
    id_project: string,
    id_sample: string
  }): Promise<SampleSettings> {
    const { id_project, id_sample } = o;
    return FOLDER_Samples.get({ id_project, id_sample });
  }

  static async updateSample(o: {
    id_project: string,
    sampleSettings: SampleSettings,
    sync: boolean,
  }): Promise<void> {
    const { id_project, sampleSettings, sync } = o;
    await FOLDER_Samples.update({ id_project, sampleSettings });
    await Sync.sample({ operation: 'updating', id_project, sampleSettings, sync });
  }

  static async deleteSample(o: {
    id_project: string,
    sampleSettings: SampleSettings,
    sync: boolean,
  }): Promise<void> {
    const { id_project, sampleSettings, sync } = o;
    await FOLDER_Samples.delete({ id_project, sampleSettings });
    await Sync.sample({ operation: 'deletion', id_project, sampleSettings, sync });
  }

  // ===============================================================================================
  // WIDGETS
  // ===============================================================================================

  static async getAllWidgets(o: {
    path: 'project widgets' | 'template widgets'
    id_project: string,
  } | {
    path: 'sample widgets'
    id_project: string
    id_sample: string
  }): Promise<WidgetData[]> {
    switch (o.path) {
      case 'project widgets': {
        const { id_project } = o;
        return FOLDER_ProjectWidgets.getAll({ id_project });
      }
      case 'template widgets': {
        const { id_project } = o;
        return FOLDER_TemplateWidgets.getAll({ id_project });
      }
      case 'sample widgets': {
        const { id_project, id_sample } = o;
        return FOLDER_SampleWidgets.getAll({ id_project, id_sample });
      }
    }
  }

  static async createWidget(o: {
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
    switch (o.path) {
      case 'project widgets': {
        const { path, id_project, widgetData, sync } = o;
        await FOLDER_ProjectWidgets.create({ id_project, widgetData });
        await Sync.widget({ operation: 'creation', path, id_project, widgetData, sync });
        break;
      }
      case 'template widgets': {
        const { path, id_project, widgetData, sync } = o;
        await FOLDER_TemplateWidgets.create({ id_project, widgetData });
        await Sync.widget({ operation: 'creation', path, id_project, widgetData, sync });
        break;
      }
      case 'sample widgets': {
        const { path, id_project, id_sample, widgetData, sync } = o;
        await FOLDER_SampleWidgets.create({ id_project, id_sample, widgetData });
        await Sync.widget({ operation: 'creation', path, id_project, id_sample, widgetData, sync });
        break;
      }
    }
  }

  static async readWidget(o: {
    path: 'project widgets' | 'template widgets'
    id_project: string,
    id_widget: string
  } | {
    path: 'sample widgets',
    id_project: string,
    id_sample: string,
    id_widget: string
  }): Promise<WidgetData> {
    switch (o.path) {
      case 'project widgets': {
        const { id_project, id_widget } = o;
        return FOLDER_ProjectWidgets.get({ id_project, id_widget });
      }
      case 'template widgets': {
        const { id_project, id_widget } = o;
        return FOLDER_TemplateWidgets.get({ id_project, id_widget });
      }
      case 'sample widgets': {
        const { id_project, id_sample, id_widget } = o;
        return FOLDER_SampleWidgets.get({ id_project, id_sample, id_widget });
      }
    }
  }

  static async updateWidget(o: {
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
    switch (o.path) {
      case 'project widgets': {
        const { path, id_project, widgetData, sync } = o;
        await FOLDER_ProjectWidgets.update({ id_project, widgetData });
        await Sync.widget({ operation: 'updating', path, id_project, widgetData, sync });
        break;
      }
      case 'template widgets': {
        const { path, id_project, widgetData, sync } = o;
        await FOLDER_TemplateWidgets.update({ id_project, widgetData });
        await Sync.widget({ operation: 'updating', path, id_project, widgetData, sync });
        break;
      }
      case 'sample widgets': {
        const { path, id_project, id_sample, widgetData, sync } = o;
        await FOLDER_SampleWidgets.update({ id_project, id_sample, widgetData });
        await Sync.widget({ operation: 'updating', path, id_project, id_sample, widgetData, sync });
        break;
      }
    }
  }

  static async deleteWidget(o: {
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
    switch (o.path) {
      case 'project widgets': {
        const { path, id_project, widgetData, sync } = o;
        await FOLDER_ProjectWidgets.delete({ id_project, widgetData });
        await Sync.widget({ operation: 'deletion', path, id_project, widgetData, sync });
        break;
      }
      case 'template widgets': {
        const { path, id_project, widgetData, sync } = o;
        await FOLDER_TemplateWidgets.delete({ id_project, widgetData });
        await Sync.widget({ operation: 'deletion', path, id_project, widgetData, sync });
        break;
      }
      case 'sample widgets': {
        const { path, id_project, id_sample, widgetData, sync } = o;
        await FOLDER_SampleWidgets.delete({ id_project, id_sample, widgetData });
        await Sync.widget({ operation: 'deletion', path, id_project, id_sample, widgetData, sync });
        break;
      }
    }
  }

  // ===============================================================================================
  // MEDIA FILES
  // ===============================================================================================

  static async deleteMediaRecursively(o: {
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

    const { id_project } = o;
    const picturesIDs: string[] = [];

    switch (o.scope) {
      case 'sample':       getMediaIDs_Sample(o.widgetArray); break;
      case 'widget':       getMediaIDs_Widget(o.widget);      break;
      case 'input':        getMediaIDs_Input(o.input);        break;
      case 'picture':      picturesIDs.push(o.id_media);     break;
    }

    const syncData = await this.readSyncFile(id_project);
    const promises = [];
    for (let i = 0; i < picturesIDs.length; i++) {
      const id_picture = picturesIDs[i];
      promises.push(FOLDER_Media.deletePicture({ id_project, id_picture }));
      DefineSyncStatus.media(picturesIDs[i], syncData.pictures, 'deletion');
    }
    await Promise.all(promises);
    await FOLDER_SyncData.update(syncData);

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
          picturesIDs.push(pictureData.id_picture);
        }
      }
    }
  }

  static async getPictureData(o: {
    id_project: string,
    id_picture: string,
  }): Promise<string | null> {
    const { id_project, id_picture } = o;
    return FOLDER_Media.getPicture({ id_project, id_picture });
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
    await FOLDER_Media.createPictureFromURI({ id_project, id_picture, photoUri });
    await Sync.picture(id_project, id_picture, 'creation');
    onSave();
  }

  static async savePicture(
    id_project: string,
    id_picture: string,
    base64Data: string,
    operation: 'creation' | 'download'
  ): Promise<void> {
    await FOLDER_Media.createPicture({ id_project, id_picture, base64Data });
    await Sync.picture(id_project, id_picture, operation);
  }

  static getPictureUri(
    id_project: string,
    id_picture: string
  ): string {
    return FOLDER_Media.getPictureURL({ id_project, id_picture });
  }


  // ===============================================================================================
  // SYNC METHODS
  // ===============================================================================================

  static async getAllSyncData(): Promise<SyncData[]> {
    return FOLDER_SyncData.getAll();
  }

  static async readSyncFile(
    id_project: string
  ): Promise<SyncData> {
    return FOLDER_SyncData.get(id_project);
  }

  static async updateSyncFile(
    syncData: SyncData
  ): Promise<void> {
    await FOLDER_SyncData.update(syncData);
  }
}

class Sync {

  static async project(o: {
    projectSettings: ProjectSettings,
    operation: 'updating',
    sync: boolean,
  }): Promise<void> {
    if (o.sync) {
      const { id_project } = o.projectSettings;
      const syncData = await FOLDER_SyncData.get(id_project);
      DefineSyncStatus.project(syncData);
      await FOLDER_SyncData.update(syncData);
    }
  }

  static async sample(o: {
    id_project: string
    sampleSettings: SampleSettings
    operation: 'creation' | 'updating' | 'deletion'
    sync: boolean
  }): Promise<void> {
    if (o.sync) {
      const { id_project, operation, sampleSettings } = o;
      const { id_sample } = sampleSettings;
      const syncData = await FOLDER_SyncData.get(id_project);
      DefineSyncStatus.project(syncData);
      DefineSyncStatus.sample(id_sample, syncData, operation);
      await FOLDER_SyncData.update(syncData);
    }
  }

  static async widget(o: {
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
    if (o.sync) {
      switch (o.path) {
        case 'project widgets': {
          const { id_project, operation, widgetData } = o;
          const { id_widget } = widgetData;
          const syncData = await FOLDER_SyncData.get(id_project);
          DefineSyncStatus.project(syncData);
          DefineSyncStatus.widget(id_widget, syncData.widgets_Project, operation);
          await FOLDER_SyncData.update(syncData);
          break;
        }
        case 'template widgets': {
          const { id_project, operation, widgetData } = o;
          const { id_widget } = widgetData;
          const syncData = await FOLDER_SyncData.get(id_project);
          DefineSyncStatus.project(syncData);
          DefineSyncStatus.widget(id_widget, syncData.widgets_Template, operation);
          await FOLDER_SyncData.update(syncData);
          break;
        }
        case 'sample widgets': {
          const { id_project, id_sample, operation, widgetData } = o;
          const { id_widget } = widgetData;
          const syncData = await FOLDER_SyncData.get(id_project);
          DefineSyncStatus.project(syncData);
          DefineSyncStatus.sample(o.id_sample, syncData, 'updating');
          DefineSyncStatus.widget(id_widget, syncData.widgets_Samples[id_sample], operation);
          await FOLDER_SyncData.update(syncData);
          break;
        }
      }
    }
  }

  static async picture(
    id_project: string,
    id_picture: string,
    operation: 'creation' | 'deletion' | 'download',
  ): Promise<void> {
    const syncData = await FOLDER_SyncData.get(id_project);
    if (operation !== 'download') {
      DefineSyncStatus.project(syncData);
    }
    DefineSyncStatus.media(id_picture, syncData.pictures, operation);
    await FOLDER_SyncData.update(syncData);
  }
}

class DefineSyncStatus {

  static project(
    syncData: SyncData
  ): void {
    switch (syncData.project) {
      case 'uploaded': syncData.project = 'modified'; break;
    }
  }

  static sample(
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

  static widget(
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

  static media(
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
