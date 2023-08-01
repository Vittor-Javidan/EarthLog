import { useMemo, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import AppRoutes from '@Globals/AppRoutes';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

type ScreenName = (
  'HOME SCREEN' | 'LANGUAGES SCREEN' | 'THEME SCREEN' | 'SETTINGS SCREEN' |
  'PROJECT CREATION SCREEN' | 'PROJECT SCREEN' | 'SAMPLE CREATION SCREEN' | 'SAMPLE SCREEN'
)

export function useBackPress(onPress: () => void) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onPress();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
}

export function useNavigate(
  screen: ScreenName,
  id_project?: string,
  id_sample?: string,
) {

  const navController = useRouter();
  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.ErrorMessages[language], []);

  switch (screen) {
    case 'HOME SCREEN':       navController.push(AppRoutes.HOME);                             break;
    case 'LANGUAGES SCREEN':  navController.push(AppRoutes.SS_LANGUAGES_SCREEN);              break;
    case 'THEME SCREEN':      navController.push(AppRoutes.SS_THEME_SCREEN);                  break;
    case 'SETTINGS SCREEN':   navController.push(AppRoutes.SETTINGS_SCREEN);                  break;
    case 'PROJECT CREATION SCREEN': navController.push(AppRoutes.PROJECT_CREATION_SCREEN);    break;
    case 'PROJECT SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

      navController.push(AppRoutes.PROJECT_SCREEN(id_project));
      break;
    }
    case 'SAMPLE CREATION SCREEN': {

      if (id_project === undefined) {
        alert(stringResources['Project ID undefined']);
        break;
      }

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

      navController.push(AppRoutes.PS_SAMPLE_SCREEN(id_project, id_sample));
    }
  }
}
