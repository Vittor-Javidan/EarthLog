import React, { memo, useMemo } from 'react';

import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Button } from '@V1/Button/index';

export const LanguageButton = memo((props: {
  name: string
  isSelected: boolean
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);

  return (
    <Button.TextWithIcon
      title={props.name}
      iconName="language"
      theme={{
        font:              props.isSelected ? theme.font_confirm        : theme.font,
        font_active:       props.isSelected ? theme.background_confirm  : theme.font_active,
        background:        props.isSelected ? theme.background_confirm  : theme.background,
        background_active: props.isSelected ? theme.font_confirm        : theme.background_active,
      }}
      onPress={() => props.onPress()}
    />
  );
});
