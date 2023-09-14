export default class AppRoutes {

  static TEST_SCREEN = '/TestScreen';

  static RESTART_APP = '/';

  static HOME = '/HomeScope';

  static PROJECT_SCREEN =             (id_project: string) => `/${id_project}`;
  static PS_SAMPLE_SCREEN =           (id_project: string, id_sample: string) => `${this.PROJECT_SCREEN(id_project)}/${id_sample}`;

  static SETTINGS_SCREEN =      '/SettingsScope';
  static SS_LANGUAGES_SCREEN =  `${this.SETTINGS_SCREEN}/LanguageSelectionScope`;
  static SS_THEME_SCREEN =      `${this.SETTINGS_SCREEN}/ThemeCustomizationScope`;
}
