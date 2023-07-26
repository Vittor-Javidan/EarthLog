export default class AppRoutes {

  static HOME = '/HomeScreen';

  static PROJECT_CREATION_SCREEN = '/ProjectCreationScreen';

  static PROJECT_SCREEN = (id_project: string, name: string) =>
    `/ProjectScreen?id_project=${id_project}&name=${name}`;
  static SAMPLE_SCREEN = (id_project: string, projectName: string, id_sample: string) =>
    `${this.PROJECT_SCREEN(id_project, projectName)}/SampleScreen?id_sample=${id_sample}`;

  static SETTINGS_SCREEN = '/SettingsScreen';
  static SS_LANGUAGES_SCREEN = `${this.SETTINGS_SCREEN}/LanguagesScreen`;
  static SS_THEME_SCREEN = `${this.SETTINGS_SCREEN}/ThemeScreen`;
}
