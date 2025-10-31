import { router } from 'expo-router';

import { LTS_VERSION } from './Version';

class AppRoutes {

  static RESTART_APP          = `/${LTS_VERSION}`;
  static VERSION_CHANGE_SCOPE = `/${LTS_VERSION}/VersionChangeScope`;
  static TEST_SCOPE           = `/${LTS_VERSION}/TestScope`;
  static HOME_SCOPE           = `/${LTS_VERSION}/HomeScope`;
  static CREDENTIALS_SCOPE    = `/${LTS_VERSION}/CredentialScope`;
  static FILE_EXPLORE_SCOPE   = `/${LTS_VERSION}/FileExploreScope`;
  static EXPORTED_FILES_SCOPE = `/${LTS_VERSION}/ExportedFilesScope`;

  static SETTINGS_SCOPE               = `/${LTS_VERSION}/SettingsScope`;
  static SS_LANGUAGE_SELECTION_SCOPE  = `${this.SETTINGS_SCOPE}/LanguageSelectionScope`;
  static SS_TIME_AND_DATE_SCOPE       = `${this.SETTINGS_SCOPE}/DateAndTimeScope`;
  static SS_THEME_SCOPE               = `${this.SETTINGS_SCOPE}/ThemeScope`;
  static SS_VIBRATIONS_OPTIONS_SCOPE  = `${this.SETTINGS_SCOPE}/VibrationsOptionsScope`;

  static PROJECT_SCOPE           = (id_project: string                   ) => `/${LTS_VERSION}/${id_project}`;
  static PS_EXPORT_PORJECT_SCOPE = (id_project: string                   ) => `${this.PROJECT_SCOPE(id_project)}/exportProjectScope`;
  static PS_SAMPLE_SCOPE         = (id_project: string, id_sample: string) => `${this.PROJECT_SCOPE(id_project)}/${id_sample}`;
}

type ScreenName = (
  'TEST SCOPE'                                        |
  'RESTART APP'                                       |
  'VERSION CHANGE SCOPE'                              |
  'SETTINGS SCOPE'                                    |
    'LANGUAGE SELECTION SCOPE'                        |
    'TIME AND DATE SCOPE'                             |
    'THEME SCOPE'                                     |
    'VIBRATION OPTIONS SCOPE'                         |
  'CREDENTIAL SCOPE'                                  |
  'HOME SCOPE'                                        |
  'FILE EXPLORE SCOPE'                                |
  'EXPORTED FILES SCOPE'                              |
  'PROJECT SCOPE'                                     |
    'SAMPLE SCOPE'                                    |
    'EXPORT PROJECT SCOPE'
)

export function navigate(
  screen: ScreenName,
  id_project?: string,
  id_sample?: string,
) {
  switch (screen) {

    case 'TEST SCOPE':               router.navigate(AppRoutes.TEST_SCOPE);                  break;
    case 'RESTART APP':              router.navigate(AppRoutes.RESTART_APP);                 break;
    case 'VERSION CHANGE SCOPE':     router.navigate(AppRoutes.VERSION_CHANGE_SCOPE);        break;
    case 'SETTINGS SCOPE':           router.navigate(AppRoutes.SETTINGS_SCOPE);              break;
    case 'LANGUAGE SELECTION SCOPE': router.navigate(AppRoutes.SS_LANGUAGE_SELECTION_SCOPE); break;
    case 'TIME AND DATE SCOPE':      router.navigate(AppRoutes.SS_TIME_AND_DATE_SCOPE);      break;
    case 'THEME SCOPE':              router.navigate(AppRoutes.SS_THEME_SCOPE);              break;
    case 'VIBRATION OPTIONS SCOPE':  router.navigate(AppRoutes.SS_VIBRATIONS_OPTIONS_SCOPE); break;
    case 'CREDENTIAL SCOPE':         router.navigate(AppRoutes.CREDENTIALS_SCOPE);           break;
    case 'HOME SCOPE':               router.navigate(AppRoutes.HOME_SCOPE);                  break;
    case 'FILE EXPLORE SCOPE':       router.navigate(AppRoutes.FILE_EXPLORE_SCOPE);          break;
    case 'EXPORTED FILES SCOPE':     router.navigate(AppRoutes.EXPORTED_FILES_SCOPE);        break;
    case 'PROJECT SCOPE': {

      if (id_project === undefined) {
        alert('Project ID undefined');
        break;
      }

      router.navigate(AppRoutes.PROJECT_SCOPE(id_project));
      break;
    }

    case 'EXPORT PROJECT SCOPE': {

      if (id_project === undefined) {
        alert('Project ID undefined');
        break;
      }

      router.navigate(AppRoutes.PS_EXPORT_PORJECT_SCOPE(id_project));
      break;
    }

    case 'SAMPLE SCOPE': {

      if (id_project === undefined) {
        alert('Project ID undefined');
        break;
      }

      if (id_sample === undefined) {
        alert('Sample ID undefined');
        break;
      }

      router.navigate(AppRoutes.PS_SAMPLE_SCOPE(id_project, id_sample));
      break;
    }
  }
}
