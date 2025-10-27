import { ConfigDTO, CredentialDTO } from '@V2/Types/AppTypes';
import { DownloadedProjectDTO, InputData, ProjectDTO, Status, SyncData } from '@V2/Types/ProjectTypes';
import { DateTimeService } from '@V2/Services_Core/DateTimeService';
import { IDService } from '@V2/Services_Core/IDService';

export class DataProcessingService {

  static processProject_AfterDownload(o: {
    downloadedProject: DownloadedProjectDTO,
    feedback: (message: string) => void
  }): { projectDTO: ProjectDTO, syncData: SyncData } {
    const { downloadedProject } = o;
    this.job_ChangeAllIDs(o);
    const syncData = this.job_CreateSyncData(o);
    return { projectDTO: downloadedProject.project, syncData };
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
    syncData: SyncData
    feedback: (message: string) => void
  }) {
    this.job_DefineProjectAsUploaded(o);
  }

  private static job_ChangeAllIDs(o: {
    downloadedProject: DownloadedProjectDTO,
    feedback: (message: string) => void
  }) {
    const { downloadedProject } = o;
    const { project } = downloadedProject;
    const { rules } = project.projectSettings;
    if (rules.allowMultipleDownloads) {
      o.feedback('Changing all IDs');
      IDService.changeIDsByReference_Project(project);
      delete rules.allowMultipleDownloads;
    }
  }

  private static job_CreateSyncData(o: {
    downloadedProject: DownloadedProjectDTO,
    feedback: (message: string) => void
  }): SyncData {

    const { downloadedProject } = o;
    const { project, projectStatus } = downloadedProject;

    o.feedback('Creating sync data');
    const newSyncStatus_Project: SyncData = {
      id_project: project.projectSettings.id_project,
      project: projectStatus,
      widgets_Project: {},
      widgets_Template: {},
      samples: {},
      widgets_Samples: {},
      pictures: {},
    };

    for (let i = 0; i < project.projectWidgets.length; i++) {
      const id_widget = project.projectWidgets[i].id_widget;
      newSyncStatus_Project.widgets_Project[id_widget] = projectStatus;
      mediaSyncStatus(project.projectWidgets[i].inputs);
    }

    for (let i = 0; i < project.template.length; i++) {
      const id_widget = project.template[i].id_widget;
      newSyncStatus_Project.widgets_Template[id_widget] = projectStatus;
    }

    for (let i = 0; i < project.samples.length; i++) {
      const id_sample = project.samples[i].sampleSettings.id_sample;
      newSyncStatus_Project.samples[id_sample] = projectStatus;

      for (let j = 0; j < project.samples[i].sampleWidgets.length; j++) {
        const id_widget = project.samples[i].sampleWidgets[j].id_widget;
        newSyncStatus_Project.widgets_Samples[id_sample] ??= {};
        newSyncStatus_Project.widgets_Samples[id_sample][id_widget] = projectStatus;
        mediaSyncStatus(project.samples[i].sampleWidgets[j].inputs);
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
