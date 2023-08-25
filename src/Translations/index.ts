import { Translations_HomeScreen, translations_HomeScreen } from './Screens/HomeScreen';
import { Translations_ProjectCreationScreen, translations_ProjectCreationScreen } from './Screens/ProjectCreationScreen';
import { Translations_SettingsScreen, translations_SettingsScreen } from './Screens/SettingsScreen/SettingsScreen';
import { Translations_LanguagesScreen, translations_LanguagesScreen } from './Screens/SettingsScreen/LanguagesScreen';
import { Translations_ThemeScreen, translations_ThemeScreen } from './Screens/SettingsScreen/ThemeScreen';
import { Translations_TextWidget, translations_TextWidget } from './Widgets/TextWidget';
import { Translations_BooleanData, translations_BooleanData } from './Data/Boolean';
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

export const translations: {
  Screens: {
    HomeScreen:                 Translations_HomeScreen
    ProjectCreationScreen:      Translations_ProjectCreationScreen
    SettingsScreen:             Translations_SettingsScreen
      LanguagesScreen:          Translations_LanguagesScreen
      ThemeScreen:              Translations_ThemeScreen
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
    TextWidget:                 Translations_TextWidget
    BooleanWidget:              Translations_BooleanWidget
    AddWidgetButton:            Translations_AddWidgetButton
  }
  Data: {
    Boolean:                    Translations_BooleanData
  }
  ErrorMessages:                Translations_ErrorMessages
} = {
  Screens: {
    HomeScreen:                 translations_HomeScreen,
    ProjectCreationScreen:      translations_ProjectCreationScreen,
    SettingsScreen:             translations_SettingsScreen,
      LanguagesScreen:          translations_LanguagesScreen,
      ThemeScreen:              translations_ThemeScreen,
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
    TextWidget:                 translations_TextWidget,
    BooleanWidget:              translations_BooleanWidget,
    AddWidgetButton:            translations_AddWidgetButton,
  },
  Data: {
    Boolean:                    translations_BooleanData,
  },
  ErrorMessages:                translations_ErrorMessages,
};
