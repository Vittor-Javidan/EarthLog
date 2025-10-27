import { ProjectDTO, ProjectSettings, SampleSettings, WidgetData, InputTypes, InputData, SampleRules, GPS_DTO, SampleDTO, SyncData } from '@V1/Types/ProjectTypes';
import { IDService } from '@V1/Services_Core/IDService';
import { DatabaseService } from './DatabaseService';

export class ProjectService {

  // ===============================================================================================
  // DATA CREATION METHODS
  // ===============================================================================================

  static getDefaultSyncData(o: {
    id_project: string
  }): SyncData {
    const { id_project } = o;
    return {
      id_project: id_project,
      project: 'new',
      widgets_Project: {},
      widgets_Template: {},
      samples: {},
      widgets_Samples: {},
      pictures: {},
    };
  }

  static getDefaultProjectTemplate(o: {
    name?: string
  }): ProjectDTO {
    const { name } = o;
    const id_project = IDService.generateUuidV4();
    return {
      projectSettings: {
        id_project: id_project,
        status: 'new',
        name: name ?? '',
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
    };
  }

  static getDefaultSampleSettings(o: {
    name?: string
    rules?: SampleRules,
    gps?: GPS_DTO
  }): SampleSettings {
    const { name, rules, gps } = o;
    return {
      id_sample: IDService.generateUuidV4(),
      name: name ?? '',
      gps: gps,
      rules: rules ?? {
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

  static getInputData(o: {
    inputType: InputTypes
  }): InputData {
    const { inputType } = o;
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

  static async createProject(o: {
    projectDTO: ProjectDTO,
    syncData: SyncData
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
    feedback: (message: string) => void,
  }): Promise<void> {

    const { projectDTO, syncData } = o;

    const {
      projectSettings,
      projectWidgets,
      template,
      samples,
    } = projectDTO;

    const {
      id_project,
    } = projectSettings;

    try {

      o.feedback('Creating project folder');
      await DatabaseService.createProject({ projectSettings, syncData });

      o.feedback('Saving project widgets');
      for (let i = 0; i < projectWidgets.length; i++) {
        await DatabaseService.createWidget({
          path: 'project widgets',
          id_project: id_project,
          widgetData: projectWidgets[i],
          sync: false,
        });
      }

      o.feedback('Saving template widgets');
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

        o.feedback('Saving sample of ID:' + ` ${samples[i].sampleSettings.id_sample}`);
        await DatabaseService.createSample({
          id_project: id_project,
          sampleSettings: sampleSettings,
          addTemplateWidgets: false,
          sync: false,
        });

        for (let j = 0; j < sampleWidgets.length; j++) {
          o.feedback('Saving sample widget of ID:' + ` ${sampleWidgets[j].id_widget}`);
          await DatabaseService.createWidget({
            path: 'sample widgets',
            id_project: id_project,
            id_sample:  id_sample,
            widgetData: sampleWidgets[j],
            sync: false,
          });
        }
      }

      o.onSuccess();

    } catch (error) {
      DatabaseService.deleteProject({ id_project });
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async updateProject(o: {
    projectSettings: ProjectSettings,
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    const { projectSettings, sync } = o;
    try {
      await DatabaseService.updateProject({ projectSettings, sync });
      o.onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async deleteProject(o: {
    id_project: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    const { id_project } = o;
    try {
      await DatabaseService.deleteProject({ id_project });
      o.onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async createSample(o: {
    id_project: string,
    sampleSettings: SampleSettings,
    addTemplateWidgets: boolean,
    sync: boolean,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    const { id_project, sampleSettings, sync, addTemplateWidgets } = o;
    try {
      await DatabaseService.createSample({ id_project, sampleSettings, sync, addTemplateWidgets });
      o.onSuccess();
    } catch (error) {
      await DatabaseService.deleteSample({ id_project, sampleSettings, sync });
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async updateSample(o: {
    id_project: string,
    sampleSettings: SampleSettings,
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    const { id_project, sampleSettings, sync } = o;
    try {
      await DatabaseService.updateSample({ id_project, sampleSettings, sync });
      o.onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async deleteSample(o: {
    id_project: string
    sampleSettings: SampleSettings
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    const { id_project, sampleSettings, sync } = o;
    try {
      await DatabaseService.deleteSample({ id_project, sampleSettings, sync });
      o.onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async createWidget(o: {
    path: 'project widgets' | 'template widgets'
    id_project: string
    widgetData: WidgetData
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  } | {
    path: 'sample widgets'
    id_project: string
    id_sample: string
    widgetData: WidgetData
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    try {
      await DatabaseService.createWidget(o);
      o.onSuccess();
    } catch (error) {
      await DatabaseService.deleteWidget(o);
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async updateWidget(o: {
    path: 'project widgets' | 'template widgets'
    id_project: string,
    widgetData: WidgetData,
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  } | {
    path: 'sample widgets'
    id_project: string,
    id_sample: string
    widgetData: WidgetData,
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }) {
    try {
      await DatabaseService.updateWidget(o);
      o.onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async deleteWidget(o: {
    path: 'project widgets' | 'template widgets'
    id_project: string
    widgetData: WidgetData
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  } | {
    path: 'sample widgets'
    id_project: string
    id_sample: string
    widgetData: WidgetData
    sync: boolean
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    try {
      await DatabaseService.deleteWidget(o);
      o.onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }

  static async updateSyncData(o: {
    syncData: SyncData
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  }): Promise<void> {
    try {
      const { syncData } = o;
      await DatabaseService.updateSyncFile({ syncData });
      o.onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        o.onError(error.message);
      }
    }
  }











  // ===============================================================================================
  // ADVANCED DATABASE METHODS
  // ===============================================================================================

  static async buildProjectDTO(o: {
    id_project: string
    feedback: (message: string) => void
  }): Promise<ProjectDTO> {

    const { id_project } = o;

    // GET PROJECT SETTINGS
    o.feedback('Loading project settings');
    const projectSettings = await DatabaseService.readProject({ id_project });

    o.feedback('Loading project widgets');
    const projectWidgets = await DatabaseService.getAllWidgets({ path: 'project widgets', id_project });

    o.feedback('Loading project template');
    const templateWidgets = await DatabaseService.getAllWidgets({
      path: 'template widgets',
      id_project: id_project,
    });

    // GET ALL SAMPLES
    o.feedback('Loading all sample settings');
    const samples: SampleDTO[] = [];
    const samplesSettings = await DatabaseService.getAllSamples({ id_project });
    for (let i = 0; i < samplesSettings.length; i++) {

      o.feedback('Loading sample widgets of' + ` "${samplesSettings[i].name}".` + ` ID: ${samplesSettings[i].id_sample}`);
      const sampleWidgets = await DatabaseService.getAllWidgets({
        path: 'sample widgets',
        id_project: id_project,
        id_sample: samplesSettings[i].id_sample,
      });
      samples.push({
        sampleSettings: samplesSettings[i],
        sampleWidgets: sampleWidgets,
      });
    }

    // ASSEMBLY PROJECT
    const projectDTO: ProjectDTO = {
      projectSettings: projectSettings,
      projectWidgets:  projectWidgets,
      template:        templateWidgets,
      samples:         samples,
    };

    return projectDTO;
  }
}
