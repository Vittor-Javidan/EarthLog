import React, { memo, useCallback, useMemo, useState } from 'react';

import { TimeFormat, TimeFormatsArray } from '@V2/Types/AppTypes';
import { ConfigService } from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const Screen_TimeFormat = memo((props: {
  onScreenButton_ArrowBack: () => void
}) => {

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
    <LC.TimeFormatButton
      key={timeFormat}
      isSelected={selectedTimeFormat === timeFormat}
      timeFormat={timeFormat}
      onPress={async () => await onTimeFormatSelect(timeFormat)}
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
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingLeft: 1,
          gap: 1,
        }}
      >
        {AllButtons}
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
