export type ThemeDTO = {
  background: string
  onBackground: string

  primary: string
  onPrimary: string

  secondary: string
  onSecondary: string

  tertiary: string
  onTertiary: string

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

    primary: '#DDD',
    onPrimary: '#222',

    secondary: '#888',
    onSecondary: '#DDD',

    tertiary: '#444',
    onTertiary: '#DDD',

    confirm: '#5F5',
    onConfirm: '#222',

    modified: '#FF5',
    onModified: '#222',

    wrong: '#F55',
    onWrong: '#222',

    onPressColorPrimary: '#FFF',
  };
}
