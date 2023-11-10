import { ConfigDTO, CredentialDTO } from '@Types/AppTypes';
import { DownloadedProjectDTO, ProjectDTO, Status, SyncData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import IDService from './IDService';
import DateTimeService from './DateTimeService';

export default class DataProcessingService {

  static processProject_AfterDownload(o: {
    config: ConfigDTO,
    projectDTO: DownloadedProjectDTO,
    feedback: (message: string) => void
  }): ProjectDTO {

    // =============================================================================
    // TODO: add a job to verify project integrity here, and throws error if needed.
    // =============================================================================

    this.job_ChangeAllIDs(o);
    this.job_InitialProjectSyncStatus(o);
    const syncData = this.job_CreateSyncData(o);

    return {
      ...o.projectDTO,
      syncData: syncData,
    };
  }

  static processProject_BeforeUpload(o: {
    config: ConfigDTO
    credential: CredentialDTO
    projectDTO: ProjectDTO
    feedback: (message: string) => void
  }): void {
    this.job_AddUploadEntry(o);
  }

  static processProject_AfterUpload(o: {
    config: ConfigDTO
    projectDTO: ProjectDTO
    feedback: (message: string) => void
  }) {
    this.job_DefineProjectAsUploaded(o);
  }

  private static job_ChangeAllIDs(o: {
    config: ConfigDTO,
    projectDTO: DownloadedProjectDTO
    feedback: (message: string) => void
  }) {
    const R = translations.APIServices.dataProcess[o.config.language];
    const { rules } = o.projectDTO.projectSettings;
    if (rules.allowMultipleDownloads) {
      o.feedback(R['Changing all IDs']);
      IDService.changeIDsByReference_Project(o.projectDTO);
      o.projectDTO.projectSettings.status = 'new';
      delete rules.allowMultipleDownloads;
    }
  }

  private static job_InitialProjectSyncStatus(o: {
    config: ConfigDTO,
    projectDTO: DownloadedProjectDTO
    feedback: (message: string) => void
  }) {
    if (o.projectDTO.projectSettings.status !== 'uploaded') {
      o.feedback('Defining project sync status');
      o.projectDTO.projectSettings.status = 'new';
    }
  }

  private static job_CreateSyncData(o: {
    config: ConfigDTO,
    projectDTO: DownloadedProjectDTO
    feedback: (message: string) => void
  }): SyncData {

    o.feedback('Creating sync data');
    const projectStatus = o.projectDTO.projectSettings.status;
    const newSyncStatus_Project: SyncData = {
      id_project: o.projectDTO.projectSettings.id_project,
      project: projectStatus,
      widgets_Project: {},
      widgets_Template: {},
      samples: {},
      widgets_Samples: {},
      pictures: {},
    };

    for (let i = 0; i < o.projectDTO.projectWidgets.length; i++) {
      const id_widget = o.projectDTO.projectWidgets[i].id_widget;
      newSyncStatus_Project.widgets_Project[id_widget] = projectStatus;
    }

    for (let i = 0; i < o.projectDTO.template.length; i++) {
      const id_widget = o.projectDTO.template[i].id_widget;
      newSyncStatus_Project.widgets_Template[id_widget] = projectStatus;
    }

    for (let i = 0; i < o.projectDTO.samples.length; i++) {
      const id_sample = o.projectDTO.samples[i].sampleSettings.id_sample;
      newSyncStatus_Project.samples[id_sample] = projectStatus;

      for (let j = 0; j < o.projectDTO.samples[i].sampleWidgets.length; j++) {
        const id_widget = o.projectDTO.samples[i].sampleWidgets[j].id_widget;
        newSyncStatus_Project.widgets_Samples[id_sample] ??= {};
        newSyncStatus_Project.widgets_Samples[id_sample][id_widget] = projectStatus;
      }
    }

    return newSyncStatus_Project;
  }

  private static job_AddUploadEntry(o: {
    credential: CredentialDTO
    projectDTO: ProjectDTO
    config: ConfigDTO
    feedback: (message: string) => void
  }): void {

    const R = translations.APIServices.dataProcess[o.config.language];

    // Upload Date/Time entry ================
    o.feedback(R['Attaching upload date and time']);
    o.projectDTO.projectSettings.uploads ??= [];
    o.projectDTO.projectSettings.uploads.push({
      url:     o.credential.rootURL,
      dateUTM: DateTimeService.getCurrentDateTimeUTC(),
      date:    DateTimeService.getCurrentDateTime({
        dateFormat: o.config.dateFormat,
        timeFormat: o.config.timeFormat,
      }),
    });
  }

  private static job_DefineProjectAsUploaded(o:{
    config: ConfigDTO,
    projectDTO: ProjectDTO
    feedback: (message: string) => void
  }) {

    o.projectDTO.syncData.project = 'uploaded';

    for (const id_widget in o.projectDTO.syncData.widgets_Project) {
      defineStatus(id_widget, o.projectDTO.syncData.widgets_Project);
    }
    for (const id_widget in o.projectDTO.syncData.widgets_Template) {
      defineStatus(id_widget, o.projectDTO.syncData.widgets_Template);
    }
    for (const id_sample in o.projectDTO.syncData.samples) {
      defineStatus(id_sample, o.projectDTO.syncData.samples);
    }
    for (const id_sample in o.projectDTO.syncData.widgets_Samples) {
      for (const id_widget in o.projectDTO.syncData.widgets_Samples[id_sample]) {
        defineStatus(id_widget, o.projectDTO.syncData.widgets_Samples[id_sample]);
      }
    }

    function defineStatus(
      id_element: string,
      recordList: Record<string, Status | 'deleted'>
    ) {
      switch (recordList[id_element]) {
        case 'modified':  recordList[id_element] = 'uploaded'; break;
        case 'new':       recordList[id_element] = 'uploaded'; break;
        case 'deleted':   delete recordList[id_element];       break;
      }
    }
  }
}
