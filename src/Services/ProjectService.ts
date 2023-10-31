import { ConfigDTO } from '@Types/AppTypes';
import { ProjectDTO, ProjectSettings, SampleSettings, WidgetData, InputTypes, InputData, SampleRules, GPS_DTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import DatabaseService from './DatabaseService';
import UtilService from './UtilService';

export default class ProjectService {

  // ===============================================================================================
  // DATA CREATION METHODS
  // ===============================================================================================

  static getDefaultProjectTemplate(options: {
    name?: string
  }): ProjectDTO {
    const id_project = UtilService.generateUuidV4();
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
      id_sample: UtilService.generateUuidV4(),
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
      id_widget: UtilService.generateUuidV4(),
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
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'boolean',
        value: false,
        notApplicable: true,
      };
      case 'string': return {
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'string',
        value: '',
      };
      case 'options': return {
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'options',
        value: [],
        showAddOptionButton: true,
        allowOptionLabelChange: true,
        allowOptionDeletion: true,
      };
      case 'selection': return {
        id_input: UtilService.generateUuidV4(),
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
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'gps',
        value: {},
      };
      case 'picture': return {
        id_input: UtilService.generateUuidV4(),
        label: '',
        type: 'picture',
        value: [],
      };
    }
  }

  static changeAllIds (widgetData: WidgetData) {

    // Change Widget ID
    widgetData.id_widget = UtilService.generateUuidV4();

    for (let i = 0; i < widgetData.inputs.length; i++) {
      const inputArray = widgetData.inputs[i];

      // Change Input ID
      inputArray.id_input = UtilService.generateUuidV4();

      // Change Options IDs
      if (inputArray.type === 'options') {
        const options = inputArray.value;
        for (let j = 0; j < options.length; j++) {
          options[j].id = UtilService.generateUuidV4();
        }
      }
    }

    return widgetData;
  }











  // ===============================================================================================
  // BASIC DATABASE METHODS
  // ===============================================================================================

  static async createProject(
    projectDTO: ProjectDTO,
    config: ConfigDTO,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
    feedback: (message: string) => void,
  ): Promise<void> {

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

      const R = translations.service.project[config.language];

      feedback(R['Creating project folder']);
      await DatabaseService.createProject(projectSettings);

      feedback(R['Saving project widgets']);
      for (let i = 0; i < projectWidgets.length; i++) {
        await DatabaseService.createWidget({
          path: 'project widgets',
          id_project: id_project,
          widgetData: projectWidgets[i],
          sync: false,
        });
      }

      feedback(R['Saving template widgets']);
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

        feedback(R['Saving sample of ID:'] + ` ${samples[i].sampleSettings.id_sample}`);
        await DatabaseService.createSample({
          id_project: id_project,
          sampleSettings: sampleSettings,
          addTemplateWidgets: false,
          sync: false,
        });

        for (let j = 0; j < sampleWidgets.length; j++) {
          feedback(R['Saving sample widget of ID:'] + ` ${sampleWidgets[j].id_widget}`);
          await DatabaseService.createWidget({
            path: 'sample widgets',
            id_project: id_project,
            id_sample:  id_sample,
            widgetData: sampleWidgets[j],
            sync: false,
          });
        }
      }

      feedback(R['Saving project sync file']);
      await DatabaseService.updateSyncFile(projectDTO.syncData);

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
}
