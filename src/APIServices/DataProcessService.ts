import { CredentialDTO, DateFormat, TimeFormat } from '@Types/AppTypes';
import { DownloadedProjectDTO, InputData, ProjectDTO, SampleDTO, SyncData, WidgetData } from '@Types/ProjectTypes';
import DateTimeService from '@Services/DateTimeService';
import UtilService from '@Services/UtilService';
import DatabaseService from '@Services/DatabaseService';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default class DataProcessService {

  static processDownloadedProject(
    projectDTO: DownloadedProjectDTO,
    feedback: (message: string) => void
  ) {

    const R = translations.APIServices.dataProcessService[ConfigService.config.language];

    feedback(R['Processing project:'] + ` ${projectDTO.projectSettings.name}`);
    const { rules } = projectDTO.projectSettings;

    if (rules.allowMultipleDownloads) {
      feedback(R['Changing all IDs']);
      this.changeAllIDs(projectDTO);
      projectDTO.projectSettings.status = 'new';
      delete rules.allowMultipleDownloads;
    }

    if (projectDTO.projectSettings.status !== 'uploaded') {
      feedback(R['Defining project as "new"']);
      projectDTO.projectSettings.status = 'new';
    } else {
      feedback(R['Defining project as "uploaded"']);
    }

    feedback(R['Attaching new sync data']);
    return this.attachSyncData(projectDTO);
  }

  static changeAllIDs(projectDTO: DownloadedProjectDTO): void {

    projectDTO.projectSettings.id_project = UtilService.generateUuidV4();
    changeAllWidgetsIds(projectDTO.projectWidgets);
    changeAllWidgetsIds(projectDTO.template);
    changeAllSamplesIds(projectDTO.samples);

    function changeAllSamplesIds(sampleDTO: SampleDTO[]): void {
      for (let i = 0; i < sampleDTO.length; i++) {
        sampleDTO[i].sampleSettings.id_sample = UtilService.generateUuidV4();
        changeAllWidgetsIds(sampleDTO[i].sampleWidgets);
      }
    }

    function changeAllWidgetsIds(widgetDataArray: WidgetData[]): void {
      for (let i = 0; i < widgetDataArray.length; i++) {
        widgetDataArray[i].id_widget = UtilService.generateUuidV4();
        changeAllInputsIds(widgetDataArray[i].inputs);
      }
    }

    function changeAllInputsIds(inputDataArray: InputData[]): void {
      for (let i = 0; i < inputDataArray.length; i++) {
        inputDataArray[i].id_input = UtilService.generateUuidV4();
      }
    }
  }

  static attachSyncData(projectDTO: DownloadedProjectDTO): ProjectDTO {

    const projectStatus = projectDTO.projectSettings.status;
    const newSyncStatus_Project: SyncData = {
      id_project: projectDTO.projectSettings.id_project,
      project: projectDTO.projectSettings.status,
      widgets_Project: {},
      widgets_Template: {},
      samples: {},
      widgets_Samples: {},
    };

    for (let i = 0; i < projectDTO.projectWidgets.length; i++) {
      const id_widget = projectDTO.projectWidgets[i].id_widget;
      newSyncStatus_Project.widgets_Project[id_widget] = projectStatus;
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
      }
    }

    // TYPE CONVERSION
    const newProjectDTO: ProjectDTO = {
      ...projectDTO,
      syncData: newSyncStatus_Project,
    };

    return newProjectDTO;
  }

  static attachUploadEntry(
    credential: CredentialDTO,
    projectDTO: ProjectDTO,
    options: {
      dateFormat: DateFormat,
      timeFormat: TimeFormat,
    },
    feedback: (message: string) => void
  ) {

    const R = translations.APIServices.dataProcessService[ConfigService.config.language];

    // Upload Date/Time entry ================
    feedback(R['Attaching upload date and time']);
    projectDTO.projectSettings.uploads ??= [];
    projectDTO.projectSettings.uploads.push({
      dateUTM: DateTimeService.getCurrentDateTimeUTC(),
      date:    DateTimeService.getCurrentDateTime(options),
      url:     credential.rootURL,
    });

    return projectDTO;
  }

  static async buildProjectFromDatabase(
    id_project: string,
    feedback: (message: string) => void
  ): Promise<ProjectDTO> {

    const R = translations.APIServices.dataProcessService[ConfigService.config.language];

    // GET PROJECT SETTINGS
    feedback(R['Loading project settings']);
    const projectSettings = await DatabaseService.readProject(id_project);

    // GET PROJECT WIDGETS
    feedback(R['Loading project widgets']);
    const projectWidgets = await DatabaseService.getAllWidgets_Project(id_project);

    // GET TEMPLATE WIDGETS
    feedback(R['Loading project template']);
    const templateWidgets = await DatabaseService.getAllWidgets_Template(id_project);

    // GET ALL SAMPLES
    feedback(R['Loading all sample settings']);
    const samples: SampleDTO[] = [];
    const samplesSettings = await DatabaseService.getAllSamples(id_project);
    for (let i = 0; i < samplesSettings.length; i++) {
      feedback(R['Loading sample widgets of'] + ` "${samplesSettings[i].name}".` + ` ID: ${samplesSettings[i].id_sample}`);
      samples.push({
        sampleSettings: samplesSettings[i],
        sampleWidgets: await DatabaseService.getAllWidgets_Sample(id_project, samplesSettings[i].id_sample),
      });
    }

    // GET SYNC DATA
    feedback(R['Loading project sync data']);
    const syncData = await DatabaseService.readSyncFile(id_project);

    // SYNC PROJECT SETTINGS STATUS WITH PROJECT SYNC FILE
    projectSettings.status = syncData.project;

    // ASSEMBLY PROJECT
    const projectDTO: ProjectDTO = {
      projectSettings: projectSettings,
      projectWidgets:  projectWidgets,
      template:        templateWidgets,
      samples:         samples,
      syncData:        syncData,
    };

    return projectDTO;
  }
}
