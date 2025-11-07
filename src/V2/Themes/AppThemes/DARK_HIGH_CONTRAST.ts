import { AppTheme } from '@V2/Types/AppTypes';

export const DARK_HIGH_CONTRAST: AppTheme = {
  layout: {
    root: {
      background: '#000',
    },
    loadingIcon: {
      font: '#FFF',
    },
    statusBar: {
      background: '#FFF',
    },
    navbar: {
      font: '#222',
      font_active: '#FFF',
      background: '#FFF',
      background_active: '#222',
    },
    navigationTree: {
      font: '#222',
      background: '#FFF',
      border: '#222',
    },
    navigationTreeButton: {
      font: '#222',
      font_active: '#FFF',
      background: '#FFF',
      background_active: '#222',
    },
    drawer: {
      font: '#333',
      background: '#000',
      border: '#FFF',
      confirm: '#5F5',
      wrong: '#F55',
      warning: '#FF5',
    },
    drawerButton: {
      font: '#333',
      font_active: '#FAFAFA',
      background: '#FAFAFA',
      background_active: '#333',
      font_wrong: '#333',
      background_wrong: '#F55',
      font_confirm: '#333',
      background_confirm: '#5F5',
    },
    carousel: {
      background: '#333',
      background_Screens: '#000',
      border: '#333',
    },
    carouselButton: {
      font: '#333',
      font_active: '#5F5',
      background: '#FAFAFA',
      background_active: '#333',
    },
    screenButtons: {
      font: '#333',
      backgroud: '#FAFAFA',
      confirm: '#5F5',
      wrong: '#F55',
      background_active: '#333',
    },
    modalPopUp: {
      font: '#222',
      font_button: '#FFF',
      font_active: '#FAFAFA',
      font_placeHolder: '#999',
      background: '#FFF',
      background_Button: '#222',
      background_active: '#333',
      confirm: '#5F5',
      wrong: '#F55',
    },
  },
  component: {
    font: '#DDD',
    font_Button: '#333',
    font_active: '#FAFAFA',
    background: '#333',
    background_active: '#222',
    background_Button: '#FAFAFA',
    confirm: '#5F5',
    wrong: '#F55',
    warning: '#FF5',
  },
};
