import React, { useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export default function __Display_RealTimeAccuracy__(props: {
  gpsON: boolean
  coordinateEnable: boolean
  altitudeEnable: boolean
  realTimeAccuracy_Coordinate: number | null
  realTimeAccuracy_Altitude: number | null
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const nothingEnable = props.coordinateEnable === false && props.altitudeEnable === false;

  if (props.gpsON === false || nothingEnable) {
    return <></>;
  }

  return (
    <View>
      <P
        style={{ color: theme.onBackground }}
      >
        {'Real time accuracy:'}
      </P>
      {props.coordinateEnable && props.realTimeAccuracy_Coordinate !== null && (
        <AccuracyInfo
          title="Coordinates"
          precision={props.realTimeAccuracy_Coordinate}
        />
      )}
      {props.altitudeEnable && props.realTimeAccuracy_Altitude !== null && (
        <AccuracyInfo
          title="Altitude"
          precision={props.realTimeAccuracy_Altitude}
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
