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
      {props.coordinateEnable && props.realTimeAccuracy_Coordinate !== null && (
        <P
          style={{ color: theme.onBackground }}
        >
          {`real time accuracy (Coordinates): ${props.realTimeAccuracy_Coordinate}`}
        </P>
      )}
      {props.altitudeEnable && props.realTimeAccuracy_Altitude !== null && (
        <P
          style={{ color: theme.onBackground }}
        >
          {`real time accuracy (altitude): ${props.realTimeAccuracy_Altitude}`}
        </P>
      )}
    </View>
  );
}
