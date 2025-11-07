import React, { memo, useCallback, useMemo, useState } from 'react';

import { DateFormat, DateFormatsArray } from '@V1/Types/AppTypes';
import { ConfigService } from '@V1/Services/ConfigService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const Screen_DateFormat = memo((props: {
  onScreenButton_ArrowBack: () => void
}) => {

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
    <LC.DateFormatButton
      key={dateFormat}
      isSelected={selectedDateFormat === dateFormat}
      dateFormat={dateFormat}
      onPress={async () => await onDateFormatSelect(dateFormat)}
    />
  ));
  
  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onArrowBackPress={() => props.onScreenButton_ArrowBack()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            paddingRight: 1,
            gap: 1,
          }}
        >
          {AllButtons}
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
