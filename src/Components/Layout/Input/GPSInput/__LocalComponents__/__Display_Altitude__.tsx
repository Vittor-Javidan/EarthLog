import React, { useMemo } from 'react';
import { View } from 'react-native';

import { AltitudeDTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import P from '@Components/Layout/Text/P';


export default function __Display_Altitude__(props: {
  gpsON: boolean
  accuracyRealTime: number | null
  altitudeData: AltitudeDTO | undefined
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  if (props.altitudeData === undefined) {
    return;
  }

  return (
    <View>
      <P
        style={{ color: theme.onBackground }}
      >
        {`Altitude: ${props.altitudeData.value} (+-${props.altitudeData.accuracy}m)`}
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
