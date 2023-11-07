import { ConfigDTO } from '@Types/AppTypes';
import { DownloadedProjectDTO, ProjectDTO, SyncData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import IDService from './IDService';

export default class DataProcessingService {

  static processDownloadedProject(o: {
    projectDTO: DownloadedProjectDTO,
    config: ConfigDTO,
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
}
