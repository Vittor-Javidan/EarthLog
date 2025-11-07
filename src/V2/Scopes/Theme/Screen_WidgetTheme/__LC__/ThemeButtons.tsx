import React, { memo, useMemo } from 'react';

import { ThemeNames_Widgets } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Button } from '@V2/Button/index';

export const ThemeButton = memo((props: {
  isSelected: boolean
  themeName: ThemeNames_Widgets
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.themes.widget[config.language], []);
  const theme = ThemeService.appThemes[config.appTheme].layout.drawerButton;

  return (
    <Button.TextWithIcon
      title={R[props.themeName]}
      theme={{
        font:              props.isSelected ? theme.font_confirm       : theme.font,
        font_active:       props.isSelected ? theme.background_confirm : theme.font_active,
        background:        props.isSelected ? theme.background_confirm : theme.background,
        background_active: props.isSelected ? theme.font_confirm       : theme.background_active,
      }}
      iconName="color-palette"
      onPress={() => props.onPress()}
    />
  );
});
