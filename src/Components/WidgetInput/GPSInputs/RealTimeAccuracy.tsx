import React, { useMemo, memo } from 'react';
import { View } from 'react-native';

import { GPSAccuracyDTO, GPSFeaturesDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';
import { GPSInputTheme } from './ThemeType';

export const RealTimeAccuracy = memo((props: {
  accuracy: GPSAccuracyDTO
  features: GPSFeaturesDTO
  theme: GPSInputTheme
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.gpsInput[config.language], []);

  const nothingEnable =
    props.features.enableCoordinate === false &&
    props.features.enableAltitude === false
  ;

  if (props.features.gpsON === false || nothingEnable) {
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
  theme: GPSInputTheme
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
