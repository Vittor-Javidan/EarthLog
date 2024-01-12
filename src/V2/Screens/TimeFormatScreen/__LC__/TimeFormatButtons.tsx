import React, { memo, useCallback, useMemo, useState } from 'react';

import { TimeFormat, TimeFormatsArray } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';

export const TimeFormatButtons = memo(() => {

  const config = useMemo(() => ConfigService.config, [ConfigService.config.dateFormat]);
  const [selectedTimeFormat, setSelectedTimeFormat] = useState<TimeFormat>(config.timeFormat);

  const onTimeFormatSelect = useCallback(async (timeFormat: TimeFormat) => {
    if (selectedTimeFormat !== timeFormat) {
      ConfigService.config.timeFormat = timeFormat;
      await ConfigService.saveConfig();
      setSelectedTimeFormat(timeFormat);
    }
  }, [selectedTimeFormat]);

  const AllButtons = TimeFormatsArray.map(timeFormat => (
    <TimeFormatButton
      key={timeFormat}
      isSelected={selectedTimeFormat === timeFormat}
      timeFormat={timeFormat}
      onPress={async () => await onTimeFormatSelect(timeFormat)}
    />
  ));

  return <>{AllButtons}</>;
});

const TimeFormatButton = memo((props: {
  isSelected: boolean
  timeFormat: TimeFormat
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.timeFormat[config.language], []);

  return (
    <Button.TextWithIcon
      title={R[props.timeFormat]}
      theme={{
        font:              props.isSelected ? theme.background : theme.font_Button,
        font_active:       props.isSelected ? theme.confirm    : theme.font_active,
        background:        props.isSelected ? theme.confirm    : theme.background_Button,
        background_active: props.isSelected ? theme.background : theme.background_active,
      }}
      iconName="time"
      onPress={() => props.onPress()}
    />
  );
});
