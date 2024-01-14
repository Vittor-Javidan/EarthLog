import React, { memo, useCallback, useMemo, useState } from 'react';

import { DateFormat, DateFormatsArray } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';

export const DateFormatButtons = memo(() => {

  const config = useMemo(() => ConfigService.config, [ConfigService.config.dateFormat]);
  const [selectedDateFormat, setSelectedDateFormat] = useState<DateFormat>(config.dateFormat);

  const onDateFormatSelect = useCallback(async (dateFormat: DateFormat) => {
    if (selectedDateFormat !== dateFormat) {
      ConfigService.config.dateFormat = dateFormat;
      await ConfigService.saveConfig();
      setSelectedDateFormat(dateFormat);
    }
  }, [selectedDateFormat]);

  const AllButtons = DateFormatsArray.map(dateFormat => (
    <DateFormatButton
      key={dateFormat}
      isSelected={selectedDateFormat === dateFormat}
      dateFormat={dateFormat}
      onPress={async () => await onDateFormatSelect(dateFormat)}
    />
  ));

  return <>{AllButtons}</>;
});

const DateFormatButton = memo((props: {
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
