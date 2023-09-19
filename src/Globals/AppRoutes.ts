export default class AppRoutes {

  static RESTART_APP = '/';
  static TEST_SCOPE  = '/TestScope';
  static HOME_SCOPE  = '/HomeScope';

  static SETTINGS_SCOPE               = '/SettingsScope';
  static SS_LANGUAGE_SELECTION_SCOPE  = `${this.SETTINGS_SCOPE}/LanguageSelectionScope`;
  static SS_THEME_CUSTOMIZATION_SCOPE = `${this.SETTINGS_SCOPE}/ThemeCustomizationScope`;

  static PROJECT_SCOPE   = (id_project: string) => `/${id_project}`;
  static PS_SAMPLE_SCOPE = (id_project: string, id_sample: string) => `${this.PROJECT_SCOPE(id_project)}/${id_sample}`;

}
