import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPS_DTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export default function __Display_Data__(props: {
  gpsData: GPS_DTO
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const isNoData = props.gpsData.coordinates === undefined && props.gpsData.altitude === undefined;

  if (isNoData) {
    return <></>;
  }

  return (
    <View>
      {props.gpsData.coordinates !== undefined && <>
        <P
          style={{ color: theme.onBackground }}
        >
          {`Latitude: ${props.gpsData.coordinates.lat} (+-${props.gpsData.coordinates.accuracy}m)`}
        </P>
        <P
          style={{ color: theme.onBackground }}
        >
          {`Longitude: ${props.gpsData.coordinates.long} (+-${props.gpsData.coordinates.accuracy}m)`}
        </P>
      </>}
      {props.gpsData.altitude !== undefined && <>
        <P
          style={{ color: theme.onBackground }}
        >
          {`Altitude: ${props.gpsData.altitude.value} (+-${props.gpsData.altitude.accuracy}m)`}
        </P>
      </>}
    </View>
  );
}
