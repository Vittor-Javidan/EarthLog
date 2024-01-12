import { ConfigDTO, CredentialDTO } from '@V2/Types/AppTypes';
import { InputData, ProjectDTO, Status, SyncData } from '@V2/Types/ProjectTypes';
import DateTimeService from './DateTimeService';
import IDService from './IDService';

export default class DataProcessingService {

  static processProject_AfterDownload(o: {
    projectDTO: ProjectDTO,
    feedback: (message: string) => void
  }): { projectDTO: ProjectDTO, syncData: SyncData } {

    const { projectDTO } = o;

    this.job_ChangeAllIDs(o);
    this.job_InitialProjectStatus(o);
    const syncData = this.job_CreateSyncData(o);

    return { projectDTO, syncData };
  }

  static processProject_BeforeUpload(o: {
    config: ConfigDTO
    credential: CredentialDTO
    projectDTO: ProjectDTO
    feedback: (message: string) => void
  }): void {
    this.job_AddUploadDateAndTimeEntry(o);
  }

  static processProject_AfterUpload(o: {
    projectDTO: ProjectDTO
    syncData: SyncData
    feedback: (message: string) => void
  }) {
    this.job_DefineProjectAsUploaded(o);
  }

  private static job_ChangeAllIDs(o: {
    projectDTO: ProjectDTO
    feedback: (message: string) => void
  }) {
    const { projectDTO } = o;
    const { rules } = projectDTO.projectSettings;
    if (rules.allowMultipleDownloads) {
      o.feedback('Changing all IDs');
      IDService.changeIDsByReference_Project(projectDTO);
      projectDTO.projectSettings.status = 'new';
      delete rules.allowMultipleDownloads;
    }
  }

  private static job_InitialProjectStatus(o: {
    projectDTO: ProjectDTO
    feedback: (message: string) => void
  }) {
    const { projectDTO } = o;
    if (projectDTO.projectSettings.status !== 'uploaded') {
      o.feedback('Defining project sync status');
      projectDTO.projectSettings.status = 'new';
    }
  }

  private static job_CreateSyncData(o: {
    projectDTO: ProjectDTO
    feedback: (message: string) => void
  }): SyncData {

    const { projectDTO } = o;

    o.feedback('Creating sync data');
    const projectStatus = projectDTO.projectSettings.status;
    const newSyncStatus_Project: SyncData = {
      id_project: projectDTO.projectSettings.id_project,
      project: projectStatus,
      widgets_Project: {},
      widgets_Template: {},
      samples: {},
      widgets_Samples: {},
      pictures: {},
    };

    for (let i = 0; i < projectDTO.projectWidgets.length; i++) {
      const id_widget = projectDTO.projectWidgets[i].id_widget;
      newSyncStatus_Project.widgets_Project[id_widget] = projectStatus;
      mediaSyncStatus(projectDTO.projectWidgets[i].inputs);
    }

    for (let i = 0; i < projectDTO.template.length; i++) {
      const id_widget = projectDTO.template[i].id_widget;
      newSyncStatus_Project.widgets_Template[id_widget] = projectStatus;
    }

    for (let i = 0; i < projectDTO.samples.length; i++) {
      const id_sample = projectDTO.samples[i].sampleSettings.id_sample;
      newSyncStatus_Project.samples[id_sample] = projectStatus;

      for (let j = 0; j < projectDTO.samples[i].sampleWidgets.length; j++) {
        const id_widget = projectDTO.samples[i].sampleWidgets[j].id_widget;
        newSyncStatus_Project.widgets_Samples[id_sample] ??= {};
        newSyncStatus_Project.widgets_Samples[id_sample][id_widget] = projectStatus;
        mediaSyncStatus(projectDTO.samples[i].sampleWidgets[j].inputs);
      }
    }

    return newSyncStatus_Project;

    function mediaSyncStatus(inputDataArray: InputData[]) {
      for (let i = 0; i < inputDataArray.length; i++) {
        const inputData = inputDataArray[i];
        if (inputData.type === 'picture') {
          for (let j = 0; j < inputData.value.length; j++) {
            newSyncStatus_Project.pictures[inputData.value[j].id_picture] = 'on cloud';
          }
        }
      }
    }
  }

  private static job_AddUploadDateAndTimeEntry(o: {
    credential: CredentialDTO
    projectDTO: ProjectDTO
    config: ConfigDTO
    feedback: (message: string) => void
  }): void {
    const { projectDTO, credential, config } = o;
    o.feedback('Attaching upload date and time');
    projectDTO.projectSettings.uploads ??= [];
    projectDTO.projectSettings.uploads.push({
      url:     credential.rootURL,
      dateUTM: DateTimeService.getCurrentDateTimeUTC(),
      date:    DateTimeService.getCurrentDateTime({
        dateFormat: config.dateFormat,
        timeFormat: config.timeFormat,
      }),
    });
  }

  private static job_DefineProjectAsUploaded(o:{
    syncData: SyncData
    feedback: (message: string) => void
  }) {

    const { syncData } = o;
    syncData.project = 'uploaded';

    for (const id_widget in syncData.widgets_Project) {
      defineStatus(id_widget, syncData.widgets_Project);
    }
    for (const id_widget in syncData.widgets_Template) {
      defineStatus(id_widget, syncData.widgets_Template);
    }
    for (const id_sample in syncData.samples) {
      defineStatus(id_sample, syncData.samples);
    }
    for (const id_sample in syncData.widgets_Samples) {
      for (const id_widget in syncData.widgets_Samples[id_sample]) {
        defineStatus(id_widget, syncData.widgets_Samples[id_sample]);
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
