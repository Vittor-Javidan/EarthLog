import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPSAccuracyDTO, GPSFeaturesDTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';
import { GPSInputTheme } from './ThemeType';

export default function RealTimeAccuracy(props: {
  accuracy: GPSAccuracyDTO
  features: GPSFeaturesDTO
  theme: GPSInputTheme
}) {

  const { theme, features } = props;
  const { gpsON, enableCoordinate, enableAltitude} = features;
  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);
  const nothingEnable = enableCoordinate === false && enableAltitude === false;

  if (gpsON === false || nothingEnable) {
    return <></>;
  }

  return (
    <View>
      <Text.P
        style={{ color: theme.font }}
      >
        {R['Real time accuracy:']}
      </Text.P>
      {enableCoordinate && props.accuracy.coordinate !== null && (
        <AccuracyInfo
          title={R['Coordinates']}
          precision={props.accuracy.coordinate}
          theme={theme}
        />
      )}
      {enableAltitude && props.accuracy.altitude !== null && (
        <AccuracyInfo
          title={R['Altitude']}
          precision={props.accuracy.altitude}
          theme={theme}
        />
      )}
    </View>
  );
}

function AccuracyInfo(props: {
  title: string
  precision: number
  theme: GPSInputTheme
}) {

  const { theme } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text.P
        style={{ color: theme.font }}
      >
        {`${props.title}:`}
      </Text.P>
      <Text.P
        style={{ color: theme.font }}
      >
        {`${props.precision}m`}
      </Text.P>
    </View>
  );
}
