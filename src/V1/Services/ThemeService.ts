import { AppTheme, ThemeNamesArray_APP, ThemeNamesArray_Widgets, ThemeNames_APP, ThemeNames_Widgets } from '@V1/Types/AppTypes';
import { WidgetTheme } from '@V1/Types/ProjectTypes';

import { appThemes } from '@V1/Themes/AppThemes';
import { widgetThemes } from '@V1/Themes/WidgetThemes';

export default class ThemeService {

  static themeNamesArray = {
    App:    ThemeNamesArray_APP,
    Widget: ThemeNamesArray_Widgets,
  };

  static appThemes: Record<ThemeNames_APP, AppTheme> = {
    'Light': appThemes.LIGHT,
    'Dark':  appThemes.DARK,
    'Dark High Constrast': appThemes.DARK_HIGH_CONTRAST,
  };

  static widgetThemes: Record<ThemeNames_Widgets, WidgetTheme> = {
    'Light': widgetThemes.LIGHT,
    'Dark':  widgetThemes.DARK,
  };
}
