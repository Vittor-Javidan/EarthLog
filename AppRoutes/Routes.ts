export default class AppRoutes {

  static HOME = '/HomeScreen';

  static PROJECT_CREATION_SCREEN = '/ProjectCreationScreen';

  static SETTINGS_SCREEN = '/SettingsScreen';
  static SS_LANGUAGES_SCREEN = `${this.SETTINGS_SCREEN}/LanguagesScreen`;
  static SS_THEME_SCREEN = `${this.SETTINGS_SCREEN}/ThemeScreen`;
}
