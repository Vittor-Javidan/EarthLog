import { ProjectDTO, ProjectSettings, SampleSettings, WidgetData, InputTypes, InputData, SampleRules, GPS_DTO, SampleDTO, SyncData } from '@V1/Types/ProjectTypes';
import DatabaseService from './DatabaseService';
import IDService from './IDService';

export default class ProjectService {

  // ===============================================================================================
  // DATA CREATION METHODS
  // ===============================================================================================

  static getDefaultProjectTemplate(options: {
    name?: string
  }): ProjectDTO {
    const id_project = IDService.generateUuidV4();
    return {
      projectSettings: {
        id_project: id_project,
        status: 'new',
        name: options.name ?? '',
        gps: {},
        sampleAlias: {
          singular: '',
          plural: '',
        },
        rules: {
          allowGPSChange: true,
          allowProjectNameChange: true,
          allowSampleAliasChange: true,
          allowProjectExport: true,
          showCreateWidgetButton_Project: true,
          showCreateWidgetButton_Template: true,
          showSampleCreationButton: true,
          addGPSToNewSamples: true,
        },
      },
      projectWidgets: [],
      template: [],
      samples: [],
      syncData: {
        id_project: id_project,
        project: 'new',
        widgets_Project: {},
        widgets_Template: {},
        samples: {},
        widgets_Samples: {},
        pictures: {},
      },
    };
  }

  static getDefaultSampleSettings(options: {
    name?: string
    rules?: SampleRules,
    gps?: GPS_DTO
  }): SampleSettings {
    return {
      id_sample: IDService.generateUuidV4(),
      name: options.name ?? '',
      gps: options.gps,
      rules: options.rules ?? {
        allowGPSChange: true,
        allowSampleNameChange: true,
        showCreateWidgetButton: true,
        showCopyWidgetFromTemplateButton: true,
      },
    };
  }

  static getWidgetData() : WidgetData {
    return {
      id_widget: IDService.generateUuidV4(),
      widgetName: '',
      inputs: [],
      rules: {
        allowWidgetNameChange: true,
        showAddInputButton: true,
        showThemeButton: true,
        showOptionsButton: true,
        showDeleteButton_Widget: true,
        showDeleteButton_Inputs: true,
        showMoveButton_Inputs: true,
        template_showOptionsButton: true,
        template_AllowCopies: true,
        template_ShowDeleteButton_Widget: true,
        template_unlockAddAutomatically: true,
      },
    };
  }

  static getInputData(inputType: InputTypes): InputData {
    switch (inputType) {
      case 'boolean': return {
        id_input: IDService.generateUuidV4(),
        label: '',
        type: 'boolean',
        value: false,
        notApplicable: true,
      };
      case 'string': return {
        id_input: IDService.generateUuidV4(),
        label: '',
        type: 'string',
        value: '',
      };
      case 'options': return {
        id_input: IDService.generateUuidV4(),
        label: '',
        type: 'options',
        value: [],
        showAddOptionButton: true,
        allowOptionLabelChange: true,
        allowOptionDeletion: true,
      };
      case 'selection': return {
        id_input: IDService.generateUuidV4(),
        label: '',
        type: 'selection',
        value: {
          options: [],
          id_selected: '',
        },
        showAddOptionButton: true,
        allowOptionLabelChange: true,
        allowOptionDeletion: true,
      };
      case 'gps': return {
        id_input: IDService.generateUuidV4(),
        label: '',
        type: 'gps',
        value: {},
      };
      case 'picture': return {
        id_input: IDService.generateUuidV4(),
        label: '',
        type: 'picture',
        value: [],
      };
    }
  }












  // ===============================================================================================
  // BASIC DATABASE METHODS
  // ===============================================================================================

  static async createProject(
    projectDTO: ProjectDTO,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
    feedback: (message: string) => void,
  ): Promise<void> {

    const {
      projectSettings,
      projectWidgets,
      template,
      samples,
      syncData,
    } = projectDTO;

    const {
      id_project,
    } = projectSettings;

    try {

      feedback('Creating project folder');
      await DatabaseService.createProject({ projectSettings, syncData });

      feedback('Saving project widgets');
      for (let i = 0; i < projectWidgets.length; i++) {
        await DatabaseService.createWidget({
          path: 'project widgets',
          id_project: id_project,
          widgetData: projectWidgets[i],
          sync: false,
        });
      }

      feedback('Saving template widgets');
      for (let i = 0; i < template.length; i++) {
        await DatabaseService.createWidget({
          path: 'template widgets',
          id_project: id_project,
          widgetData: template[i],
          sync: false,
        });
      }

      for (let i = 0; i < samples.length; i++) {

        const { sampleSettings, sampleWidgets } = samples[i];
        const { id_sample } = sampleSettings;

        feedback('Saving sample of ID:' + ` ${samples[i].sampleSettings.id_sample}`);
        await DatabaseService.createSample({
          id_project: id_project,
          sampleSettings: sampleSettings,
          addTemplateWidgets: false,
          sync: false,
        });

        for (let j = 0; j < sampleWidgets.length; j++) {
          feedback('Saving sample widget of ID:' + ` ${sampleWidgets[j].id_widget}`);
          await DatabaseService.createWidget({
            path: 'sample widgets',
            id_project: id_project,
            id_sample:  id_sample,
            widgetData: sampleWidgets[j],
            sync: false,
          });
        }
      }

      onSuccess();

    } catch (error) {
      DatabaseService.deleteProject(projectSettings.id_project);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateProject(
    options: {
      projectSettings: ProjectSettings,
      sync: boolean
    },
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.updateProject(options);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteProject(
    id_project: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.deleteProject(id_project);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async createSample(
    options: {
      id_project: string,
      sampleSettings: SampleSettings,
      addTemplateWidgets: boolean,
      sync: boolean,
    },
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.createSample(options);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteSample(options);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateSample(
    options: {
      id_project: string,
      sampleSettings: SampleSettings,
      sync: boolean
    },
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.updateSample(options);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteSample(
    options: {
      id_project: string
      sampleSettings: SampleSettings
      sync: boolean
    },
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.deleteSample(options);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async createWidget(
    options: {
      path: 'project widgets' | 'template widgets'
      id_project: string
      widgetData: WidgetData
      sync: boolean
    } | {
      path: 'sample widgets'
      id_project: string
      id_sample: string
      widgetData: WidgetData
      sync: boolean
    },
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.createWidget(options);
      onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget(options);
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateWidget(
    options: {
      path: 'project widgets' | 'template widgets'
      id_project: string,
      widgetData: WidgetData,
      sync: boolean
    } | {
      path: 'sample widgets'
      id_project: string,
      id_sample: string
      widgetData: WidgetData,
      sync: boolean
    },
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ) {
    try {
      await DatabaseService.updateWidget(options);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async deleteWidget(
    options: {
      path: 'project widgets' | 'template widgets'
      id_project: string
      widgetData: WidgetData
      sync: boolean
    } | {
      path: 'sample widgets'
      id_project: string
      id_sample: string
      widgetData: WidgetData
      sync: boolean
    },
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {
    try {
      await DatabaseService.deleteWidget(options);
      onSuccess();
    } catch (error) {
      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  static async updateSyncData(o: {
    syncData: SyncData
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    try {
      const { syncData } = o;
      await DatabaseService.updateSyncFile(syncData);
      o.onSuccess();
    } catch (error) {
      o.onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }











  // ===============================================================================================
  // ADVANCED DATABASE METHODS
  // ===============================================================================================

  static async buildProjectDTO(o: {
    id_project: string
    feedback: (message: string) => void
  }): Promise<ProjectDTO> {

    // GET PROJECT SETTINGS
    o.feedback('Loading project settings');
    const projectSettings = await DatabaseService.readProject(o.id_project);

    o.feedback('Loading project widgets');
    const projectWidgets = await DatabaseService.getAllWidgets({
      path: 'project widgets',
      id_project: o.id_project,
    });

    o.feedback('Loading project template');
    const templateWidgets = await DatabaseService.getAllWidgets({
      path: 'template widgets',
      id_project: o.id_project,
    });

    // GET ALL SAMPLES
    o.feedback('Loading all sample settings');
    const samples: SampleDTO[] = [];
    const samplesSettings = await DatabaseService.getAllSamples(o.id_project);
    for (let i = 0; i < samplesSettings.length; i++) {
      o.feedback('Loading sample widgets of' + ` "${samplesSettings[i].name}".` + ` ID: ${samplesSettings[i].id_sample}`);
      const sampleWidgets = await DatabaseService.getAllWidgets({
        path: 'sample widgets',
        id_project: o.id_project,
        id_sample: samplesSettings[i].id_sample,
      });
      samples.push({
        sampleSettings: samplesSettings[i],
        sampleWidgets: sampleWidgets,
      });
    }

    // GET SYNC DATA
    o.feedback('Loading project sync data');
    const syncData = await DatabaseService.readSyncFile(o.id_project);

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
