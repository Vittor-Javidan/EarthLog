import React, { memo, useMemo } from 'react';

import { DateFormat } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Button } from '@V2/Button/index';

export const DateFormatButton = memo((props: {
  isSelected: boolean
  dateFormat: DateFormat
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.dateFormat[config.language], []);

  return (
    <Button.TextWithIcon
      title={R[props.dateFormat]}
      theme={{
        font:              props.isSelected ? theme.background : theme.font_Button,
        font_active:       props.isSelected ? theme.confirm    : theme.font_active,
        background:        props.isSelected ? theme.confirm    : theme.background_Button,
        background_active: props.isSelected ? theme.background : theme.background_active,
      }}
      iconName="calendar"
      onPress={() => props.onPress()}
    />
  );
});
