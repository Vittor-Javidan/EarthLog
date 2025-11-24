import React, { useMemo, memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import {
  GPSFeaturesDTO,
  WidgetTheme
} from '@V2/Types';

import { translations } from '@V2/Translations/index';
import { FontService } from '@V2/Services_Core/FontService';
import { ConfigService } from '@V2/Services/ConfigService';
import { Text } from '@V2/Text/index';

export const LoadingFeedback = memo((props: {
  features: GPSFeaturesDTO
  theme: WidgetTheme
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.gps[config.language], []);

  const nothingEnable =
    props.features.enableCoordinate === false &&
    props.features.enableAltitude   === false
  ;

  if (props.features.gpsTracking === false) {
    return <></>;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        gap: 10,
      }}
    >
      <ActivityIndicator size="small" />
      <Text p
        style={{
          color: props.theme.font,
          textAlign: 'left',
          fontFamily: FontService.FONT_FAMILY.h2,
        }}
      >
        {nothingEnable
          ? R['Nothing selected']
          : R['Collecting the best data. Updates can take a few seconds...']
        }
      </Text>
    </View>
  );
});
