import { AppTheme, ThemeNamesArray_APP, ThemeNamesArray_Widgets, ThemeNames_APP, ThemeNames_Widgets } from '@Types/AppTypes';
import { WidgetTheme } from '@Types/ProjectTypes';

import { appThemes } from '@Themes/AppThemes';
import { widgetThemes } from '@Themes/WidgetThemes';

export default class ThemeService {

  static themeNamesArray = {
    App:    ThemeNamesArray_APP,
    Widget: ThemeNamesArray_Widgets,
  };

  static appThemes: Record<ThemeNames_APP, AppTheme> = {
    'Light': appThemes.LIGHT,
    'Dark':  appThemes.DARK,
  };

  static widgetThemes: Record<ThemeNames_Widgets, WidgetTheme> = {
    'Light': widgetThemes.LIGHT,
    'Dark':  widgetThemes.DARK,
  };
}
