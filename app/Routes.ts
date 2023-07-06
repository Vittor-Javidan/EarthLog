export default class AppRoutes {
  static MAIN_SCREEN = '/MainScreen';

  static SETTINGS_SCREEN = '/SettingsScreen';
  static SS_LANGUAGES_SCREEN = `${this.SETTINGS_SCREEN}/LanguagesScreen`;
  static SS_THEME_SCREEN = `${this.SETTINGS_SCREEN}/ThemeScreen`;
}
