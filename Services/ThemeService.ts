export type ThemeDTO = {
  background: string
  onBackground: string
  onBackground_Placeholder: string

  primary: string
  onPrimary: string
  onPrimary_Placeholder: string

  secondary: string
  onSecondary: string
  onSecondary_PlaceHolder: string

  tertiary: string
  onTertiary: string
  onTertiary_Placeholder: string

  confirm: string
  onConfirm: string

  modified: string
  onModified: string

  wrong: string
  onWrong: string

  onPressColorPrimary: string
}

export default class ThemeService {

  static default: ThemeDTO = {

    background: '#000',
    onBackground: '#DDD',
    onBackground_Placeholder: '#444',

    primary: '#DDD',
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
    h1: 36,
    h2: 24,
    h3: 14,
    auto: 200,
  };
}
