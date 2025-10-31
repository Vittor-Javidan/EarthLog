import React, { useMemo, memo } from 'react';
import { View } from 'react-native';

import { GPSAccuracyDTO, GPSFeaturesDTO, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { ConfigService } from '@V2/Services/ConfigService';

import { Text } from '@V2/Text/index';

export const RealTimeAccuracy = memo((props: {
  accuracy: GPSAccuracyDTO
  features: GPSFeaturesDTO
  theme: WidgetTheme
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.gps[config.language], []);

  const nothingEnable =
    props.features.enableCoordinate === false &&
    props.features.enableAltitude === false
  ;

  if (props.features.gpsTracking === false || nothingEnable) {
    return <></>;
  }

  return (
    <View>
      <Text p
        style={{ color: props.theme.font }}
      >
        {R['Real time accuracy:']}
      </Text>
      {props.features.enableCoordinate && props.accuracy.coordinate !== null && (
        <AccuracyInfo
          title={R['Coordinates']}
          precision={props.accuracy.coordinate}
          theme={props.theme}
        />
      )}
      {props.features.enableAltitude && props.accuracy.altitude !== null && (
        <AccuracyInfo
          title={R['Altitude']}
          precision={props.accuracy.altitude}
          theme={props.theme}
        />
      )}
    </View>
  );
});

const AccuracyInfo = memo((props: {
  title: string
  precision: number
  theme: WidgetTheme
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text p
        style={{ color: props.theme.font }}
      >
        {`${props.title}:`}
      </Text>
      <Text p
        style={{ color: props.theme.font }}
      >
        {`${props.precision}m`}
      </Text>
    </View>
  );
});
