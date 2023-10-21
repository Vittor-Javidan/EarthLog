import { useRouter } from 'expo-router';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import AppRoutes from './AppRoutes';

type ScreenName = (
  'TEST SCOPE'                                        |
  'RESTART APP'                                       |
  'SETTINGS SCOPE'                                    |
    'LANGUAGE SELECTION SCOPE'                        |
    'TIME AND DATE SCOPE'                             |
    'THEME SCOPE'                                     |
    'VIBRATION OPTIONS SCOPE'                         |
  'CREDENTIAL SCOPE'                                  |
  'HOME SCOPE'                                        |
    'PROJECT SCOPE'                                   |
      'SAMPLE SCOPE'                                  |
      'EXPORT PROJECT SCOPE'
)

export function navigate(
  screen: ScreenName,
  id_project?: string,
  id_sample?: string,
) {

  const config = ConfigService.config;
  const R      = translations.global.navigationController[config.language];
  const navController = useRouter();

  switch (screen) {

    case 'TEST SCOPE':               navController.push(AppRoutes.TEST_SCOPE);                  break;
    case 'RESTART APP':              navController.push(AppRoutes.RESTART_APP);                 break;
    case 'SETTINGS SCOPE':           navController.push(AppRoutes.SETTINGS_SCOPE);              break;
    case 'LANGUAGE SELECTION SCOPE': navController.push(AppRoutes.SS_LANGUAGE_SELECTION_SCOPE); break;
    case 'TIME AND DATE SCOPE':      navController.push(AppRoutes.SS_TIME_AND_DATE_SCOPE);      break;
    case 'THEME SCOPE':              navController.push(AppRoutes.SS_THEME_SCOPE);              break;
    case 'VIBRATION OPTIONS SCOPE':  navController.push(AppRoutes.SS_VIBRATIONS_OPTIONS_SCOPE); break;
    case 'CREDENTIAL SCOPE':         navController.push(AppRoutes.CREDENTIALS_SCOPE);           break;
    case 'HOME SCOPE':               navController.push(AppRoutes.HOME_SCOPE);                  break;

    case 'PROJECT SCOPE': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      navController.push(AppRoutes.PROJECT_SCOPE(id_project));
      break;
    }

    case 'EXPORT PROJECT SCOPE': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_EXPORT_PORJECT_SCOPE(id_project));
      break;
    }

    case 'SAMPLE SCOPE': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      if (id_sample === undefined) {
        alert(R['Sample ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_SAMPLE_SCOPE(id_project, id_sample));
      break;
    }
  }
}
