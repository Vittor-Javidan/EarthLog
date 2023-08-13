import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import * as Vibration from 'expo-haptics';

import AppRoutes from '@Globals/AppRoutes';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

type ScreenName = (
  'RESTART APP'                                       |
  'SETTINGS SCREEN'                                   |
    'LANGUAGES SCREEN'                                |
    'THEME SCREEN'                                    |
  'HOME SCREEN'                                       |
    'PROJECT CREATION SCREEN'                         |
    'PROJECT SCREEN'                                  |
    'PROJECT SCREEN (FROM PROJECT CREATION SCREEN)'   |
      'PROJECT SETTINGS SCREEN'                       |
      'TEMPLATE SCREEN'                               |
      'SAMPLE CREATION SCREEN'                        |
      'SAMPLE SCREEN'                                 |
      'SAMPLE SCREEN (FROM SAMPLE CREATION SCREEN)'   |
        'SAMPLE SETTINGS SCREEN'
)

export function useBackPress(onPress: () => void) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onPress();
        Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
}

export function useTiming(
  execute: () => void,
  deps: React.DependencyList | undefined,
  ms: number,
) {
  useEffect(() => {
    const timer = setInterval(() => {
      execute();
    }, ms);

    return () => clearInterval(timer);
  }, deps);
}

export async function useNavigate(
  screen: ScreenName,
  id_project?: string,
  id_sample?: string,
) {

  /* Warn:
    Some hooks will not work on this scope (ex: useState, useMemo), since this function is
    called inside callbacks, and not directly inside a Component scope.
  */

  const { language } = ConfigService.config;
  const stringResources = translations.ErrorMessages[language];
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

      await ProjectService.loadAllProjectsSettings();
      await ProjectService.loadLastOpenProject();
      navController.push(AppRoutes.HOME);
      break;
    }

    case 'PROJECT CREATION SCREEN': {
      navController.push(AppRoutes.PROJECT_CREATION_SCREEN);
      break;
    }

    case 'PROJECT SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      await ProjectService.saveLastOpenProject(id_project);
      await ProjectService.loadAllSamplesSettings(id_project);
      navController.push(AppRoutes.PROJECT_SCREEN(id_project));
      break;
    }

    case 'PROJECT SCREEN (FROM PROJECT CREATION SCREEN)': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      // cache
      await ProjectService.saveLastOpenProject(id_project);
      await ProjectService.loadAllProjectsSettings();
      await ProjectService.loadLastOpenProject();
      await ProjectService.loadAllSamplesSettings(id_project);
      navController.push(AppRoutes.PROJECT_SCREEN(id_project));
      break;
    }

    case 'PROJECT SETTINGS SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      await ProjectService.loadAllWidgets_Project(id_project);
      navController.push(AppRoutes.PS_PROJECT_SETTINGS_SCREEN(id_project));
      break;
    }

    case 'TEMPLATE SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      await ProjectService.loadAllWidgets_Template(id_project);
      navController.push(AppRoutes.PS_TEMPLATE_SCREEN(id_project));
      break;
    }

    case 'SAMPLE CREATION SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      await ProjectService.loadAllWidgets_Template(id_project);
      navController.push(AppRoutes.PS_SAMPLE_CREATION_SCREEN(id_project));
      break;
    }

    case 'SAMPLE SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      if (id_sample === undefined) {
        alert(stringResources['Sample ID undefined']);
        break;
      }

      await ProjectService.loadAllWidgets_Sample(id_project, id_sample);
      navController.push(AppRoutes.PS_SAMPLE_SCREEN(id_project, id_sample));
      break;
    }

    case 'SAMPLE SCREEN (FROM SAMPLE CREATION SCREEN)': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      if (id_sample === undefined) {
        alert(stringResources['Sample ID undefined']);
        break;
      }

      await ProjectService.loadAllSamplesSettings(id_project);
      await ProjectService.loadAllWidgets_Sample(id_project, id_sample);
      navController.push(AppRoutes.PS_SAMPLE_SCREEN(id_project, id_sample));
      break;
    }

    case 'SAMPLE SETTINGS SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      if (id_sample === undefined) {
        alert(stringResources['Sample ID undefined']);
        break;
      }

      navController.push(AppRoutes.PS_SAMPLE_SETTINGS_SCREEN(id_project, id_sample));
      break;
    }
  }
}
