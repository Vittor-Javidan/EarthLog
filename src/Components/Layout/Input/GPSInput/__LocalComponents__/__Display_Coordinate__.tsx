import React, { useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import { CoordinateDTO } from '@Types/index';

import P from '@Components/Layout/Text/P';

export default function __Display_Coordinate__(props: {
  gpsON: boolean
  accuracyRealTime: number | null
  coordinateData: CoordinateDTO | undefined
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  if (props.coordinateData === undefined) {
    return;
  }

  return (
    <View>
      <P
        style={{ color: theme.onBackground }}
      >
        {`Latitude: ${props.coordinateData.lat} (+-${props.coordinateData.accuracy}m)`}
      </P>
      <P
        style={{ color: theme.onBackground }}
      >
        {`Longitude: ${props.coordinateData.long} (+-${props.coordinateData.accuracy}m)`}
      </P>
      {props.gpsON && props.accuracyRealTime !== null && (
        <P
          style={{ color: theme.onBackground }}
        >
          {`accuracy: ${props.accuracyRealTime}`}
        </P>
      )}
    </View>
  );
}
