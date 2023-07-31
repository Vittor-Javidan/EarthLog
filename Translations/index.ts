import { Translations_LoadingScreen, translations_LoadingScreen } from './Screens/LoadingScreen';
import { Translations_HomeScreen, translations_HomeScreen } from './Screens/HomeScreen';
import { Translations_ProjectCreationScreen, translations_ProjectCreationScreen } from './Screens/ProjectCreationScreen';
import { Translations_SettingsScreen, translations_SettingsScreen } from './Screens/SettingsScreen/SettingsScreen';
import { Translations_LanguagesScreen, translations_LanguagesScreen } from './Screens/SettingsScreen/LanguagesScreen';
import { Translations_ThemeScreen, translations_ThemeScreen } from './Screens/SettingsScreen/ThemeScreen';
import { Translations_TextWidget, translations_TextWidget } from './Widgets/TextWidget';
import { Translations_BooleanData, translations_BooleanData } from './Data/Boolean';
import { Translations_AddWidgetButton, translations_AddWidgetButton } from './Widgets/AddWidgetButton';

export const translations: {
  Screens: {
    LoadingScreen:          Translations_LoadingScreen
    HomeScreen:             Translations_HomeScreen
    ProjectCreationScreen:  Translations_ProjectCreationScreen
    SettingsScreen:         Translations_SettingsScreen
      LanguagesScreen:      Translations_LanguagesScreen
      ThemeScreen:          Translations_ThemeScreen
  }
  Widgets: {
    TextWidget:             Translations_TextWidget
    AddWidgetButton:        Translations_AddWidgetButton
  }
  Data: {
    Boolean:                Translations_BooleanData
  }
} = {
  Screens: {
    LoadingScreen:          translations_LoadingScreen,
    HomeScreen:             translations_HomeScreen,
    ProjectCreationScreen:  translations_ProjectCreationScreen,
    SettingsScreen:         translations_SettingsScreen,
      LanguagesScreen:      translations_LanguagesScreen,
      ThemeScreen:          translations_ThemeScreen,
  },
  Widgets: {
    TextWidget:             translations_TextWidget,
    AddWidgetButton:        translations_AddWidgetButton,
  },
  Data: {
    Boolean:                translations_BooleanData,
  },
};
