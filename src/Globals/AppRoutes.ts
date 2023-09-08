export default class AppRoutes {

  static RESTART_APP = '/';

  static HOME = '/HomeScreen';

  static PROJECT_CREATION_SCREEN = '/ProjectCreationScreen';

  static PROJECT_SCREEN =             (id_project: string) => `/${id_project}`;
  static PS_PROJECT_SETTINGS_SCREEN = (id_project: string) => `${this.PROJECT_SCREEN(id_project)}/ProjectSettingsScreen`;
  static PS_TEMPLATE_SCREEN =         (id_project: string) => `${this.PROJECT_SCREEN(id_project)}/TemplateScreen`;
  static PS_SAMPLE_CREATION_SCREEN =  (id_project: string) => `${this.PROJECT_SCREEN(id_project)}/SampleCreationScreen`;
  static PS_SAMPLE_SCREEN =           (id_project: string, id_sample: string) => `${this.PROJECT_SCREEN(id_project)}/${id_sample}`;
  static PS_SAMPLE_SETTINGS_SCREEN =  (id_project: string, id_sample: string) => `${this.PROJECT_SCREEN(id_project)}/${id_sample}/SampleSettingsScreen`;

  static SETTINGS_SCREEN =      '/SettingsScreen';
  static SS_LANGUAGES_SCREEN =  `${this.SETTINGS_SCREEN}/LanguagesScreen`;
  static SS_THEME_SCREEN =      `${this.SETTINGS_SCREEN}/ThemeScreen`;
}
