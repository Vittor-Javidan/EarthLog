import React, { useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';
import { GPSAccuracyDTO, GPSFeaturesDTO } from '@Types/index';

export default function __Display_RealTimeAccuracy__(props: {
  accuracy: GPSAccuracyDTO
  features: GPSFeaturesDTO
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { gpsON, enableCoordinate, enableAltitude} = props.features;
  const nothingEnable = enableCoordinate === false && enableAltitude === false;

  if (gpsON === false || nothingEnable) {
    return <></>;
  }

  return (
    <View>
      <P
        style={{ color: theme.onBackground }}
      >
        {'Real time accuracy:'}
      </P>
      {enableCoordinate && props.accuracy.coordinate !== null && (
        <AccuracyInfo
          title="Coordinates"
          precision={props.accuracy.coordinate}
        />
      )}
      {enableAltitude && props.accuracy.altitude !== null && (
        <AccuracyInfo
          title="Altitude"
          precision={props.accuracy.altitude}
        />
      )}
    </View>
  );
}

function AccuracyInfo(props: {
  title: string
  precision: number
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <P
        style={{ color: theme.onBackground }}
      >
        {`${props.title}:`}
      </P>
      <P
        style={{ color: theme.onBackground }}
      >
        {`${props.precision}m`}
      </P>
    </View>
  );
}