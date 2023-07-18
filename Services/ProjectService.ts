import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export type ProjectDTO = {
  projectSettings: ProjectSettingWidgets
  projectWidgets: Record<WidgetLabel, WidgetData>
  pointTemplate: Record<WidgetLabel, WidgetData>
  points: PointDTO[]
}
export type PointDTO = {
  pointSettings: PointSettings
  pointWidgets: Record<WidgetLabel, WidgetData>
}

export type WidgetLabel = string
export type WidgetData = TextWidgetData | BooleanWidgetData

export type ProjectSettingWidgets = {
  Immutable: boolean
  ID: string
  Name: string
  rules: {
    allowImmutableChange?: boolean
    allowIDChange?: boolean
    allowNameChange?: boolean
    allowPointCreation?: boolean
  }
}
export type PointSettings = {
  ID: TextWidgetData
  Name: TextWidgetData
  rules: {
    allowNameChange: boolean,
  }
}

export type TextWidgetData = {
  ID: string
  type: 'string'
  value: string
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
    noSpaces?: boolean
    noSpecialLetters?: boolean
  }
}
export type BooleanWidgetData = {
  ID: string
  type: 'boolean'
  value: boolean
  rules: {
    allowLabelChange?: boolean
    allowValueChange?: boolean
    allowWidgetErase?: boolean
  }
}

export type WidgetName = 'BooleanWidget' | 'TextWidget'

export default class ProjectService {

  static currentProject: ProjectDTO | null = null;

  private static generateUuidV4(): string {
    return uuidv4();
  }

  static getDefaultProjectTemplate(): ProjectDTO {
    return {
      projectSettings: {
        Immutable: false,
        ID: this.generateUuidV4(),
        Name: '',
        rules: {
          allowImmutableChange: true,
          allowNameChange: true,
        },
      },
      projectWidgets: {},
      pointTemplate: {},
      points: [],
    };
  }

  static getWidgetData(widgetName: WidgetName): WidgetData {
    switch (widgetName) {
      case 'BooleanWidget': return {
        ID: this.generateUuidV4(),
        type: 'boolean',
        value: false,
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
          allowWidgetErase: true,
        },
      };
      case 'TextWidget': return {
        ID: this.generateUuidV4(),
        type: 'string',
        value: '',
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
          allowWidgetErase: true,
        },
      };
    }
  }
}
