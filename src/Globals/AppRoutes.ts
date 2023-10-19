export default class AppRoutes {

  static RESTART_APP       = '/';
  static TEST_SCOPE        = '/TestScope';
  static HOME_SCOPE        = '/HomeScope';
  static CREDENTIALS_SCOPE = '/CredentialScope';

  static SETTINGS_SCOPE               = '/SettingsScope';
  static SS_LANGUAGE_SELECTION_SCOPE  = `${this.SETTINGS_SCOPE}/LanguageSelectionScope`;
  static SS_TIME_AND_DATE_SCOPE       = `${this.SETTINGS_SCOPE}/DateAndTimeScope`;
  static SS_THEME_SCOPE               = `${this.SETTINGS_SCOPE}/ThemeScope`;

  static PROJECT_SCOPE           = (id_project: string) => `/${id_project}`;
  static PS_EXPORT_PORJECT_SCOPE = (id_project: string) => `${this.PROJECT_SCOPE(id_project)}/exportProjectScope`;
  static PS_SAMPLE_SCOPE         = (id_project: string, id_sample: string) => `${this.PROJECT_SCOPE(id_project)}/${id_sample}`;
}
