import { AppThemeDTO, ThemeNamesArray_APP, ThemeNamesArray_Widgets, ThemeNames_APP, ThemeNames_Widgets } from '@Types/AppTypes';
import { WidgetThemeDTO } from '@Types/ProjectTypes';

import { newAppThemes } from './AppThemes';
import { widgetThemes } from './WidgetThemes';

export default class ThemeService {

  static themeNamesArray = {
    App:    ThemeNamesArray_APP,
    Widget: ThemeNamesArray_Widgets,
  };

  static appThemes: Record<ThemeNames_APP, AppThemeDTO> = {
    'default': newAppThemes.DEFAULT,
  };

  static widgetThemes: Record<ThemeNames_Widgets, WidgetThemeDTO> = {
    'default': widgetThemes.DEFAULT,
  };
}
