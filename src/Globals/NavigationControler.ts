import { useRouter } from 'expo-router';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import AppRoutes from './AppRoutes';

type ScreenName = (
  'RESTART APP'                                       |
  'SETTINGS SCREEN'                                   |
    'LANGUAGES SCREEN'                                |
    'THEME SCREEN'                                    |
  'HOME SCREEN'                                       |
    'PROJECT CREATION SCREEN'                         |
    'PROJECT SCREEN'                                  |
      'PROJECT SETTINGS SCREEN'                       |
      'TEMPLATE SCREEN'                               |
      'SAMPLE CREATION SCREEN'                        |
      'SAMPLE SCREEN'                                 |
        'SAMPLE SETTINGS SCREEN'
)

export function navigate(
  screen: ScreenName,
  id_project?: string,
  id_sample?: string,
) {

  const { language } = ConfigService.config;
  const R = translations.ErrorMessages[language];
  const navController = useRouter();

  switch (screen) {

    case 'RESTART APP': {
      navController.push(AppRoutes.RESTART_APP);
      break;
    }

    case 'SETTINGS SCREEN': {
      navController.push(AppRoutes.SETTINGS_SCREEN);
      break;
    }

    case 'LANGUAGES SCREEN': {
      navController.push(AppRoutes.SS_LANGUAGES_SCREEN);
      break;
    }

    case 'THEME SCREEN': {
      navController.push(AppRoutes.SS_THEME_SCREEN);
      break;
    }

    case 'HOME SCREEN': {
      navController.push(AppRoutes.HOME);
      break;
    }

    case 'PROJECT CREATION SCREEN': {
      navController.push(AppRoutes.PROJECT_CREATION_SCREEN);
      break;
    }

    case 'PROJECT SCREEN': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      navController.push(AppRoutes.PROJECT_SCREEN(id_project));
      break;
    }

    case 'PROJECT SETTINGS SCREEN': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_PROJECT_SETTINGS_SCREEN(id_project));
      break;
    }

    case 'TEMPLATE SCREEN': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_TEMPLATE_SCREEN(id_project));
      break;
    }

    case 'SAMPLE CREATION SCREEN': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_SAMPLE_CREATION_SCREEN(id_project));
      break;
    }

    case 'SAMPLE SCREEN': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      if (id_sample === undefined) {
        alert(R['Sample ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_SAMPLE_SCREEN(id_project, id_sample));
      break;
    }

    case 'SAMPLE SETTINGS SCREEN': {

      if (id_project === undefined) {
        alert(R['Project ID undefined']);
        break;
      }

      if (id_sample === undefined) {
        alert(R['Sample ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_SAMPLE_SETTINGS_SCREEN(id_project, id_sample));
      break;
    }
  }
}
