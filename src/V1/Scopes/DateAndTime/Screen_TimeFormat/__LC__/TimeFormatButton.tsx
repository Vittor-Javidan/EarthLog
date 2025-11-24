import React, { memo, useMemo } from 'react';

import {
  TimeFormat
} from '@V1/Types';

import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';
import { Button } from '@V1/Button/index';

export const TimeFormatButton = memo((props: {
  isSelected: boolean
  timeFormat: TimeFormat
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.screen.timeFormat[config.language], []);

  return (
    <Button.TextWithIcon
      title={R[props.timeFormat]}
      theme={{
        font:              props.isSelected ? theme.font_confirm       : theme.font,
        font_active:       props.isSelected ? theme.background_confirm : theme.font_active,
        background:        props.isSelected ? theme.background_confirm : theme.background,
        background_active: props.isSelected ? theme.font_confirm       : theme.background_active,
      }}
      iconName="time"
      onPress={() => props.onPress()}
    />
  );
});
