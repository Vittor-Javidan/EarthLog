import uuid from 'react-native-uuid';
import FileSystemService from './FileSystemService';

export type ProjectDTO = {
  projectSettings: ProjectSetting
  projectWidgets: Record<WidgetLabel, WidgetData>
  sampleTemplate: Record<WidgetLabel, WidgetData>
  samples: SampleDTO[]
}
export type SampleDTO = {
  sampleSettings: SampleSettings
  sampleWidgets: Record<WidgetLabel, WidgetData>
}

export type WidgetLabel = string
export type WidgetData = TextWidgetData | BooleanWidgetData

export type ProjectSetting = {
  id_project: string
  name: string
  immutable: boolean
  rules: {
    allowImmutableChange?: boolean
    allowIDChange?: boolean
    allowNameChange?: boolean
    allowSampleCreation?: boolean
  }
}
export type SampleSettings = {
  id_sample: string
  name: string
  rules: {
    allowIDChange?: boolean,
    allowNameChange?: boolean,
    allowSampleErase?: boolean,
  }
}

export type BooleanWidgetData = {
  id_widget: string
  name: string
  type: 'boolean'
  value: boolean
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
  }
}
export type TextWidgetData = {
  id_widget: string
  name: string
  type: 'text'
  value: string
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
    noSpaces?: boolean
    noSpecialLetters?: boolean
  }
}

export type WidgetTypes = 'boolean' | 'text'
export type IndexData = { name: string, ID: string }[]

export default class ProjectService {

  static DATA_BASE_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/database`;

  static generateUuidV4(): string {
    return uuid.v4() as string;
  }

  static getDefaultProjectTemplate(): ProjectDTO {
    return {
      projectSettings: {
        id_project: this.generateUuidV4(),
        name: '',
        immutable: false,
        rules: {
          allowImmutableChange: true,
          allowIDChange: true,
          allowNameChange: true,
          allowSampleCreation: true,
        },
      },
      projectWidgets: {},
      sampleTemplate: {},
      samples: [],
    };
  }

  static getWidgetData(widgetName: WidgetTypes): WidgetData {
    switch (widgetName) {
      case 'boolean': return {
        id_widget: this.generateUuidV4(),
        name: '',
        type: 'boolean',
        value: false,
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
          allowWidgetErase: true,
        },
      };
      case 'text': return {
        id_widget: this.generateUuidV4(),
        name: '',
        type: 'text',
        value: '',
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
          allowWidgetErase: true,
        },
      };
    }
  }

  static async deleteProject(id_project: string): Promise<void> {
    await FileSystemService.delete(`${this.DATA_BASE_DIRECTORY}/${id_project}`);
  }

  static async createProject(
    projectDTO: ProjectDTO,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ): Promise<void> {

    try {

      // CREATE DATABASE FOLDER IF DON'T EXIST
      await this.createDataBaseFolderStructure();

      // PROJECT
      const { id_project } = projectDTO.projectSettings;
      await this.createProjectFolderStructure(projectDTO.projectSettings);

      for (const projectWidgetLabel in projectDTO.projectWidgets) {
        const projectWidgetData = projectDTO.projectWidgets[projectWidgetLabel];
        await this.createWidgetFolderStructure(
          projectWidgetData,
          `${this.DATA_BASE_DIRECTORY}/${id_project}/projectWidgets`,
        );
      }

      for (const sampleTemplatetWidgetLabel in projectDTO.sampleTemplate) {
        const sampleTemplateWidgetData = projectDTO.sampleTemplate[sampleTemplatetWidgetLabel];
        await this.createWidgetFolderStructure(
          sampleTemplateWidgetData,
          `${this.DATA_BASE_DIRECTORY}/${id_project}/sampleTemplate`,
        );
      }

      // SAMPLES
      for (let i = 0; i < projectDTO.samples.length; i++) {

        const { id_sample } = projectDTO.samples[i].sampleSettings;
        await this.createSampleFolderStructure(
          id_project,
          projectDTO.samples[i].sampleSettings
        );

        for (const sampleWidgetLabel in projectDTO.samples[i].sampleWidgets) {
          const sampleWidgetData = projectDTO.samples[i].sampleWidgets[sampleWidgetLabel];
          await this.createWidgetFolderStructure(
            sampleWidgetData,
            `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${id_sample}/sampleWidgets`,
          );
        }
      }

      onSuccess();

    } catch (error) {

      this.deleteProject(projectDTO.projectSettings.id_project);

      // PROJECT INDEX REMOVE
      const indexFilePath = `${this.DATA_BASE_DIRECTORY}/index.json`;
      const indexFileContent = await FileSystemService.readFile(indexFilePath);
      if (indexFileContent !== null) {
        const indexData = JSON.parse(indexFileContent) as IndexData;
        const { id_project } = projectDTO.projectSettings;
        const indexFilteredData = indexData.filter(data => data.ID !== id_project);
        await FileSystemService.writeFile(indexFilePath, JSON.stringify(indexFilteredData, null, 4));
      }

      onError(JSON.stringify(error));
    }
  }

  static async createDataBaseFolderStructure(): Promise<void> {
    const databaseFolderContents = await FileSystemService.readDirectory(this.DATA_BASE_DIRECTORY);
    if (databaseFolderContents === null) {

      // MAIN FOLDER
      await FileSystemService.createDirectory(this.DATA_BASE_DIRECTORY);
    }
  }

  static async createProjectFolderStructure(
    projectSettings: ProjectSetting,
  ): Promise<void> {
    const projectsIDs = await FileSystemService.readDirectory(this.DATA_BASE_DIRECTORY);

    if (!projectsIDs) {
      throw Error('Database folder do not exist');
    }

    if (projectsIDs.includes(projectSettings.id_project)) {
      throw Error('You cannot create 2 projects with same ID.');
    }

    // MAIN FOLDER
    const projectFolderPath = `${this.DATA_BASE_DIRECTORY}/${projectSettings.id_project}`;
    await FileSystemService.createDirectory(projectFolderPath);

    // MAIN FOLDER CONTENTS
    await FileSystemService.createDirectory(`${projectFolderPath}/projectWidgets`);
    await FileSystemService.createDirectory(`${projectFolderPath}/samples`);
    await FileSystemService.createDirectory(`${projectFolderPath}/sampleTemplate`);
    await FileSystemService.writeFile(
      `${projectFolderPath}/projectSettings.json`,
      JSON.stringify(projectSettings, null, 4),
    );
  }

  static async createSampleFolderStructure(
    id_project: string,
    sampleSettings: SampleSettings,
  ): Promise<void> {
    const samplesIDs = await FileSystemService.readDirectory(`${this.DATA_BASE_DIRECTORY}/${id_project}/samples`);

    if (!samplesIDs) {
      throw Error('Samples folder do not exist');
    }

    if (samplesIDs.includes(sampleSettings.id_sample)) {
      throw Error('You cannot create 2 samples with same ID.');
    }

    // MAIN FOLDER
    const sampleFolderPath = `${this.DATA_BASE_DIRECTORY}/${id_project}/samples/${sampleSettings.id_sample}`;
    await FileSystemService.createDirectory(sampleFolderPath);

    // MAIN FOLDER CONTENTS
    await FileSystemService.createDirectory(`${sampleFolderPath}/sampleWidgets`);
    await FileSystemService.writeFile(
      `${sampleFolderPath}/sampleSettings.json`,
      JSON.stringify(sampleSettings, null, 4),
    );
  }

  static async createWidgetFolderStructure(
    widgetData: WidgetData,
    folderPath: string,
  ): Promise<void> {
    const widgetsIDs = await FileSystemService.readDirectory(folderPath);

    if (!widgetsIDs) {
      throw Error(`Widgets folder do not exist. Path: ${folderPath}`);
    }

    if (widgetsIDs.includes(widgetData.id_widget)) {
      throw Error('You cannot create 2 widgets with same ID.');
    }

    // MAIN FOLDER
    const widgetFolderPath = `${folderPath}/${widgetData.id_widget}`;
    await FileSystemService.createDirectory(widgetFolderPath);

    // MAIN FOLDER CONTENTS
    await FileSystemService.writeFile(
      `${widgetFolderPath}/data.json`,
      JSON.stringify(widgetData, null, 4),
    );
  }
}
