import { Translations_HomeScreen, translations_HomeScreen } from './Screens/HomeScreen';
import { Translations_ProjectCreationScreen, translations_ProjectCreationScreen } from './Screens/ProjectCreationScreen';
import { Translations_SettingsScreen, translations_SettingsScreen } from './Screens/SettingsScreen/SettingsScreen';
import { Translations_LanguagesScreen, translations_LanguagesScreen } from './Screens/SettingsScreen/LanguagesScreen';
import { Translations_TextWidget, translations_TextWidget } from './Widgets/TextWidget';
import { Translations_BooleanData, translations_BooleanData } from './Input/Boolean';
import { Translations_AddWidgetButton, translations_AddWidgetButton } from './Widgets/AddWidgetButton';
import { Translations_ProjectScreen, translations_ProjectScreen } from './Screens/ProjectScreen/ProjectScreen';
import { Translations_SampleCreationScreen, translations_SampleCreationScreen } from './Screens/ProjectScreen/SampleCreationScreen';
import { Translations_SampleScreen, translations_SampleScreen } from './Screens/ProjectScreen/SampleScreen/SampleScreen';
import { Translations_ErrorMessages, translations_ErrorMessages } from './ErrorMessages';
import { Translations_ProjectSettingsScreen, translations_ProjectSettingsScreen } from './Screens/ProjectScreen/ProjectSettingsScreen';
import { Translations_WidgetsComponents_Modal, translations_WidgetsComponents_Modal } from './Widgets/Components_Modal';
import { Translations_SampleSettingsScreen, translations_SampleSettingsScreen } from './Screens/ProjectScreen/SampleScreen/SampleSettingsScreen';
import { Translations_TemplateScreen, translations_TemplateScreen } from './Screens/ProjectScreen/TemplateScreen';
import { Translations_BooleanWidget, translations_BooleanWidget } from './Widgets/BooleanWidget';
import { Translations_Input_GPSInput, translations_Input_GPSInput } from './Input/GPSInput';
import { Translations_WidgetSelector, translations_WidgetSelector } from './Widgets/WidgetSelector';

export const translations: {
  Screens: {
    HomeScreen:                 Translations_HomeScreen
    ProjectCreationScreen:      Translations_ProjectCreationScreen
    SettingsScreen:             Translations_SettingsScreen
      LanguagesScreen:          Translations_LanguagesScreen
    ProjectScreen:              Translations_ProjectScreen
      ProjectSettingsScreen:    Translations_ProjectSettingsScreen
      TemplateScreen:           Translations_TemplateScreen
      SampleCreationScreen:     Translations_SampleCreationScreen
      SampleScreen:             Translations_SampleScreen
        SampleSettingsScreen:   Translations_SampleSettingsScreen
  }
  Widgets: {
    Components: {
      Modal:                    Translations_WidgetsComponents_Modal
    }
    WidgetSelector:             Translations_WidgetSelector
    TextWidget:                 Translations_TextWidget
    BooleanWidget:              Translations_BooleanWidget
    AddWidgetButton:            Translations_AddWidgetButton
  }
  Input: {
    BooleanInput:                    Translations_BooleanData
    GPSInput:                   Translations_Input_GPSInput
  }
  ErrorMessages:                Translations_ErrorMessages
} = {
  Screens: {
    HomeScreen:                 translations_HomeScreen,
    ProjectCreationScreen:      translations_ProjectCreationScreen,
    SettingsScreen:             translations_SettingsScreen,
      LanguagesScreen:          translations_LanguagesScreen,
    ProjectScreen:              translations_ProjectScreen,
      ProjectSettingsScreen:    translations_ProjectSettingsScreen,
      TemplateScreen:           translations_TemplateScreen,
      SampleCreationScreen:     translations_SampleCreationScreen,
      SampleScreen:             translations_SampleScreen,
        SampleSettingsScreen:   translations_SampleSettingsScreen,
  },
  Widgets: {
    Components: {
      Modal:                    translations_WidgetsComponents_Modal,
    },
    WidgetSelector:             translations_WidgetSelector,
    TextWidget:                 translations_TextWidget,
    BooleanWidget:              translations_BooleanWidget,
    AddWidgetButton:            translations_AddWidgetButton,
  },
  Input: {
    BooleanInput:                    translations_BooleanData,
    GPSInput:                   translations_Input_GPSInput,
  },
  ErrorMessages:                translations_ErrorMessages,
};
