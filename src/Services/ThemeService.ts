import { ThemeDTO } from '@Types/index';

export default class ThemeService {

  static default: ThemeDTO = {

    background: '#000',
    onBackground: '#DDD',
    onBackground_Placeholder: '#444',

    primary: '#FFF',
    onPrimary: '#222',
    onPrimary_Placeholder: '#999',

    secondary: '#888',
    onSecondary: '#DDD',
    onSecondary_PlaceHolder: '#666',

    tertiary: '#444',
    onTertiary: '#DDD',
    onTertiary_Placeholder: '#666',

    confirm: '#5F5',
    onConfirm: '#222',

    modified: '#FF5',
    onModified: '#222',

    wrong: '#F55',
    onWrong: '#222',

    onPressColorPrimary: '#FFF',
  };

  static FONTS = {
    h1: 24,
    h2: 21,
    h3: 18,
    p: 14,
    auto: 200,
  };
}
