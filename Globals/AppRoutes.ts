export default class AppRoutes {

  static HOME = '/HomeScreen';

  static PROJECT_CREATION_SCREEN = '/ProjectCreationScreen';

  static PROJECT_SCREEN = (id_project: string) => `/${id_project}`;
  static PS_SAMPLE_CREATION_SCREEN = (id_project: string) => `${this.PROJECT_SCREEN(id_project)}/SampleCreationScreen`;

  static SETTINGS_SCREEN = '/SettingsScreen';
  static SS_LANGUAGES_SCREEN = `${this.SETTINGS_SCREEN}/LanguagesScreen`;
  static SS_THEME_SCREEN = `${this.SETTINGS_SCREEN}/ThemeScreen`;
}
